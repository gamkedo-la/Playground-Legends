function resetAfterRound() {
	p1.x = 50;
	p1.y = FLOOR_Y;
	p1.speedX = 0;
	p1.speedY = 0;
	p1.isOnGround = true;
	p1.timeLimit = TIME_LIMIT_MAX;
	p1.ballForfeit = false;
	p1.ballHeld = false;
	p1.recentlyThrownFrameLock = 0;
	p1.score = 0;

	p2.x = 650;
	p2.y = FLOOR_Y;
	p2.speedX = 0;
	p2.speedY = 0;
	p2.isOnGround = true;
	p2.timeLimit = TIME_LIMIT_MAX;
	p2.ballForfeit = false;
	p2.ballHeld = false;
	p2.recentlyThrownFrameLock = 0;
	p2.IsTryingToCatch = false;
	p2.score = 0;

	ballX = 100;
	ballY = FLOOR_Y;
	ballSpeedX = 0;
	ballSpeedY = 0;

}

function resetAfterMatch() {
	p1.x = 50;
	p1.y = FLOOR_Y;
	p1.speedX = 0;
	p1.speedY = 0;
	p1.isOnGround = true;
	p1.timeLimit = TIME_LIMIT_MAX;
	p1.ballForfeit = false;
	p1.ballHeld = false;
	p1.recentlyThrownFrameLock = 0;
	p1.score = 0;

	p2.x = 650;
	p2.y = FLOOR_Y;
	p2.speedX = 0;
	p2.speedY = 0;
	p2.isOnGround = true;
	p2.timeLimit = TIME_LIMIT_MAX;
	p2.ballForfeit = false;
	p2.ballHeld = false;
	p2.recentlyThrownFrameLock = 0;
	p2.IsTryingToCatch = false;
	p2.score = 0;

	ballX = 100;
	ballY = FLOOR_Y;
	ballSpeedX = 0;
	ballSpeedY = 0;

	randomizeBackground();
}