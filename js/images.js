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


function setUpImages() {

	player1.onload = function () {
		player1Loaded = true;
	}
	player1.src = "images/player1.png";

	player2.onload = function () {
		player2Loaded = true;
	}
	player2.src = "images/player2.png";

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

}