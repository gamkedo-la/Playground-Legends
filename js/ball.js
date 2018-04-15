const BALL_RADIUS = 20; // must match sprite size
const BALL_BOUNCE = -0.5; // collision restitution
const BALL_MOMENTUM = 0.8; // air friction/drag
const BALL_GRAVITY = 800; // pixels per second
const BALL_GROUND = FLOOR_Y - 20;
const SHADOW_GROUND = FLOOR_Y - 15;

var ballSpeedX = 0; // pixels per second
var ballSpeedY = 0; // pixels per second

var ballX = 100;
var ballY = FLOOR_Y;
var ballTouchedFloor;
var ballOutOfBoundary; //the boundary is the horizontal screen canvas for now

// ball trails
var ballTrail = [];
var ballTrailMax = 30;

// impact "puff" of dust
const impactEffectFrameCount = 30;
const impactImageRadius = 32;
var impactFramesPending = 0;
var impactX = 0;
var impactY = 0;
var impactAngle = 0;

var thrownByPlayer = null;

function drawBall() {

	if (shadowImageLoaded &&
		!p1.ballHeld && !p2.ballHeld) {
		canvasContext.drawImage(shadowImage, ballX - BALL_RADIUS, SHADOW_GROUND);
	}

	if (ballImageLoaded) {
		canvasContext.drawImage(ballImage, ballX - BALL_RADIUS, ballY - BALL_RADIUS);

		if (p1.ballHeld == false && p2.ballHeld == false) {
			trailEffect();
		}

	}

	if (impactFramesPending > 0 && impactImageLoaded) {
		drawImageRotatedAlpha(canvasContext, impactImage, impactX, impactY, impactAngle, (1 - (impactFramesPending / impactEffectFrameCount)));
		impactFramesPending--;
	}


}

function trailEffect() {
	// trail effect
	for (var loop = 0; loop < ballTrail.length; loop++) {
		canvasContext.globalAlpha = loop / ballTrailMax / 8 + 0.01;
		canvasContext.drawImage(ballImage, ballTrail[loop].x - BALL_RADIUS, ballTrail[loop].y - BALL_RADIUS);
	}
	canvasContext.globalAlpha = 1;
}

function impactEffect() {
	impactFramesPending = impactEffectFrameCount;
	impactX = ballX - BALL_RADIUS;
	impactY = ballY - BALL_RADIUS;
	impactAngle = Math.atan2(ballSpeedY, -ballSpeedX); // fixme is this right?
	// move to outside edge of ball in direction of it's movement
	impactX += Math.cos(impactAngle * Math.PI / 180) * impactImageRadius;
	impactY -= Math.sin(impactAngle * Math.PI / 180) * impactImageRadius;
	// careful: if we bounce, THEN add effect, it's in the wrong direction
	// might be better to just hardcode straight up when hitting the floor etc
}

function moveBall() {

	//console.log('moveball pos:'+ballX+','+ballY+' spd:'+ballSpeedX+','+ballSpeedY+' dt:'+secondsSinceLastFrame);

	//Allows the ball to move anywhere on screen and at a constant speed
	//regardless of framerate
	ballX = ballX + (ballSpeedX * secondsSinceLastFrame);
	ballY = ballY + (ballSpeedY * secondsSinceLastFrame);
	if (ballY < BALL_GROUND) {
		ballSpeedY += (BALL_GRAVITY * secondsSinceLastFrame);
	}
	else {
		impactEffect();
		ballY = BALL_GROUND;
		ballSpeedX *= BALL_MOMENTUM;
		ballSpeedY *= BALL_BOUNCE;
		HitByBall.play();
		if (ballSpeedX <= 3 && ballSpeedY <= 3) {
			HitByBall.pause();
		}
		//ballGroundHandling();
	}

	/*function ballGroundHandling() {
			   if(ballSpeedY !== 0 && ballSpeedX !== 0) { //play sound if ball is on ground, but still in motion
				   ballBounced = true;
				   HitByBall.play();
			 } else {
			 ballBounced = false;
		 }
	 }*/



	//This will keep the ball within the frame of the canvas horizontally
	//also avoid getting stuck in the corner
	if ((ballX < 0 && ballSpeedX < 0.0) || (ballX > canvas.width && ballSpeedX > 0.0)) {
		impactEffect();
		HitByBall.play();
		ballOutOfBoundary = true;
		ballSpeedX = -ballSpeedX;
	}

	if (p1.ballHeld || p2.ballHeld) {
		ballTouchedFloor = false;
	}
	if (ballY > FLOOR_Y - 21) {
		impactEffect();
		ballTouchedFloor = true;
	}

	//This will keep the ball within the frame of the canvas vertically
	if (ballY > FLOOR_Y || ballY < 0) {
		impactEffect();
		ballTouchedFloor = true;
		ballSpeedY = -ballSpeedY;
	}

	// remember previous ball positions for trail effect
	ballTrail.push({ x: ballX, y: ballY }); // add a fresh new one to the end of the array
	if (ballTrail.length > ballTrailMax) ballTrail.shift(); // delete oldest entry if array is full
}

function ballCollisionWithPlayers(whichPlayer) {
	if (p1.ballHeld || p2.ballHeld || ballTouchedFloor || ballOutOfBoundary || thrownByPlayer === whichPlayer) {
		return false;
	}
	var diffX = Math.abs(ballX - whichPlayer.x);
	var diffY = Math.abs(ballY - whichPlayer.y);
	var closeEnough = 50; // measured in pixels
	if (diffX < closeEnough && diffY < closeEnough) {
		impactEffect();
		ballSpeedX = -ballSpeedX;
		ballSpeedY = -ballSpeedY;
		return true;
	} // Above is for legs; next we will check head
	diffX = Math.abs(ballX - (whichPlayer.x));
	diffY = Math.abs(ballY - (whichPlayer.y - player1.height * 0.6));
	closeEnough = 10; // measured in pixels
	if (diffX < closeEnough && diffY < closeEnough) {
		impactEffect();
		ballSpeedX = -ballSpeedX;
		ballSpeedY = -ballSpeedY;
		shakeScreen();
		return true;
	}
	return false;
}

function clamp(val, min, max) {
	return Math.max(min, Math.min(max, val))
}

// UNTESTED - FIXME - TODO
// the box must be an AABB (axis-aligned bounding box)
function circleIsTouchingBox(circleX, circleY, circleRadius, boxX, boxY, boxW, boxH) {
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
