import kaboom from "kaboom" //Cargar librería de el juego


kaboom() //Iniciar libreria


loadSprite("voto_petro", "sprites/voto_petro.png"); //Cargar sprite 1
//Añadir sprite
add([

	sprite("voto_petro"),
	pos(1000, 400),
	area(),
])

//Evento click ()null
onClick(() => {
	addKaboom(mousePos())
})

//On kay press evento
onKeyPress("b", burp)



onKeyPress("w"), () => {
  player.move(-MOVE_SPEED, 23)
};


onKeyPress("v", burp)
onKeyPress("s"), () => { player.move(-MOVE_SPEED, 23) };

