import kaboom from "kaboom"

loadSprite("juanes", "./sprites/juanes.png") //Importar juanes.png como personaje
loadSprite("grass", "./sprites/grass.png")// Como importar grass o importar ghrass.png
loadSound("coin", "./sounds/juanesgime.mp3") //Error 502 bad gateway 

//ESTRUCTURA BASICA DE EL NIVEL BASADO EN JSON

const LEVELS = [
    [
      "                          $",
      "                          $",
      "                          $",
      "                          $",
      "                           ",
      "                           ",
      "                           ",
      "                      =    ",
      "    ==          ===   =    ",
      "                =     =    ",
      "===========================",
    ],
    [
        "                          $",
        "                          $",
        "                          $",
        "                          $",
        "                           ",
        "                           ",
        "                           ",
        "                      =    ",
        "    ==          ===   =    ",
        "                =     =    ",
        "===========================",
      ]
    
    ]

"=": () => [ //Pasto
sprite("grass")
],
