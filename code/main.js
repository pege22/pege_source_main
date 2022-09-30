import kaboom from "kaboom"
import loadAssets from "./assets"
//Fixed assets load
//CodedByLuis
//CompetPanas
//#LuisNet


kaboom({ 
debug: true,	
 scale: 1, //FixedScale
font: "sinko",
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
		area({width: 72, height: 18}),
		scale(100),
    big(),
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
			btn.scale = vec2(10)
		} else {
			btn.scale = vec2(10)
			btn.color = rgb()
		}
	})

}

addButton("Start-Game", vec2(775, 200), () => go("game"))
add([
  text("Test Server  \n V16.7.2LNET", {
    font: "apl386", 
  })]),

onUpdate(() => cursor("default"))

})

loadSprite("portal", "sprites/portal.png", {
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





const JUMP_FORCE = 1320
const MOVE_SPEED = 300
const FALL_DEATH = 2400

const LEVELS = [
	[
		"p                        p",
		"p                        p",
		"p                        p",
		"p                        p",
		"p                        p",
		"p      $ $               p",
		"p     $  =      $$       p",
		"p    $   =     ====      p",
		"p        =      <        p",
		"p  m     = $$$$$$$$$$$  @p",
		"==========================",
	],
	[
		"p                        $       p",
		"p                       ===      p",
		"p                                p",
		"p                 $              p",  
		"p                ===    $        p",
		"p                      ===       p",
		"p            $              $    p",
		"p           ===     $      ===   p",
		"p      $           ===           p",
		"p     ===                      @ p",
		"=====                        =====",
	],
        [
    "p                             p",
		"p                             p",
		"p                             p",
		"p                             p",
		"p                             p",
		"p                             p",
		"p                             p",
		"p           $$   $$   $$      p",
		"p             $    $    $     p",
		"p                             p",
		"p       ^^  ^^   ^^   ^^     @p",
		"==============================",

	], 
	[       
		"p                                   ",
		"p                                   ",
		"p                                   ",
		"p                                   ",
		"p                               @   ",
		"p                             ====  ",
		"p    $  =             =>=           ",
		"p    $  =            ====           ",
		"p    $  =                           ",
		"p    $  =                           ",
		"p    >  =     =>=                   ",
		"=================                   ",
	 
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
		"       =>=                                                              ",
		"       ====   $                                     $$$$$$              ",
	  "             $ $                                   ========             ", 
		"                        $                   $                           ",
		"             ^^^       ===                 ===                          ",
		"           =======             $  $                                     ",      		"                             ========                                   ",
		"                                                                        ",  
		"                                                              =>=       ",
		"                                                      $      ====       ", 
		"                                                                        ", 
		"                                                      ^                 ",
		"                                             $      =====               ",  
		"                                                                        ",
		"                         $    $    $         ^                          ",
		"                                           =====                        ",          
    "                                                                        ",
		"                        ^^^  ^^^  ^^^                                   ",
		"==============      ===================                                 ",
	],
	[
    "p                                      ",
		"p   ===========                        ",
    "p                                      ", 	
    "p                                      ",
    "p                                      ",
		"p          ===============             ",
		"p                                      ",
    "p                                      ",
    "p                                      ",
    "p                                      ", 
		"p                       =======        ",
		"p      =======                         ",
		"p                                      ",
		"p                                      ",
		"    2             2                2   ",
		"                                      @",
		"=======================================",
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
    "        p    ^     pppp    p ",
    "        <  ppppp    pp<    < ",
    "      ^    <ppp<    <p       ",
    "    ppp     <p          pp   ",
    "     p<                  p   ",
    "     <                   <   ",
    "pppp                         ",
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
        "                  p    ^    pp                ",
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
        "                 pppppppp   ",
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
    "        ppp             ppp        ",
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
    "                                            ^      ^      ^ ",
    "                               p   p        p    ppp    ppp ", 
    "          ^                          p     p      p         ",
    "        ppp            ^ ^  p         ppppp  ppp            ",
    "         p             p p              p     p             ",
    "            p      p   < <                                 @",
    "            <      <                                      ^ ",
    "  p                   p^^^p                              ppp",
    "                      <ppp<     p      p             ^      ",
    "          ^ ^                   <      <            ppp     ",  
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
    "          p^         ",
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
    "  pp^^  ^              p p    ",
    "    pppppppppppppppppppp p^   ",
    "                       p ppp  ",
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
		"p": () => [
		sprite("piedra"),
		area(),
		solid(),
		origin("bot"),
 ],
	
		"m": () => [
		sprite("mafe"),
		area({width: 11, height: 16}),
		solid(),
    scale(2.1),
		origin("bot"),
	],
	"$": () => [
		sprite("coin"),
		area(),
		pos(0, -9),
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
    pos(0, -2),
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
	"@": () => [
		sprite("portal", { anim: 'idle' }),
		area({ scale: 0.01, }),
		origin("bot"),
		pos(0, -12),
		"portal",
	],
}




loadSprite("dino", "/sprites/dino.png", {

	sliceX: 9,

	anims: {
		"idle": {
			from: 0,
			to: 3,
			speed: 3,
			loop: true,
		},
		"run": {
			from: 4,
			to: 7,
			speed: 10,
			loop: true,
		},

		"jump": 8
	},
})





scene("game", ({ levelId, coins, anims } = { levelId: 0, coins: 0 }) => {

	gravity(3200)


	const level = addLevel(LEVELS[levelId ?? 0], levelConf)

let myCheckpoint = vec2(177, 179)


    add([
    sprite("bg", { width: width(), height: height() }),
    z(-9999),
    fixed()
  ]);
const player = add([
	sprite("dino"),
	pos(80, 180),
	origin("center"),
	area({width: 10, height: 20}),
	body(),
  scale(22),
  big(),
	origin("bot"),
])

player.onUpdate(() => {
     if(player.pos.x > 210) { 
         myCheckpoint = vec2(210, 580);
     }
})



player.onGround(() => {
	if (!isKeyDown("left") && !isKeyDown("right")) {
		player.play("idle")
	} else {
		player.play("run")
	}
})

player.onAnimEnd("idle", () => {

})

onKeyPress("space", () => {
	if (player.isGrounded()) {
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

	player.onCollide("portal", () => {
		play("portal")
		//location.href = "https://little-explorers-pege.herokuapp.com/cinematic"
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
				coins: coins,
			})
		} else {
			go("win")
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
		player.move(500)
  destroy(c, p)
  play("coin")
  player.jump(JUMP_FORCE * 7.7)
	})

  
	const coinsLabel = add([
		text(coins),
		pos(24, 24),
		fixed(),
	])


	onKeyPress("space", () => {

		if (player.isGrounded()) {
			player.jump(JUMP_FORCE)
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
		onKeyPress("f8", () => {
		add([
			text("tramposo - 0.5")
			])
			
	})
	
			onKeyPress("f9", () => {
		add([
			text("tramposo - 0.5")
			])
			
	})

})

scene("lose", () => {
	add([
		text("NOT USED, HOWEVER DEVELOPERS KNOW WHAT THEY DO ;)"),
	])
	onKeyRelease(() => {
    player.pos = myCheckpoint;
	})
})

scene("win", () => {
	add([
		text("DEVOPS"),
	])
	onKeyPress(() => go("game"))
})

go("menu")
