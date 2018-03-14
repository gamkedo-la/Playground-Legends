var player1 = document.createElement("img");
var player1Loaded = false;

var ballImage = document.createElement("img");
var ballImageLoaded = false;


function setUpImages() {

	player1.onload = function() {
		player1Loaded = true;	
	}
	player1.src = "images/player1.png";

	ballImage.onload = function() {
		ballImageLoaded = true;	
	}
	ballImage.src = "images/redball.png";

}