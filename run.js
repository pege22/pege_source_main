// kaboom dev server

const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");
const express = require("express");
const ws = require("ws"); //WebSocket para multijugador
const http = require("http"); //HHTP para el backend web
const Database = require("@replit/database"); //Conectar base de datos
const multiplayer = require("./multiplayer"); // buscar el archivo multiplayer
const db = new Database(); //Crear base de datos
const app = express(); // Crear app express
const server = http.createServer(app); // Crear servidor HTTP
const port = process.env.PORT || 8000; // Dejar puerto
let err = null;

// Empezar el servidor multijugador
multiplayer(server);

// Construir juego de cliente + setear la función BuildGame()
function buildGame() {

	const principal = fs.readFileSync("main.html", "utf-8");
	let code = "";

	code += `<script src="/dist/helper.js"></script>\n`;
	code += `<script src="/dist/game.js"></script>\n`;

	try {

		// Construir codigo de cliente
		esbuild.buildSync({
			bundle: true,
			sourcemap: true,
			target: "es6",
			keepNames: true,
			logLevel: "silent",
			entryPoints: ["code/main.js"],
			outfile: "dist/game.js",
		});

		esbuild.buildSync({
			bundle: true,
			sourcemap: true,
			target: "es6",
			keepNames: true,
			entryPoints: ["helper.ts"],
			outfile: "dist/helper.js",
		});

	} catch (e) {
		const loc = e.errors[0].location;
		err = {
			msg: e.errors[0].text,
			stack: [
				{
					line: loc.line,
					col: loc.column,
					file: loc.file,
				},
			],
		};
		let msg = "";
		msg += "<pre>";
		msg += `ERROR: ${err.msg}\n`;
		if (err.stack) {
			err.stack.forEach((trace) => {
				msg += `    -> ${trace.file}:${trace.line}:${trace.col}\n`;
			});
		}
		msg += "</pre>";
		fs.writeFileSync("dist/index.html", msg);
		return;
	}

	fs.writeFileSync("dist/index.html", principal.replace("{{kaboom}}", code));

}

// Backend principal 
app.use(express.json({ strict: false }));

app.get("/", (req, res) => {
	err = null;
	buildGame(); //Mostrar juego
	res.sendFile(__dirname + "/dist/index.html");
	render();
});
// Pagina de error
app.post("/error", (req, res) => {
	err = req.body;
	render();
});
// Base de datos, mapear usuario
app.get("/user", (req, res) => {
	if (req.headers["x-replit-user-id"]) {
		res.json({
			id: req.headers["x-replit-user-id"] || null,
			name: req.headers["x-replit-user-name"] || null,
		});
	} else {
		res.json(null);
	}
});
//API Busqueda base de datos
app.get("/db", async (req, res) => {
	try {
		res.json(await db.list());
	} catch (e) {
		res.sendStatus(500);
	}
});
//API Busqueda base de datos
app.delete("/db", async (req, res) => {
	try {
		await db.empty();
		res.sendStatus(200);
	} catch (e) {
		res.sendStatus(500);
	}
});
//API Busqueda base de datos
app.get("/db/:item", async (req, res) => {
	try {
		res.json(await db.get(req.params.item));
	} catch (e) {
		res.sendStatus(500);
	}
});
//API Busqueda base de datos
app.post("/db/:item", async (req, res) => {
	try {
		await db.set(req.params.item, req.body);
		res.sendStatus(200);
	} catch (e) {
		res.sendStatus(500);
	}
});
// Post DATABASE Api busqueda
app.delete("/db/:item", async (req, res) => {
	try {
		await db.delete(req.params.item);
		res.sendStatus(200);
	} catch (e) {
		res.sendStatus(500);
	}
});
// Dirname
app.use(express.static(__dirname));
// Express listen puerto
server.listen(port);

// Setear colores
const red = (msg) => `\x1b[31m${msg}\x1b[0m`;
const dim = (msg) => `\x1b[2m${msg}\x1b[0m`;

function render() {

	// Iniciar servidor y renderizar juego
	process.stdout.write("\x1b[2J");
	process.stdout.write("\x1b[H");
	process.stdout.write("#ConnectingTheUniverse LUISNET iniciado en el puerto 8080 https://pege.luisweb.cf\n");

	console.log(red("\n#LuisNet"));

	// Console log errores
	if (err) {
		console.log("");
		console.error(red(`ERROR: ${err.msg}`));
		if (err.stack) {
			err.stack.forEach((trace) => {
				console.error(`    -> ${trace.file}:${trace.line}:${trace.col}`);
			});
		}
	}

}
