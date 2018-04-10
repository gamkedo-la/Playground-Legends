const PLAYER_MOVE_SPEED = 400; // pixels per second
const PLAYER_JUMP_SPEED = 300; // pixels per second
const THROW_POWER = 675;  // pixels per second
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
	this.score = 0;
	this.roundsWon = 0
	this.isOnGround = false;
	this.timeLimit = TIME_LIMIT_MAX;

	this.ballForfeit = false;
	this.ballHeld = false;
	this.recentlyThrownFrameLock = 0;

	this.IsTryingToCatch = false;

	this.draw= function() {
		if (this.isAI) {
			canvasContext.translate(this.x,this.y);
			canvasContext.scale(-1,1);
			canvasContext.drawImage(player2, 0-player2.width/2, 0-player2.height);
			canvasContext.setTransform(1,0,0,1,0,0);
		} else {
			canvasContext.drawImage(player1, this.x-player1.width/2, this.y-player1.height);
		}
	}
	this.throwAtPos= function(x,y) {
		if(this.ballHeld){
			this.ballHeld = false;
			this.recentlyThrownFrameLock = 2;
			if(this.AI){
				var velocity = THROW_POWER;
				var angle = Math.atan(y/x);
				ballSpeedX = -velocity*Math.cos(angle);
				ballSpeedY = -velocity*Math.sin(angle);
			}else{
				var distToMouse = dist(this.x,this.y, mouseX,mouseY);
				var posX = x - this.x;
				var posY = y - this.y;
				//Mouse position determines which direction the ball will be thrown
				ballSpeedX = posX * THROW_POWER / distToMouse;
				ballSpeedY = posY * THROW_POWER / distToMouse;

				//When the p1 throws the ball AI decides between trying to catch the ball or dodge the ball based on ballSpeedX
				if (Math.floor((Math.random() * 100) + 1) > ballSpeedX/THROW_POWER*100) {
					p2.IsTryingToCatch = true;
				}
        else {
          p2.IsTryingToCatch = false;
        }
			}
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
		//console.log(ballTouchedFloor);
		this.speedX *= PLAYER_MOMENTUM;
		if(this.isAI && ballY < FLOOR_Y - 2 
			&& ballSpeedX > 10 && ballSpeedY > 10){
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
				Jump.play();
				this.speedY = -PLAYER_JUMP_SPEED;
			}
		}

		//AI player moves towards ball if it is on their side and not moving very much
		if(this.isAI && !this.ballHeld
			&& ballX > MID_POINT - NET && ballY == FLOOR_Y
			&& ballSpeedX < 10 && ballSpeedY < 10) {
			if (this.x > ballX) {
				this.speedX = -PLAYER_MOVE_SPEED;
			} else {
				this.speedX = PLAYER_MOVE_SPEED;
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


		//AI throwing the ball and trying to get a hit to the player
		if(this.timeLimit === 50 && this.isAI && this.ballHeld) {
			var yOffset = -17;
			//because p1.y is FLOOR_Y
			//so we need an offset to throw the ball not at the foot of the player
			this.throwAtPos(p1.x,p1.y+yOffset);
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
			p1.score--;
			this.timeLimit--;
		} else if(p2.ballForfeit == true) {
			p2.ballForfeit = false;
			p1.ballHeld = true;
			ballX = p1.x;
			ballY = p1.y-player1.height/2;
			ballSpeedX = 0;
			ballSpeedY = 0;
			p2.score--;
			this.timeLimit--;
		}

		//keeps player from immediately picking up the ball after being thrown
		if(this.recentlyThrownFrameLock >= 0) {
			this.recentlyThrownFrameLock--;
		}
		//Player will pick up the ball when they are within the DIST_TO_GRAB range
		else if(dist(this.x,this.y, ballX,ballY) < DIST_TO_GRAB && this.timeLimit > 0) {
			this.ballHeld = true;
            catchBallSound.play();
			ballTouchedFloor = false;
			ballOutOfBoundary= false;
		}

		//if p1 holds the ball AI will back down to a certain range
		if (this.isAI && p1.ballHeld) {
			if (p1.x < this.x-400) {
				this.speedX += -PLAYER_MOVE_SPEED;
			}
			else if(p1.x > this.x-400) {
				this.speedX += PLAYER_MOVE_SPEED;
			}
		}

		//if AI decides to not the catch the ball and if the ball is above and front of him while ball is not slow, AI will go forwards because it is likely that ball is going behind of him.
		//And the ball is below certain range and is not slow, AI will go backwards
    //if AI decides to catch to ball, AI will try to go towards the ball and will try to catch it depending on balls speed.

  		if (this.isAI && ballSpeedX> 50 &&
  				!ballTouchedFloor && ballX < this.x) {
        if (!this.IsTryingToCatch) {
          console.log("not trying to catch");
          if (ballY < this.y - 80) {
            //console.log("moving towards middle");
            this.speedX -= PLAYER_MOVE_SPEED;
          }
          else {
            //console.log("moving towards back");
            this.speedX += PLAYER_MOVE_SPEED
          }
        }
        else {
          console.log("trying to catch");
          var distToAI = dist(this.x,this.y,ballX,ballY);
          if (this.x > ballX) {
          	this.speedX = -PLAYER_MOVE_SPEED;
          }
          else {
            this.speedX = PLAYER_MOVE_SPEED;
          }
          if (distToAI <= 150) {
            if (Math.floor((Math.random() * 100) + 1) > ballSpeedX/THROW_POWER*100) {
			  CatchingBall.play();
			  p2.score++;
              console.log("catch success");
              this.ballHeld = true;
            }
          }
        }
  		}

  		if (this.isAI && ballTouchedFloor == true &&
  				ballX > MID_POINT + NET) {
  			if (this.x > ballX) {
  				this.speedX = -PLAYER_MOVE_SPEED;
  				}
  			else {
  				this.speedX = PLAYER_MOVE_SPEED;					}
		}
	}
}
