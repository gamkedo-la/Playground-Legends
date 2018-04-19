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
var roundTimer = 40;
var roundTimerReset = 41;
const SCORE_TO_WIN_MATCH = 2;
var matchEnd = false;
const MAX_HITS = 2;

var gamePaused = false;
var shakeAmt = 0.0;
var background;

const SCENE_MAIN_MENU = 1;
const SCENE_HOW_TO = 2;
const SCENE_GAME = 3;
const SCENE_CREDITS = 4;
const SCENE_PAUSE_MENU = 5;
var scene = SCENE_MAIN_MENU;

// unimplemented full screen resizing - leave at false for now
const RESPONSIVE_CANVAS_RESIZE = false;
const SHAKE_DECAY = 0.8;
const SHAKE_PIXELS = 15;

window.onload = function () {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	background = document.getElementById("background");

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

	switch (scene) {
		case SCENE_MAIN_MENU: {
			DodgeMenu.play();
			mainMenuUpdate();
			break;
		}

		case SCENE_HOW_TO: {
			howToPlayUpdate();
			break;
		}

		case SCENE_CREDITS: {
			creditsUpdate();
			break;
		}
		
		case SCENE_PAUSE_MENU: {
			pauseUpdate();
			break;
		}

		default: {
			drawAll();

			if (betweenRounds == false) {

				if (gamePaused == false) {
					roundTimerCountdown();
					p1.move();
					p2.move();
					moveBall();
				}

				if (matchEnd) {
					p1.roundsWon = 0;
					p2.roundsWon = 0;
					roundNumber = 1;
					matchEnd = false
				}

				pgroundherogamesong.play();
				
				if (ballCollisionWithPlayers(p1)) { // returns 1 if hit, 0 if not
					p2.score++; // player 1 was hit so player 2 scores
					if (p2.score >= MAX_HITS) {
						endTheRound()
					}
				}
				if (ballCollisionWithPlayers(p2)) {
					p1.score++; // player 2 was hit so player 1 scores
					if (p1.score >= MAX_HITS) {
						endTheRound()
					}
				}			
			} else {
				pgroundherogamesong.pause();
				
				betweenRoundTimer -= secondsSinceLastFrame;
				if (betweenRoundTimer <= 0) {
					betweenRounds = false;
					betweenRoundTimer = betweenRoundTimerReset;
					resetAfterRound();
					roundNumber++;
				}
				
				matchEnd = p1.roundsWon === SCORE_TO_WIN_MATCH || p2.roundsWon === SCORE_TO_WIN_MATCH;				
				drawScoreboard(matchEnd);
				
				if (matchEnd) {
					resetAfterMatch();
				}
			}
						
			drawScores();
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
	canvasContext.font = "40px Helvetica";
	var textWidth = canvasContext.measureText(Math.floor(roundTimer));
	canvasContext.fillRect(canvas.width / 2 - textWidth.width / 2 - 25, 10, textWidth.width + 25, 40); // Center background
	canvasContext.fillStyle = 'black'; // Text color
	canvasContext.fillText(Math.floor(roundTimer), canvas.width / 2 - textWidth.width / 2 - 12, 44); // Center score text
}

function roundTimerCountdown() {
	if (roundTimer > 1) {
		roundTimer -= secondsSinceLastFrame;
	}
	if (roundTimer <= 11 && roundTimer > 1) {
		countdown.play();
	}
	else if (roundTimer <= 1 && roundTimer >= 0) {
		endTheRound()
	}
}

function endTheRound() {
	timeup.play();
	betweenRounds = true;
	roundTimer = roundTimerReset;

	// Check who won round and assign point
	if (p1.score > p2.score) {
		p1.roundsWon++;
	}
	else if (p2.score > p1.score) {
		p2.roundsWon++;
	}
}

function drawBallForfeitTimer() {
	var drawX = 0;
	var drawY = 0;
	var drawTime = 0.0;

	if (p1.ballHeld) {
		drawX = p1.x;
		drawY = p1.y;
		drawTime = p1.timeLimit * .588; //calculated to change 170 timeLimit to percentage
	}
	if (p2.ballHeld) {
		drawX = p2.x;
		drawY = p2.y;
		drawTime = p2.timeLimit * .588;
	}

	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(drawX - 20, drawY - 135, 40, 10);
	canvasContext.fillStyle = 'red';
	canvasContext.fillRect(drawX - 18, drawY - 133, 36 * (drawTime / 100), 6);
}

function drawScores() {
	canvasContext.fillStyle = 'white';
	canvasContext.font = "40px Helvetica";
	canvasContext.fillText(p1.score, 20, canvas.height - 20);
	canvasContext.fillText(p2.score, canvas.width - 80, canvas.height - 20);
}

function drawScoreboard(matchEnd = false) {	
	//canvasContext.fillStyle = 'black'; // Rectangle color
	//canvasContext.fillRect((canvas.width / 2) - 150, (canvas.height / 2) - 75, 300, 150);
	
	canvasContext.globalAlpha = 0.3;
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0,0,canvas.width,canvas.height);

	canvasContext.globalAlpha = 1.0;	
	canvasContext.drawImage(blackboardPopUp, (canvas.width / 2) - 150, (canvas.height / 2) - 75);
	
	canvasContext.fillStyle = 'white'; // Text color
	canvasContext.font = '18px Helvetica';		
	
	var roundDisplay = matchEnd ? (p1.roundsWon > p2.roundsWon ? 'You Win!' : 'You Lose!') : 'End of round ' + roundNumber;	
	var textWidth = canvasContext.measureText(Math.floor(roundDisplay));
	
	canvasContext.fillText(roundDisplay, (canvas.width / 2) - textWidth.width * 2 + 10, canvas.height / 2 - 40);

	if (!matchEnd) {
		var playerOneScore = p1.roundsWon;
		var playerTwoScore = p2.roundsWon;

		textWidth = canvasContext.measureText(Math.floor(playerOneScore));

		canvasContext.font = '28px Helvetica';
		canvasContext.fillText(playerOneScore, (canvas.width / 2) - textWidth.width * 2 - 50, canvas.height / 2 + 10);

		textWidth = canvasContext.measureText(Math.floor(playerTwoScore));
		canvasContext.fillText(playerTwoScore, (canvas.width / 2) - textWidth.width * 2 + 100, canvas.height / 2 + 10);
	}
}

function drawAimer() {
	if (p1.ballHeld) {
		canvasContext.drawImage(aimerImage, mouseX - 20, mouseY - 20);
	}
}

function drawAll() {
	shakeAmt *= SHAKE_DECAY;
	canvasContext.save();
	canvasContext.translate((Math.random() - 0.5) * shakeAmt, (Math.random() - 0.5) * shakeAmt);
	canvasContext.drawImage(background, 0, 0);

	if (player1Loaded) {
		p1.draw();
	}

	if (player2Loaded) {
		p2.draw();
	}

	drawBall();
	drawAimer();

	canvasContext.restore(); // Lines after this won't shake from screen shake.
	drawRoundTimer();
	drawBallForfeitTimer();
}

function togglePauseState() {
	gamePaused = !gamePaused;
	if (gamePaused){
		scene = SCENE_PAUSE_MENU;
	}
	else {
		scene = SCENE_GAME;
	}
}

function shakeScreen() {
	shakeAmt = SHAKE_PIXELS;
}
