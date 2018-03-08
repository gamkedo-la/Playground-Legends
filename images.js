var player1 = document.createElement("img");
var player1Loaded = false;

function setUpImages() {
	player1.onload = function() {
		player1Loaded = true;	
	}
	player1.src = "player1.png";
}