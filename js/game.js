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
var roundTimer = 90;

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
	roundTimer -= secondsSinceLastFrame;
	p1.move();
	p2.move();
	moveBall();
	drawAll();
	ballCollisionWithPlayers(p1);
	ballCollisionWithPlayers(p2);
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

function drawAll() {
	var background = document.getElementById("background");
	canvasContext.drawImage(background, 0, 0);

	if (player1Loaded) {
		p1.draw();
		p2.draw();
	}

	drawBall();
	drawRoundTimer();
	//canvasContext.fillStyle = 'red';
	//canvasContext.beginPath();
	//canvasContext.arc(ballX, ballY, BALL_RADIUS, 0,Math.PI * 2, true);
	//canvasContext.fill();	
}
