const BALL_RADIUS = 20; // must match sprite size
const BALL_BOUNCE = -0.5; // collision restitution
const BALL_MOMENTUM = 0.8; // air friction/drag
const BALL_GRAVITY = 800; // pixels per second

var ballSpeedX = 0; // pixels per second
var ballSpeedY = 0; // pixels per second

var ballX = 100;
var ballY = FLOOR_Y;

function drawBall() {

	if (shadowImageLoaded) {
		canvasContext.drawImage(shadowImage, ballX-BALL_RADIUS, FLOOR_Y+10);
	}

	if (ballImageLoaded) {
		canvasContext.drawImage(ballImage, ballX-BALL_RADIUS, ballY-BALL_RADIUS);
	}

}

function moveBall() {
		
		//console.log('moveball pos:'+ballX+','+ballY+' spd:'+ballSpeedX+','+ballSpeedY+' dt:'+secondsSinceLastFrame);
	
		//Allows the ball to move anywhere on screen and at a constant speed
		//regardless of framerate
		ballX = ballX + (ballSpeedX * secondsSinceLastFrame);
		ballY = ballY + (ballSpeedY * secondsSinceLastFrame);

		if(ballY < FLOOR_Y) {
			ballSpeedY += (BALL_GRAVITY * secondsSinceLastFrame);
		}
		else {
			ballY = FLOOR_Y;
			ballSpeedX *= BALL_MOMENTUM;
			ballSpeedY *= BALL_BOUNCE;
		}
		
		//This will keep the ball within the frame of the canvas horizontally
		if(ballX > canvas.width || ballX < 0){
			ballSpeedX = -ballSpeedX;
		}
		
		//This will keep the ball within the frame of the canvas vertically
		if(ballY > FLOOR_Y || ballY < 0){
			ballSpeedY = -ballSpeedY;
		}
	}