const PLAYER_MOVE_SPEED = 400; // pixels per second
const PLAYER_JUMP_SPEED = 300; // pixels per second
const THROW_POWER = 600;  // pixels per second
const PLAYER_GRAVITY = 800; // pixels per second

const PLAYER_MOMENTUM = 0.20; // friction/drag
const FLOOR_Y = 520;
const LEFT_WALL_X = 20;
const MID_POINT = 385;
const NET = 30;
const RIGHT_WALL_X = 780;
const DIST_TO_GRAB = 47;
const TIME_LIMIT_MAX = 170;
const RECOVERY_AFTER_TIMEOUT = 50;

function playerClass() {
	this.isAI = false;
	this.x = 50;
	this.y = FLOOR_Y;
	this.speedX = 0;
	this.speedY = 0;
	this.isOnGround = false;
	this.timeLimit = TIME_LIMIT_MAX;

	this.ballForfeit = false;
	this.ballHeld = false;
	this.recentlyThrownFrameLock = 0;

	this.draw= function() {
		if (this.isAI) {
			canvasContext.translate(this.x,this.y);
			canvasContext.scale(-1,1);
			canvasContext.drawImage(player1, 0-player1.width/2, 0-player1.height);
			canvasContext.setTransform(1,0,0,1,0,0);
		} else {
			canvasContext.drawImage(player1, this.x-player1.width/2, this.y-player1.height);
		}
	}
	this.throwAtPos= function(x,y) {
		if(this.ballHeld){
			this.ballHeld = false;
			this.recentlyThrownFrameLock = 2;
			var distToMouse = dist(this.x,this.y, mouseX,mouseY);
			var posX = x - this.x;
			var posY = y - this.y;
			//Mouse position determines which direction the ball will be thrown
			ballSpeedX = posX * THROW_POWER / distToMouse;
			ballSpeedY = posY * THROW_POWER / distToMouse;
		}
	}

	this.catchBall= function() {
		if(!this.ballHeld && this.recentlyThrownFrameLock == 0) {
			var distToMouse = dist(this.x, this.y, mouseX, mouseY);
			if (distToMouse <= DIST_TO_GRAB) {
				this.ballHeld = true;
			}
		}
	}

	this.move=function() {
		this.speedX *= PLAYER_MOMENTUM;
		if(this.isAI && ballY < FLOOR_Y - 2){
			if(Math.random() < 0.03){
				this.speedX = PLAYER_MOVE_SPEED;
			}
			if(Math.random() < 0.03){
				this.speedX = -PLAYER_MOVE_SPEED;
			}
		}
		else {
			if(keyHeld_MoveLeft && !this.isAI) {
				this.speedX = -PLAYER_MOVE_SPEED;
			}
			if(keyHeld_MoveRight && !this.isAI) {
				this.speedX = PLAYER_MOVE_SPEED;
			}
			if(keyHeld_Jump && this.isOnGround && !this.isAI) {
				this.speedY = -PLAYER_JUMP_SPEED;
			}
		}

		//AI player moves towards ball if it is on their side and not moving very much
		if(this.isAI && !this.ballHeld 
			&& ballX > MID_POINT + NET && ballY == FLOOR_Y
			&& ballSpeedX < 3 && ballSpeedY < 3) {
			if (this.x > ballX) {
				this.speedX = -PLAYER_MOVE_SPEED;
			} else {
				this.speedX = PLAYER_MOVE_SPEED;
			}
		}

		//AI player tries to catch the ball if the ball is thrown on its side
		//also if player speed is more than the ball speed, it tries to match the speed of the ball
		//after ball is thrown back, it does not follow the ball
		if(this.isAI && !this.ballHeld 
			&& ballX > MID_POINT + NET && ballY < FLOOR_Y && ballSpeedX>0.0) {
			if (this.x > ballX) {
				this.speedX = -PLAYER_MOVE_SPEED;
				if(Math.abs(this.speedX)>Math.abs(ballSpeedX)){
					this.speedX = -ballSpeedX;
				}
			} else {
				this.speedX = PLAYER_MOVE_SPEED;
				if(Math.abs(this.speedX)>Math.abs(ballSpeedX)){
					this.speedX = ballSpeedX;
				}
			}
		}

		//Enforce wall collisions and mid-point collisions
		if(p1.x < LEFT_WALL_X) {
			p1.x = LEFT_WALL_X;
		}
		if(p1.x > MID_POINT) {
			p1.x = MID_POINT;
		}
		if(p2.x > RIGHT_WALL_X) {
			p2.x = RIGHT_WALL_X;
		}
		if(p2.x < MID_POINT) {
			p2.x = MID_POINT;
		}
		//if above ground gravity will bring the player back down
		if(this.y < FLOOR_Y) {
			this.isOnGround = false;
			this.speedY += (PLAYER_GRAVITY * secondsSinceLastFrame);
		}
		else {
			this.isOnGround = true;
			this.y = FLOOR_Y;
		}

		// TODO: Quick hack to stop player from falling some pixels beneath FLOOR_Y after jumping;
		// to be replaced…
		if (p1.y > FLOOR_Y)
			p1.y = FLOOR_Y;
		if (p2.y > FLOOR_Y)
			p2.y = FLOOR_Y;
		
		//Allows player to fall in a arc
		//at same speed regardless of framerate
		this.x += (this.speedX * secondsSinceLastFrame);
		this.y += (this.speedY * secondsSinceLastFrame);

		if(this.ballHeld) {
			ballX = this.x;
			ballY = this.y-player1.height/2;
			ballSpeedX = 0;
			ballSpeedY = 0;
			this.timeLimit--;
		}
		else {
			this.timeLimit = TIME_LIMIT_MAX;
		}
		
		//AI throwing the ball and tries to throw it in position where player1 is not present
		if(this.timeLimit === 50 && this.isAI && this.ballHeld) {
			var velocity = Math.floor((Math.random()*(THROW_POWER))+(THROW_POWER-200));
			var angle = (Math.random()*(Math.PI/2))+0.1;
			var xDisOfTrajectory = (velocity*Math.cos(angle))*((2*velocity*Math.sin(angle))/BALL_GRAVITY)			
			var xLandedBallPos = p2.x - xDisOfTrajectory;
			// console.log(xDisOfTrajectory);
			// console.log(p1.x);
			// console.log(xLandedBallPos);
			while(!(xLandedBallPos != p1.x && (MID_POINT > xLandedBallPos) && (xLandedBallPos > 0))){
				velocity = Math.floor((Math.random()*(THROW_POWER))+(THROW_POWER-200));
				angle = (Math.random()*(Math.PI/2))+0.1;
				xDisOfTrajectory = (velocity*Math.cos(angle))*((2*velocity*Math.sin(angle))/BALL_GRAVITY)			
				xLandedBallPos = p2.x - xDisOfTrajectory;
			}
			this.ballHeld = false;
			this.recentlyThrownFrameLock = 2;
			ballSpeedX = -velocity*Math.cos(angle);
			ballSpeedY = -velocity*Math.sin(angle);				
		}

		if(this.timeLimit <= 0) {
			this.timeLimit--;
			if(this.timeLimit < -RECOVERY_AFTER_TIMEOUT){ //Resets the timeLimit to hold the ball when it expires
				this.timeLimit = TIME_LIMIT_MAX;  
			}
			this.ballHeld = false;
			this.ballForfeit = true;
		}
		//Both players will forfeit the ball to one another if they hold the ball for too long without throwing it
		if(p1.ballForfeit == true) {
			p1.ballForfeit = false;
			p2.ballHeld = true;
			ballX = p2.x;
			ballY = p2.y-player1.height/2;
			ballSpeedX = 0;
			ballSpeedY = 0;
			this.timeLimit--;
		} else if(p2.ballForfeit == true) {
			p2.ballForfeit = false;
			p1.ballHeld = true;
			ballX = p1.x;
			ballY = p1.y-player1.height/2;
			ballSpeedX = 0;
			ballSpeedY = 0;
			this.timeLimit--;
		}

		//keeps player from immediately picking up the ball after being thrown
		if(this.recentlyThrownFrameLock >= 0) {
			this.recentlyThrownFrameLock--;
		}
		//Player will pick up the ball when they are within the DIST_TO_GRAB range
		else if(dist(this.x,this.y, ballX,ballY) < DIST_TO_GRAB && this.timeLimit > 0) {
			this.ballHeld = true;
			ballTouchedFloor = false;
			ballOutOfBoundary= false;
		}
	}
}
