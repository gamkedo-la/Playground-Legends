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
		//also avoid getting stuck in the corner
		if((ballX < 0 && ballSpeedX < 0.0 ) || (ballX > canvas.width && ballSpeedX > 0.0 )){
			ballSpeedX = -ballSpeedX;
		}		
		
		//This will keep the ball within the frame of the canvas vertically
		if(ballY > FLOOR_Y || ballY < 0){
			ballSpeedY = -ballSpeedY;
		}
	}
	
function ballCollisionWithPlayers(whichPlayer) {
	  var diffX = Math.abs(ballX - whichPlayer.x);
	  var diffY = Math.abs(ballY - whichPlayer.y);
	  var closeEnough = 50; // measured in pixels
		if(diffX < closeEnough && diffY < closeEnough) {
		   ballSpeedX = -ballSpeedX;
		   ballSpeedY = -ballSpeedY;
	   }
}

function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val))
}

// UNTESTED - FIXME - TODO
// the box must be an AABB (axis-aligned bounding box)
function circleIsTouchingBox(circleX,circleY,circleRadius,boxX,boxY,boxW,boxH) {
	// closest point to the circle inside the box
	var closestX = clamp(circleX, boxX, boxX + boxW);
	var closestY = clamp(circleY, boxY, boxY + boxH);
	// measure distance
	var distanceX = circleX - closestX;
	var distanceY = circleY - closestY;
	// is closest point on box close enough to intersect circle?
	var distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
	return distanceSquared < (circleRadius * circleRadius);
}