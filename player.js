const PLAYER_MOVE_SPEED = 7;
const PLAYER_JUMP_SPEED = 6;
const THROW_POWER = 30;
const PLAYER_MOMENTUM = 0.20;
const FLOOR_Y = 590;
const PLAYER_GRAVITY = 0.6;
const LEFT_WALL_X = 33;
const RIGHT_WALL_X = 770;
const DIST_TO_GRAB = 20;
const TIME_LIMIT_MAX = 100;
const RECOVERY_AFTER_TIMEOUT = 50;

function playerClass() {
	this.isAI = false;
	this.x = 50;
	this.y = FLOOR_Y;
	this.speedX = 0;
	this.speedY = 0;
	this.isOnGround = false;
	this.timeLimit = TIME_LIMIT_MAX;

	this.ballHeld = false;
	this.recentlyThrownFrameLock = 0;

	this.draw= function() {
		canvasContext.drawImage(player1, this.x-player1.width/2, this.y-player1.height);
	}
	this.throwAtMouse= function() {
		if(this.ballHeld){
			this.ballHeld = false;
			this.recentlyThrownFrameLock = 4;
			var distToMouse = dist(this.x,this.y, mouseX,mouseY);
			var toMouseX = mouseX - this.x;
			var toMouseY = mouseY - this.y;
			//Mouse position determines which direction the ball will be thrown
			ballSpeedX = toMouseX * THROW_POWER / distToMouse;
			ballSpeedY = toMouseY * THROW_POWER / distToMouse;
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
		if(this.isAI){
			if(Math.random() < 0.03){
				this.speedX = PLAYER_MOVE_SPEED;
			}
			if(Math.random() < 0.03){
				this.speedX = -PLAYER_MOVE_SPEED;
			}
		}
		else {
			if(keyHeld_MoveLeft) {
				this.speedX = -PLAYER_MOVE_SPEED;
			}
			if(keyHeld_MoveRight) {
				this.speedX = PLAYER_MOVE_SPEED;
			}
			if(keyHeld_Jump && this.isOnGround) {
				this.speedY = -PLAYER_JUMP_SPEED;
			}
		}
		//Enforce wall collisions
		if(this.x < LEFT_WALL_X) {
			this.x = LEFT_WALL_X;
		}
		if(this.x > RIGHT_WALL_X) {
			this.x = RIGHT_WALL_X;
		}
		//if above ground gravity will bring the player back down
		if(this.y < FLOOR_Y) {
			this.isOnGround = false;
			this.speedY += PLAYER_GRAVITY;
		}
		else {
			this.isOnGround = true;
			this.y = FLOOR_Y;
		}
		//Allows player to fall in a arc
		this.x += this.speedX;
		this.y += this.speedY;

		if(this.ballHeld) {
			ballX = this.x;
			ballY = this.y-player1.height/2;
			ballSpeedX = 0;
			ballSpeedY = 0;
			this.timeLimit--;
		}
		if(this.timeLimit <= 0) {
			this.timeLimit--;
			if(this.timeLimit < -RECOVERY_AFTER_TIMEOUT){
				this.timeLimit = TIME_LIMIT_MAX;
			}
			this.ballHeld = false;
		}
		//keeps player from immediately picking up the ball after being thrown
		if(this.recentlyThrownFrameLock >= 0) {
			this.recentlyThrownFrameLock--;
		}
		//Player will pick up the ball when they are within the DIST_TO_GRAB range
		else if(dist(this.x,this.y, ballX,ballY) < DIST_TO_GRAB && this.timeLimit > 0) {
			this.ballHeld = true;
		}
	}
}
