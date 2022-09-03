//CodedByLuis
import kaboom from "kaboom"

kaboom({

	scale: 6,  

	font: "sinko",
})


loadSprite("dino", "/sprites/dino.png", {

	sliceX: 9,

	anims: {
		"idle": {

			from: 0,
			to: 3,

			speed: 2,
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

const SPEED = 50
const JUMP_FORCE = 240

gravity(640)


const player = add([
	sprite("dino"),
	pos(center()),
	origin("center"),
	area(),
	body(),
])


player.play("idle")

add([
	rect(width(), 24),
	area(),
	outline(1),
	pos(0, height() - 24),
	solid(),
])



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
		player.play("jump")
	}
})

onKeyDown("left", () => {
	player.move(-SPEED, 0)
	player.flipX(true)

	if (player.isGrounded() && player.curAnim() !== "run") {
		player.play("run")
	}
})

onKeyDown("right", () => {
	player.move(SPEED, 0)
	player.flipX(false)
	if (player.isGrounded() && player.curAnim() !== "run") {
		player.play("run")
	}
})

onKeyRelease(["left", "right"], () => {
	if (player.isGrounded() && !isKeyDown("left") && !isKeyDown("right")) {
		player.play("idle")
	}
})
