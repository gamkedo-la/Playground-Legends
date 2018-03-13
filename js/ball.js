const BALL_RADIUS = 9;
const BALL_BOUNCE = -0.5;
const BALL_MOMENTUM = 0.50;
const BALL_GRAVITY = 0.4;

var ballX = 100;
var ballY = FLOOR_Y;

var ballSpeedX = 0;
var ballSpeedY = 0;

function moveBall() {
		
		//Allows the ball to move anywhere on screen and at a constant speed
		ballX = ballX + ballSpeedX;
		ballY = ballY + ballSpeedY;
		if(ballY < FLOOR_Y) {
			ballSpeedY += BALL_GRAVITY;
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