import kaboom from "kaboom" //Cargar librería de el juego

var socket = io();//Socket
socket.emit('newPlayer'); //Socket emite

var state = [];

kaboom({
background: [ 0, 0, 0 ]
});



loadSprite("voto_petro", "sprites/pero.gif"); //Cargar sprite 1
//Añadir sprite


var controller = {
  left: false,
  right: false,
  up: false,
  down: false
}
onKeyPress("right", () => {
   controller.right = true;
})
onKeyRelease("right", () => {
   controller.right = false;
})
onKeyPress("up", () => {
   controller.up = true;
})
onKeyRelease("up", () => {
   controller.up = false;
})
onKeyPress("down", () => {
   controller.down = true;
})
onKeyRelease("down", () => {
   controller.down = false;
})
onKeyPress("left", () => {
   controller.left = true;
})
onKeyRelease("left", () => {
   controller.left = false;
})


socket.on('state', (gameState) => {
  //update local gamestate
  state = gameState;
  //clear the canvas
  every(destroy)
  //draw the players that the server sent
  for (let player in gameState.players) {
    // get player position
    var pPos = gameState.players[player]
     add([
    sprite("voto_petro"),  // renders as a sprite
    pos(pPos.x, pPos.y),    // position in world
    ])
  }
})

setInterval(() => {
    socket.emit('playerMovement', controller);
}, 1000 / 60);





//Evento click ()null


//On kay press evento
onKeyPress("b", burp)






onKeyPress("v", burp)


