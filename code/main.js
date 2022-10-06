import kaboom from "kaboom"
import loadAssets from "./assets"
//Fixed assets load
//CodedByLuis
//CompetPanas
//#LuisNet


kaboom({ 
debug: true,	
 scale: 1, //FixedScale
font: "apl386",
background: [ 46, 58, 81 ]
})
loadAssets()
function patrol(speed = 60, dir = 1) {
	return {
		id: "patrol",
		require: [ "pos", "area", ],
		add() {
			this.on("collide", (obj, col) => {
				if (col.isLeft() || col.isRight()) {
					dir = -dir
				}
			})
		},
		update() {
			this.move(speed * dir, 0)
		},
	}
}

function human(speed = 60, dir = 1) {
	return {
		id: "human",
		require: [ "pos", "area", ],
		add() {
			this.on("collide", (obj, col) => {
				if (col.isLeft() || col.isRight()) {
					dir = -dir
				}
			})
		},
		update() {
			this.move(speed * dir, 0)
		},
	}
}

function block(speed = 200, dir = 1) {
	return {
		id: "block",
		require: [ "pos", "area", ],
		add() {
			this.on("collide", (obj, col) => {
				if (col.isLeft() || col.isRight()) {
					dir = -dir
				}
			})
		},
		update() {
			this.move(speed * dir, 0)
		},
	}
}

function bloc(speed = 200, dir = 1) {
	return {
		id: "block",
		require: [ "pos", "area", ],
		add() {
			this.on("collide", (obj, col) => {
				if (col.isUp() || col.isDown()) {
					dir = -dir
				}
			})
		},
		update() {
			this.move(speed * dir, 0)
		},
	}
}

function big() {
	let timer = 0
	let isBig = false
	let destScale = 1
	return {
		id: "big",
		require: [ "scale" ],
		update() {
			if (isBig) {
				timer -= dt()
				if (timer <= 0) {
					this.biggify()
				}
			}
			this.scale = this.scale.lerp(vec2(destScale), dt() * 6)
		},
		isBig() {
			return isBig
		},
		smallify() {
			destScale = 1
			timer = 0
			isBig = false
		},
		biggify(time) {
			destScale = 2
			timer = time
			isBig = true
		},
	}
}

scene("menu", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {
function addButton(txt, p, f) {

	const btn = add([
		text(txt),
		pos(p),
		area({width: 200, height: 18}),
		scale(2),
		origin("center"),
	])

      add([
    sprite("menubg", { width: width(), height: height() }),
    z(-9999),
    fixed()
  ]);
	btn.onClick(f)

	btn.onUpdate(() => {
		if (btn.isHovering()) {
			const t = time() * 20
			btn.color = rgb(
				wave(0, 255, t),
				wave(0, 255, t + 2),
				wave(0, 255, t + 4),
			)
			btn.scale = vec2(2)
		} else {
			btn.scale = vec2(2)
			btn.color = rgb()
		}
	})

}

addButton("Join-Journey", vec2(775, 200), () => go("game"))
add([
  text("Production  \n V17.7.2LNET@latest", {
    font: "apl386", 
  })]),

onUpdate(() => cursor("default"))

})


scene("pausa", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {
function addButton(txt, p, f) {

	const btn = add([
		text(txt),
		pos(p),
		area({width: 200, height: 18}),
		scale(2),
		origin("center"),
	])

      add([
    sprite("menubg", { width: width(), height: height() }),
    z(-9999),
    fixed()
  ]);
	btn.onClick(f)

	btn.onUpdate(() => {
		if (btn.isHovering()) {
			const t = time() * 20
			btn.color = rgb(
				wave(0, 255, t),
				wave(0, 255, t + 2),
				wave(0, 255, t + 4),
			)
			btn.scale = vec2(2)
		} else {
			btn.scale = vec2(2)
			btn.color = rgb()
		}
	})

}

addButton("Resume", vec2(775, 200), () => go("game"))
add([
  text("Production  \n V17.7.2LNET@latest", {
    font: "apl386", 
  })]),

onUpdate(() => cursor("default"))

})
//Comprob
function spin(speed = 1200) {
	let spinning = false
	return {
		require: [ "rotate", ],
		update() {
			if (!spinning) {
				return
			}
			this.angle -= speed * dt()
			if (this.angle <= -360) {
				spinning = false
				this.angle = 0
			}
		},
		spin() {
			spinning = true
		},
	}
}


loadSprite("sam", "/sprites/dino.png", {

sliceX: 9,

anims: {
	idle: {
			from: 0,
			to: 3,
			speed: 3,
			loop: true,
		},
		run: {
			from: 4,
			to: 7,
			speed: 10,
			loop: true,
		},

		jump: 8
	},
})
loadSprite("portal", "sprites/portal3.png", {
  sliceX: 4,
  anims: {
    idle: {
      from: 0,
      to: 3,
      loop: true,
      speed: 10
    },
  }
});

loadSprite("monedaa", "sprites/monedaa.png", {
  sliceX: 5,
  anims: {
    idle: {
      from: 0,
      to: 4,
      loop: true,
      speed: 10
    },
  }
});

let BACKGROUND = "ciudadbg";
const JUMP_FORCE = 1320
const MOVE_SPEED = 300
const FALL_DEATH = 3010

const LEVELS = [
	[
		"p                        p",
		"p                        p",
		"p                        p",
		"p                        p",
		"p                        p",
		"p      $ $               p",
		"p     $  =      $$       p",//city
		"p    $   =     ====      p",
		"p        =      <        p",
		"p  2  lf =L$$$$$$$$$$$  +p",
		"==========================",
	],
	[
		"p                         $       p",
		"p                        ===      p",
		"p                                 p",
		"p                  $              p",  
		"p                 ===    $        p",//city
		"p                       ===       p",
		"p             $              $    p",
		"p            ===     $      ===   p",
		"p       $           ===           p",
		"p?     ===                      ¿ p",
		"======                        =====",
	],
        [
    "p                             p",
		"p                             p",
		"p                             p",
		"p                             p",
		"p                             p",
		"p                             p",//city
		"p                             p",
		"p           $$   $$   $$      p",
		"p             $    $    $     p",
		"p                             p",
		"p       ^^  ^^   ^^   ^^     @p",
		"===============================",
	], 
	[       
		"p                                   ",
		"p                                   ",
		"p                                   ",
		"p                                   ",
		"p                               @   ",
		"p                             ====  ",
		"p    $  =             =>=           ",
		"p    $  =            ====           ",//city
		"p    $  =                           ",
		"p    $  =                           ",
		"p    >  =     =>=                   ",
		"=================                   ",
	 ],
   [
    "p                                      p",
		"p                                      p",
		"p                                      p",
		"p                                      p",
		"p                                 @    p",
		"p                              =====   p",
    "p                                      p",
    "p                                      p",
		"p              =¡         =            p",
    "p                                      p",
    "p                                      p",//city
		"p                                      p",
		"p        ====                          p",
    "p                                      p",
		"p                                      p",
		"========================================",
   ],
   [
  
    "                        ",
    "          @             ",
    "         =======        ",
    "                  ===   ",
    "                        ",
    "                        ",
    "                        ",
    "                  ===!  ",
    "                        ",
    "======!                 ",
    "                        ",//spawn
    "                        ",
    "       =¡       =!      ",
    "                        ",
    "                         ",
   ],
	 [
		"                                                                        ",
		"                    $ $ $ $ $ $               $                         ",
		"                   $   $   $   $             ===                        ",
		"                                        $                    @          ",
		"                                       ===           $     ====         ",
		"                  =>^^^>^^^>^^^                     ===                 ",
		"               ===================                                      ",
		"                                                                        ",  
		"                                                                        ",
		"      =>=                                                               ",
    "      ====    $                                     $$$$$$              ",
	  "             $ $                                   ========             ", 
		"                        $                   $                           ",
		"             ^^^       ===                 ===                          ",
		"           =======             $  $                                     ",      	
    "                             ========                                   ",
		"                                                                        ",  
		"                                                              =>=       ",//city
		"                                                      $      ====       ", 
		"                                                                        ", 
		"                                                      ^                 ",
		"                                             $      =====               ",  
		"                                                                        ",
		"                         $    $    $         ^                          ",
		"                                           =====                        ",         
    "                                                                        ",
		"                        ^^^  ^^^  ^^^                                   ",
		"============     ¡     ================                                 ",
	],
	[
    "w                                      ",
    "w                                      ",
    "w           @                          ",
		"w   ===========                        ",
    "w                                      ", 	
    "w                                      ",
    "w                                      ",
		"w          ===============             ",
		"w                                      ",
    "w                                      ",
    "w                                      ",
    "w                                      ", // bosque fuera
		"w                       =======        ",
		"w      =======                         ",
		"w                                      ",
		"w                                      ",
		"w   2             2                2   ",
		"w                                     @",
		"=======================================",
    "                                       ",
    "                                       ",
    "                                       ",
], 
[
  "                         ",
  "                         ",
  "                         ",
  "                         ",
  "                         ",// bosque fuera
  "                       @ ",
  "                   ======",
  "   l    = f  =           ",//spawn
  "================         ",
  "                         ",
  "                         ",
  "                         ",
  "                         ",
],
[
  "                         ",
  "                         ",
  "                         ",
  "            @            ",
  "          ====           ",//spawn
  "                         ",
  "    = f =                ",//bosque dentro
  "    =====                ",
  "                         ",
  "===                      ",
  "                         ",
  "                         ",
  "                         ",
  "                         ",
],
[
  "                        ",
  "                        ",
  "    @                   ",
  "   ======               ",
  "          =======       ",
  "                        ",
  "                        ",
  "                  ====  ",//bosque fuera
  "                        ",
  "      = f  f  f =       ",
  "      ===========       ",
  "                        ",
  "====                    ",
],
[
  "                                               ",
  "                                               ",
  "      ====                                     ",
  "                                             @ ",
  "           = f    =                        ====",
  "           ========                            ",
  "                                               ",
  "                                               ",  // bosque dentro
  "                       =          =====        ",
  "                      ===                      ",
  "                                               ",
  "                                               ",
  "                           = f f =             ",
  "       =============       =======             ",
  " ===                                           ",
  "                                               ",
],
[
  "                             ",
  "                             ",
  "          @                  ",
  "         ======              ",
  "                  b          ",
  "                 =====       ",//b=other enemy
  "                             ",
  "                             ",
  "                       ====  ",
  "                             ",
  "               ======        ",
  "           b=                ",
  "=============                "
],
[
  "            @           ",
  "                     @  ",
  "     G             ==== ",
  "    ====                ",
  "              ====      ",
  "                        ",//G="checkpoint"
  "           L            ",
  "        =====           ",
  "                        ",
  "                     @  ",
  "     b             ==== ",
  "    =====               ",
  "            =  f =      ",
  "            ======      ",
  "                        ",
  "     =====              ",
  "                        ",
  "====                    ",
  ],
  [
    "   @          ^              ",
    "   pppp       ppp     ppppp  ",
    "       pppp   <p<     <ppp   ",
    "                        p<   ",
    "                            p",
    "                            <",
    "         ^                   ",
    "       ppp           ^^      ",
    "        p    ^     pppp    p ",//ruinas
    "        <  ppppp    pp<    < ",
    "      ^    <ppp<    <p       ",
    "    rpp     <p          pp   ",
    "     r<                  p   ",
    "     <                   <   ",
    "rrrr                         ",
  ],
  [
    "        ppp  ^  ^                             ",
    "        <p ppppppp      ^^^  p             ^ @",
    "            <ppp<       ppp  <   pp      ppppp",
    "  ppppp                  <        p    <  ppp<",
    "   ppp<             ppp           <  ppp  <p  ",
    "   <p   ppp          p<p    pp        p    <  ",
    "         p<          <      <                 ",
    "                                              ",
    "                                              ",
    "            ppp                               ",
    "            <p                                ",
     "                 p    ^    pp                ",//ruinas
    "           ^         pppp                     ",
    "pppp     pppp          p  p                   ",
  ],
  [
        "                 ^^^^       ",
        "                 pppp       ",
        "                            ",
        "        ppp            @    ",
        "        <p<     p^^^^ppp    ",
        "      ^^ <  ppp  pppp       ",
        "   ppppp                    ",
        "                            ",
        " ppp   pp                   ",
        "       <p                   ",
        "                 pppppppp   ",//ruinas
        "            ^    p pppp p   ",
        "         ppppp    pppppp    ",
        "         <ppp               ",
        "          <p<    pp^^^^pp   ",
        "           <  pp   pppp     ",
        "               <            ",
        "                          pp",
        "                            ",
        "    ^^^^^^                  ",
        "    pppppp    ppp ^^  ^^    ",
        "      <<      <p<ppppppppp  ",
        "           ^   <            ",
        "ppppp    ppppp              ",
  ],
  [
    "         @               ^         ",
    "         p               p         ",
    "         p              ^p^        ",
    "        ppp             ppp        ",//ruinas
    "        ppp             ppp        ",
    "       ppppp      p  pppppppp  pp  ", 
    "        ppp       p      p      p  ",
    "         <        p     ^p^    ^p  ",
    "                  ppp  pppp   ppp  ",
    "                                   ",
    "                                ^  ",
    "       ^  ^       ppppp  pppppppp  ",
    "     ppppppppp                  p  ",
    "                              ^^p  ",
    "   ppppp    pp    ppppppp    ppppp ",
    "    ppp                  p  p    p ",   
    "     <                           p ",
    "                                 p ",
    "  p               p              p ", 
    "                  pppppppppppppppp ",
    "                      p<   <   <   ",
    "   ^              ppppp            ",
    "   ppp                             ",             
    "   pp                              ",
    "                                   ",
    "                                   ",
    "      ppp      pppppppppp    p    p",
    "      <p<                          ",
    "              ^^^^^^^^^^^^^^^^^^^^^",
    "ppppp     ppppppppppppppppppppppppp",
  ],
  [
    "                                                    ppp     ",
    "                                            ^             ^ ",
    "                               p   p        p    ppp    ppp ", 
    "          ^                          p     p      p         ",
    "        ppp            ^ ^  p         ppppp  ppp            ",
    "         p             p p              p     p             ",
    "            p      p   < <                                 @",
    "            <      <                                      ^ ",
    "  p                   p^^^p                              ppp",
    "                      <ppp<     p      p             ^      ",
    "          ^ ^                   <      <            ppp     ",  //ruinas
    "        ppppp           ppppppp           ^^  ^^            ",  
    "         ppp< ^ ^^^pp                    ppppppppp          ",   
    "          p   ppppp   ppp    ppp                            ", 
    "ppp       <    ppp<                                         ",  
  ],
  [
    "          p  ^       ",
    "  pp^pp   pppp       ",
    "   ppp    ppp        ",
    "    p     pp         ",
    "        ppp   pp     ",
    "         ppp p       ",
    "     ^    pp p ^^^^^^",
    "   ppppp  pp p pppppp",
    "   p p p  pp p  <pp< ",
    "  ppp pp  p          ",
    "          p^         ",//ruinas
    "          ppp        ",
    " p        p  p       ",
    "          p   p^^^p  ",
    "  ^^      p    ppp   ",
    " pppppp   p    <<<   ",
    " ppppp    p          ",
    " ppp     ^p ppp   ppp",
    " pp     ppp pp     p ",
    " p       pp p        ", 
    "        ^ p p        ", 
    "      ppp p p        ",
    "       p  p p        ",   
    "     ^    p p        ",
    "   ppp    p p        ",
    "          p p        ",
    " ^        p p        ",
    " ppp      p p        ",
    "  p       p p   ppp  ",
    "          p      p   ", 
    "     ppp  p      p   ",
    "          p    p p   ",
    "          p    p p   ",
    "  pp      p    p p   ",
    "   p     ^p  ppp p   ",
    "  ppp  pppp  p p p   ",
    "          p ^p p^p^@^",
    "ppppppppppppppppppppp",
  ],
  [
    " pppp ppp ppp p  ppp p  p pp  ",
    "   p  p p  p  p  p p pp p p p ",
    "  p   ppp  p  p  ppp p pp p p ",
    " pppp p p ppp pp p p p  p pp  ",
    "                         ^    ",
    "                         p  pp",
    "    pp^^  ^            p p    ",
    "    pppppppppppppppppppp p^   ",
    "                       p ppp  ",//ruinas
    " p                     p pp   ",
    "            ppp        p p   ^",
    "     pppp    p         p p  pp",
    "         p    ^        p p  <p",
    "              pp       p p^   ",
    "                       p ppp  ", 
    "     ^            ^    p      ",
    "   ppp           pp    p     ^",
    "    p                  p    pp",
    "    <                  p      ",
    "ppp   pp      pp       p ^    ",
    "                       ppppppp", 
  ],
  ]
const levelConf = {
	width: 64,
	height: 64,
	"=": () => [
		sprite("grass"),
		area(),
		solid(),
		origin("bot"),
  ],
  "¡": () => [
		sprite("grass"),
		area(),
		solid(),
    block(),
		origin("bot"),
  ],
  "!": () => [
		sprite("grass"),
		area(),
		solid(),
    block(),
		origin("bot"),
  ],
  "w": () => [
		sprite("wood"),
		area(),
		solid(),
		origin("bot"),
  ],
  "M": () => [
		sprite("mountain"),
		area(),
		solid(),
		origin("bot"),
  ],
  "r": () => [
		sprite("Ruins"),
		area(),
		solid(),
		origin("bot"),
  ],
		"p": () => [
		sprite("piedra"),
		area(),
		solid(),
		origin("bot"),
 ],
		"m": () => [
		sprite("mafe"),
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
	],
"L": () => [
		sprite("letrero"),
		area({width: 40, height: 40}),
		solid(),
    scale(1.5),
		origin("bot"),
	],
	"v": () => [
		sprite("valeuwu"),
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
	],

	"l": () => [
		sprite("developer"),
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
	],
	"s": () => [
		sprite("silvi"), 
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
	],
	"c": () => [
		sprite("casti"),
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
	],
	"9": () => [
		sprite("pavo"),
		area({width: 15, height: 16}),
		solid(),
    scale(2.1),
    human(),
		origin("bot"),
	],
  "3": () => [
		sprite("mateo"),
		area({width: 11, height: 16}),
		solid(),
    scale(2.1),
		origin("bot"),
	],
	"$": () => [
		sprite("monedaa", { anim: 'idle' }),
		area(),
		pos(0, -9),
    scale(3),
		origin("bot"),
		"coin",
	],
"2": () => [
		sprite("gem"),
		area(),
		pos(0, -9),
		origin("bot"),
		"gem",
	],
  "6": () => [
		sprite("gemp1"),
		area(),
		pos(0, -9),
		origin("bot"),
		"gem",
	],
  "7": () => [
		sprite("gemp2"),
		area(),
		pos(0, -9),
		origin("bot"),
		"gem",
	],
  "4": () => [
		sprite("gemp3"),
		area(),
		pos(0, -9),
		origin("bot"),
		"gem",
	],
  "5": () => [
		sprite("gemp4"),
		area(),
		pos(0, -9),
		origin("bot"),
		"gem",
	],
	"%": () => [
		sprite("prize"),
		area(),
		solid(),
		origin("bot"),
		"prize",
	],
	"^": () => [
		sprite("spike"),
		area(),
		solid(),
		origin("bot"),
		"danger",
		],
	"<": () => [
		sprite("spikevoltiado"),
		area({width: 35, height: 20}),
    pos(0, -40),
		origin("bot"),
		"danger",
	],
	"#": () => [
		sprite("apple"),
		area(),
		origin("bot"),
		body(),
		"apple",
	],
	">": () => [
		sprite("ghosty"),
		area(),
		origin("bot"),
		body(),
		patrol(),
		"enemy",
	],
  "f": () => [
		sprite("forest1"),
		area(),
		origin("bot"),
		body(),
    scale(0.5),
		patrol(),
		"enemy",
	],
	"@": () => [
		sprite("portal", { anim: 'idle' }),
		area({width: 64, height: 64}),
		origin("bot"),
		pos(0, -12),
		"portal",
	],
  "+": () => [
		sprite("portal", { anim: 'idle' }),
		area({width: 64, height: 64}),
		origin("bot"),
		pos(0, -12),
		"popocine1",
	],
  "¿": () => [
		sprite("portal", { anim: 'idle' }),
		area({width: 64, height: 64}),
		origin("bot"),
		pos(0, -12),
		"popopocine2",
	],
  	"?": () => [
		sprite("portal", { anim: 'idle' }),
		area({width: 64, height: 64}),
		origin("bot"),
		pos(0, -12),
		"otroportal",
	],
}










scene("game", ({ levelId, coins, anims } = { levelId: 0, coins: 0 }) => {
gravity(3200)


	const level = addLevel(LEVELS[levelId ?? 0], levelConf)

let myCheckpoint = vec2(177, 179)
let myCheckpointfix = vec2(140, 116)


    add([
    sprite(BACKGROUND, { width: width(), height: height() }),
    z(-9999),
    fixed()
  ]);
const player = add([
	sprite("sam", { anim: 'idle' }),
	pos(80, 180),
	origin("center"),
	area({width: 10, height: 20}),
	body({ jumpForce: JUMP_FORCE, }),
  scale(22),
  big(),
  rotate(0),
	spin(),
	origin("bot"),
])

player.onUpdate(() => {
     if(player.pos.x > 210) { 
         myCheckpointfix = vec2(140, 116);
     }
})



player.onGround(() => {
	if (!isKeyDown("left") && !isKeyDown("right")) {
		player.play("idle")
	} else {
		player.play("run")
	}
})
	player.onDoubleJump(() => {
		player.spin()
	})


onKeyPress("space", () => {
	if (player.isGrounded()) {
    player.doubleJump()
		player.jump(JUMP_FORCE)
    player.biggify(3)
		player.play("jump")
	}
})
	
	onKeyPress("up", () => {
	if (player.isGrounded()) {
		player.jump(JUMP_FORCE)
    player.biggify(4)
		player.play("jump")
	}
})

onKeyDown("left", () => {
	player.move(-MOVE_SPEED, 0)
	player.flipX(true)
  player.biggify(5)
	if (player.isGrounded() && player.curAnim() !== "run") {
		player.play("run")
	}
})

onKeyDown("right", () => {
	player.move(MOVE_SPEED, 0)
	player.flipX(false)
  player.biggify(5)
	if (player.isGrounded() && player.curAnim() !== "run") {
		player.play("run")
	}
})

onKeyRelease(["left", "right"], () => {
	if (player.isGrounded() && !isKeyDown("left") && !isKeyDown("right")) {
player.play("idle")
	}
})


	player.onUpdate(() => {

		camPos(player.pos)

		if (player.pos.y >= FALL_DEATH) {
			player.pos = myCheckpoint;
		}
	})

	player.onCollide("danger", () => {
		player.pos = myCheckpoint;
		play("hit")
	})

	player.onCollide("portal", async () => {
		play("portal")
		//location.href = "https://luisweb.cf/pege/cinematic"
    await wait(1)
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
				coins: coins,
			})
		} else {
			go("win")
		}
      if (levelId < 6) {
        BACKGROUND = "ciudadbg"
      }
     if (levelId == 6) {
        BACKGROUND = "bfuerabg"
      }
     if (levelId == 7) {
        BACKGROUND = "bfuerabg"
      }
      if (levelId == 8) {
        BACKGROUND = "forestbg"
      }
      if (levelId == 9) {
        BACKGROUND = "bfuerabg"
      }
    })
	player.onCollide("popocine1", async () => {
		play("portal")
		location.href = "https://luisweb.cf/pege/cinematic"
    await wait(1)
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
				coins: coins,
			})
		} else {
			go("win")
		}
      if (levelId < 6) {
        BACKGROUND = "ciudadbg"
      }
     if (levelId == 6) {
        BACKGROUND = "bfuerabg"
      }
     if (levelId == 7) {
        BACKGROUND = "bfuerabg"
      }
      if (levelId == 8) {
        BACKGROUND = "forestbg"
      }
      if (levelId == 9) {
        BACKGROUND = "bfuerabg"
      }
    })
	player.onCollide("popopocine2", async () => {
		play("portal")
		location.href = "https://luisweb.cf/pege/cinematic"
    await wait(1)
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
				coins: coins,
			})
		} else {
			go("win")
		}
      if (levelId < 6) {
        BACKGROUND = "ciudadbg"
      }
     if (levelId == 6) {
        BACKGROUND = "bfuerabg"
      }
     if (levelId == 7) {
        BACKGROUND = "bfuerabg"
      }
      if (levelId == 8) {
        BACKGROUND = "forestbg"
      }
      if (levelId == 9) {
        BACKGROUND = "bfuerabg"
      }
    })

  player.onCollide("otroportal", async () => {
		play("portal")
		//location.href = "https://luisweb.cf/pege/cinematic"
    await wait(1)
		if (levelId - 1 < LEVELS.length) {
			go("game", {
				levelId: levelId - 1,
				coins: coins,
			})
		} else {
			go("win")
		}
    if (levelId == 2) {
        BACKGROUND = "forestbg"
      } 
     if (levelId == 3) {
        BACKGROUND = "ruinasbg"
      }
     if (levelId == 4) {
        BACKGROUND = "ruinasbg"
      }
     if (levelId == 5) {
        BACKGROUND = "ruinasbg"
      }
     if (levelId == 6) {
        BACKGROUND = "ruinasbg"
      }
     if (levelId == 7) {
        BACKGROUND = "ruinasbg"
      }
     if (levelId == 8) {
        BACKGROUND = "ruinasbg"
      }
     if (levelId == 9) {
        BACKGROUND = "ruinasbg"
      }
     if (levelId == 10) {
        BACKGROUND = "ruinasbg"
      }
    })


	player.onGround((l) => {
		if (l.is("enemy")) {
			player.jump(JUMP_FORCE * 1.5)
			play("powerup")
		}
	})

player.onCollide("player", "enemy", (p, e) => {
    player.pos = myCheckpoint;
})


	player.onCollide("enemy", (e, col) => {
if (!col.isBottom()) {
			play("hit")
      player.pos = myCheckpoint;
		}
	})

	let hasApple = false


	player.onHeadbutt((obj) => {
		if (obj.is("prize") && !hasApple) {
			const apple = level.spawn("#", obj.gridPos.sub(0, 1))
			apple.jump()
			hasApple = true
			play("blip")
		}
	})


	player.onCollide("apple", (a) => {
		destroy(a)

		player.biggify(5)
		hasApple = false
		play("powerup")
	})

	let coinPitch = 0

	onUpdate(() => {
		if (coinPitch > 0) {
			coinPitch = Math.max(0, coinPitch - dt() * 100)
		}
	})

	player.onCollide("coin", (c) => {
		destroy(c)
    player.biggify(5)
		play("coin", {
			detune: coinPitch,
		})
		coinPitch += 100
		coins += 1
		coinsLabel.text = coins
	})

player.onCollide("gem", (c, p) => {
	player.move(100)
  destroy(c, p)
  play("yei")
  player.jump(JUMP_FORCE * 1.2)
	})

  
	const coinsLabel = add([
		text(coins),
		pos(24, 24),
		fixed(),
	])


	onKeyPress("space", () => {

		if (player.isGrounded()) {
			player.jump(JUMP_FORCE)
      player.doubleJump()
      player.biggify(5)
		}
	})

	onKeyDown("left", () => {
		player.move(-MOVE_SPEED, 0)
    player.biggify(5)
	})

	onKeyDown("right", () => {
		player.move(MOVE_SPEED, 0)
    player.biggify(5)
	})

	onKeyPress("down", () => {
		player.weight = 3
    
	})

	onKeyRelease("down", () => {
		player.weight = 1
    //player.pos = myCheckpoint;
		//fixed spawnpoint on Key release
	})

	onKeyPress("f", () => {
		fullscreen(!fullscreen())
	})

  	onKeyPress("escape", () => {
		go("pausa")
	})
		onKeyPress("f8", () => {
		add([
			text("tramposo - 0.5")
			])
			
	})
	 keyDown("o", () => {
    wait(0.2, () => {
      if (levelId + 1 < LEVELS.length) {
        go("game", {
          levelId: levelId - 1,
        });
      } else {
        go("win");
      }
      if (levelId == 2) {
        BACKGROUND = "icebg"
      } else {
        BACKGROUND = "ruinasbg"
      }
    })
  });
			onKeyPress("p", () => {
        fullscreen(!fullscreen())
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
				coins: coins,
			})
		}
			
	})
                  
})

scene("lose", () => {
	add([
		text("NOT USED, HOWEVER DEVELOPERS KNOW WHAT THEY DO ;)"),
	])
	onKeyRelease(() => {
    go("game")
	})
})

scene("win", () => {
	add([
		text("DEVOPS"),
	])
	onKeyPress(() => go("game"))
})

go("menu")