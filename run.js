// LuisNet backend nodejs
const fs = require("fs");// importar el file interpreter (fs)
const path = require("path");
const esbuild = require("esbuild"); //BuildGame
var app = require('express')();
const express = require("express");
const ws = require("ws"); //WebSocket para multijugador
const Database = require("@replit/database"); //Conectar base de datos
const multiplayer = require("./multiplayer"); // buscar el archivo multiplayer
const db = new Database(); //Crear base de datos
const helmet = require("helmet"); //helmet
// Crear app express
 // Crear servidor HTTP
const PORT = process.env.PORT || 3000; // Dejar puerto
const http = require("http").createServer(app); //HHTP para el backend web
var io = require('socket.io')(http)//Socket
let err = null;
//Fixed ratelimit cuando se efectua un ataque DoS comunicando a la Ip del servidor en si del socket
//Añadido WAF para bypassear la proxy del colegio ;)
//Start security improvements + rate-limit + helmet HEADERS BLOCK
const rateLimit = require("express-rate-limit");
	const limiter = rateLimit({
		windowMs: 60 * 1000, // 1 min
		max: 20, // limitar IPs cada 22 requests
		message: "Su IP fue bloqueada con el fin de evitar que la web caiga, pues su trafico es sospechoso, si considera esto un error considere reportarlo a soporte@luisweb.cf o admin@luisweb.cf - LuisSec" //Añadir mensaje de error cuando esta activo
	});
	app.use(limiter);


//Usar npm "helmet" para protejer la web un poco
app.use(helmet());
// Empezar el servidor multijugador
multiplayer(http);
//Mapear los jugadores
const gameState = {
  players: {}
}
io.on('connection', (socket) => {
  socket.on('newPlayer', () => {
    //Someone joined!
    gameState.players[socket.id] = {
      x: 250,
      y: 250,
    }
    console.log("Servidor en uso #Luisnet")
  })

  socket.on('playerMovement', (playerMovement) => {
    //Alguien se movió
    const player = gameState.players[socket.id]
    //Setear canvas
    const canvasWidth = 1200
    const canvasHeight = 700

    //Usar objetos para que los jugadores muevan ciertas coordenadas
    if (playerMovement.left && player.x > 0) {
      player.x -= 4
    }
    if (playerMovement.right && player.x < canvasWidth) {
    player.x += 4
  }
    
    if (playerMovement.up && player.y > 0) {
      player.y -= 4
    }
    if (playerMovement.down && player.y < canvasHeight) {
      player.y += 4
    }
  })


  socket.on("disconnect", () => {
    //Socket state
    delete gameState.players[socket.id]
  })
})

//Emitir state cada 1 minuo
setInterval(() => {
  io.sockets.emit('state', gameState);
}, 1000 / 60);
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
	res.sendFile(__dirname + "/www/intro.html");
	render();
});

app.get("/f1", (req, res) => {
	err = null;
	buildGame(); //Mostrar juego
	res.sendFile(__dirname + "/www/introf1.html");
	render();
});

app.get("/menu", (req, res) => {
	err = null;
	buildGame(); //Mostrar juego
	res.sendFile(__dirname + "/www/index.html");
	render();
});

app.get("/usa", (req, res) => {
	err = null;
	buildGame(); //Mostrar juego
	res.sendFile(__dirname + "/servers/eu.html");
	render();
});



app.get("/jugar", (req, res) => {
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
http.listen(PORT, () => {
  console.log('Socket encendido en el puerto *:3000');
});

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

