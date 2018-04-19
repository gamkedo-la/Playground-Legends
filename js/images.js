var player1 = document.createElement("img");
var player1Loaded = false;

var player1ThrowingImage = document.createElement("img");
var player1ThrowingImageLoaded = false;
var player1ThrowingSprite;

var player1JumpingImage = document.createElement("img");
var player1JumpingImageLoaded = false;
var player1JumpingSprite;

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

var player2RunningImage = document.createElement("img");
var player2RunningImageLoaded = false;
var player2RunningSprite;

var player3RunningImage = document.createElement("img");
var player3RunningImageLoaded = false;
var player3RunningSprite;

var player4RunningImage = document.createElement("img");
var player4RunningImageLoaded = false;
var player4RunningSprite;

var menuLogo = document.createElement("img");
var menuLogoImageLoaded = false;
var menuLogoSprite;

var menuPlayers = document.createElement("img");
var menuPlayersImageLoaded = false;
var menuPlayersSprite;

var blackboardPopUp = document.createElement("img");
var blackboardPopUpLoaded = false;

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

	player1ThrowingSprite = sprite({
		context: canvasContext,
		width: 320,
		height: 124,
		image: player1ThrowingImage,
		loop: false,
		numberOfFrames: 4,
		ticksPerFrame: 5,
	});
	animImage.onload = function () {
		player1ThrowingImageLoaded = true;
	}
	player1ThrowingImage.src = "images/throwingSpriteSheet.png";
    
    player1JumpingSprite = sprite({
		context: canvasContext,
		width: 300,
		height: 124,
		image: player1JumpingImage,
		loop: false,
		numberOfFrames: 3,
		ticksPerFrame: 6,
	});
    animImage.onload = function () {
		player1JumpingImageLoaded = true;
	}
	player1JumpingImage.src = "images/player1JumpingSpriteSheet.png";

	player2RunningSprite = sprite({
		context: canvasContext,
		width: 195,
		height: 124,
		image: player2RunningImage,
		loop: true,
		numberOfFrames: 3,
		ticksPerFrame: 10,
	});
	player2RunningImage.onload = function () {
		player2RunningImageLoaded = true;
	}
	player2RunningImage.src = "images/player2RunningSpriteSheet.png";

	player3RunningSprite = sprite({
		context: canvasContext,
		width: 195,
		height: 124,
		image: player3RunningImage,
		loop: true,
		numberOfFrames: 3,
		ticksPerFrame: 10,
	});
	player3RunningImage.onload = function () {
		player3RunningImageLoaded = true;
	}
	player3RunningImage.src = "images/player3RunningSpriteSheet.png";

	player4RunningSprite = sprite({
		context: canvasContext,
		width: 195,
		height: 124,
		image: player4RunningImage,
		loop: true,
		numberOfFrames: 3,
		ticksPerFrame: 10,
	});
	player4RunningImage.onload = function () {
		player4RunningImageLoaded = true;
	}
	player4RunningImage.src = "images/player4RunningSpriteSheet.png";

    menuLogo.onload = function () {
        menuLogoImageLoaded = true;
    }
    menuLogo.src = "images/menuLogo.png";

    menuPlayers.onload = function () {
        menuPlayersImageLoaded = true;
    }
    menuPlayers.src = "images/menuPlayers.png";

	blackboardPopUp.onload = function () {
		blackboardPopUpLoaded = true;
	}
	blackboardPopUp.src = "images/blackboard.png";
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
