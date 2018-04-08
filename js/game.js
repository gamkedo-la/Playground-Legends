var canvas;
var canvasContext;
var p1 = new playerClass();
var p2 = new playerClass();

// variable frame rate using requestAnimationFrame
// usually at 60fps but game runs the same on low end devices
// this way you can do x = x + speedPerSec * secondsSinceLastFrame;
var secondsSinceLastFrame = 0; // usually less than zero
var currentFrameTimestamp = 0; // in MS (usually 16 or so)

var roundNumber = 1;
var betweenRounds = false;
var betweenRoundTimer = 4;
var betweenRoundTimerReset = 4;
var roundTimer = 3;
var roundTimerReset = 91;


// unimplemented full screen resizing - leave at false for now
const RESPONSIVE_CANVAS_RESIZE = false;

window.onload = function () {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	resizeCanvas();

/*
	var framesPerSecond = 30;
	setInterval(function () {
		drawAll();
		moveBall();
		p1.move();
		p2.move();
	},
		1000 / framesPerSecond);
*/

	setUpInput();
	setUpImages();
	p2.x = 650;
	p2.isAI = true;
	
	animate();

}

window.onresize = function () {
	resizeCanvas();
}

function animate(timestamp) {
	if (!timestamp) timestamp = 1; // avoid NaN and divide by zero
	secondsSinceLastFrame = (timestamp - currentFrameTimestamp) / 1000; // in seconds
	currentFrameTimestamp = timestamp; // in ms
	if (betweenRounds == false) {
	roundTimerCountdown();
	p1.move();
	p2.move();
	moveBall();
	drawAll();
	ballCollisionWithPlayers(p1);
	ballCollisionWithPlayers(p2);
	} else {
		canvasContext.fillStyle = 'black'; // Rectangle color
		canvasContext.fillRect((canvas.width/2)-150,(canvas.height/2)-75, 300,150);
		canvasContext.fillStyle = 'white'; // Text color
		canvasContext.font = '18px Helvetica'; 
		var roundDisplay = 'End of round ' + roundNumber;
		var textWidth = canvasContext.measureText(Math.floor(roundDisplay));
		canvasContext.fillText(roundDisplay, (canvas.width/2) - textWidth.width*2 + 10,canvas.height/2 - 40);
		var playerOneScore = p1.score;
		var playerTwoScore = p2.score;
		textWidth = canvasContext.measureText(Math.floor(playerOneScore));
		canvasContext.font = '28px Helvetica'; 
		canvasContext.fillText(playerOneScore, (canvas.width/2) - textWidth.width*2 - 50,canvas.height/2 + 10);
		textWidth = canvasContext.measureText(Math.floor(playerTwoScore));
		canvasContext.fillText(playerTwoScore, (canvas.width/2) - textWidth.width*2 + 100,canvas.height/2 + 10);
		betweenRoundTimer -= secondsSinceLastFrame;
		if (betweenRoundTimer <= 0) {
			betweenRounds = false;
			betweenRoundTimer = betweenRoundTimerReset;
			resetAfterRound(); 
			roundNumber++;
		}
	}
	requestAnimationFrame(animate);
}

function resizeCanvas() {
	if (!RESPONSIVE_CANVAS_RESIZE) return;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function dist(x1, y1, x2, y2) {
	var dx = x2 - x1;
	var dy = y2 - y1;

	return Math.sqrt(dx * dx + dy * dy);
}

function drawRoundTimer() {
	canvasContext.fillStyle = 'white'; // Background color
	canvasContext.font="40px Helvetica";
	var textWidth = canvasContext.measureText(Math.floor(roundTimer));
	canvasContext.fillRect(canvas.width/2 - textWidth.width/2 - 25, 10, textWidth.width + 25, 40); // Center background
	canvasContext.fillStyle = 'black'; // Text color
	canvasContext.fillText(Math.floor(roundTimer), canvas.width/2 - textWidth.width/2 - 12,44); // Center score text
}


function roundTimerCountdown() {
	if (roundTimer > 1) {
		roundTimer -= secondsSinceLastFrame;
	}
	if(roundTimer <= 11 && roundTimer > 1) {
		countdown.play();
	}
	else if(roundTimer <= 1 && roundTimer >= 0) {
		timeup.play();
		betweenRounds = true;
		roundTimer = roundTimerReset;
	}
}

function drawAll() {
	var background = document.getElementById("background");
	canvasContext.drawImage(background, 0, 0);

	if (player1Loaded) {
		p1.draw();
	}
	
	if (player2Loaded) {
		p2.draw();
	}

	drawBall();
	drawRoundTimer();
}
