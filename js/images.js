var player1 = document.createElement("img");
var player1Loaded = false;

var player2 = document.createElement("img");
var player2Loaded = false;

var ballImage = document.createElement("img");
var ballImageLoaded = false;

var shadowImage = document.createElement("img");
var shadowImageLoaded = false;

var aimerImage = document.createElement("img");
var aimerImageLoaded = false;

var impactImage = document.createElement("img");
var impactImageLoaded = false;

var animImage = document.createElement("img");
var animImageLoaded = false;
var animRunningSprite;

function setUpImages() {

	player1.onload = function () {
		player1Loaded = true;
	}
	player1.src = "images/player1.png";

	player2.onload = function () {
		player2Loaded = true;
	}
	player2.src = "images/player2.png";

	/*player3.onload = function () {
		player3Loaded = true;
	}
	player3.src = "images/player3.png";
	
	player4.onload = function () {
		player4Loaded = true;
	}
	player4.src = "images/player4.png";*/

	ballImage.onload = function () {
		ballImageLoaded = true;
	}
	ballImage.src = "images/redball.png";

	shadowImage.onload = function () {
		shadowImageLoaded = true;
	}
	shadowImage.src = "images/shadow.png";

	aimerImage.onload = function () {
		aimerImageLoaded = true;
	}
	aimerImage.src = "images/aimer.png";

	impactImage.onload = function () {
		impactImageLoaded = true;
	}
	impactImage.src = "images/impact.png";

	animRunningSprite = sprite({
		context: canvasContext,
		width: 195,
		height: 124,
		image: animImage,
		loop: true,
		numberOfFrames: 3,
		ticksPerFrame: 10,
	});
	animImage.onload = function () {
		animImageLoaded = true;
	}
	animImage.src = "images/playerRunningSpriteSheet.png";
}

function drawImageRotatedAlpha(canvasContext, image, x, y, angle, opacity) {
	canvasContext.save();
	canvasContext.translate(x, y);
	if (angle !== undefined) {
		canvasContext.rotate(angle);
	}
	if (opacity !== undefined) canvasContext.globalAlpha = opacity;
	canvasContext.drawImage(image, -image.width / 2, -image.height / 2);
	canvasContext.restore();
}
