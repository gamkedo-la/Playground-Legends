const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

var keyHeld_MoveLeft = false;
var keyHeld_Jump = false;
var keyHeld_MoveRight = false;
var keyHeld_Duck = false;

var mouseX = 0;
var mouseY = 0;

function keyToggle(keyCode,newState) {
	switch(keyCode) {
		case KEY_LEFT_ARROW:
			keyHeld_MoveLeft = newState;
			break;

		case KEY_UP_ARROW:
			keyHeld_Jump = newState;
			break;
		case KEY_RIGHT_ARROW:
			keyHeld_MoveRight = newState;
			break;

		case KEY_DOWN_ARROW:
			keyHeld_Duck = newState;
			break;

		default:
			return false;
	}
	return true;//key was used by game
}
function keyPressed(evt) {
	if(keyToggle(evt.keyCode,true)) {
		evt.preventDefault();
	}
}

function keyReleased(evt) {
	keyToggle(evt.keyCode,false);
}

function calculateMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.left - root.scrollTop;
}

function handleClick() {
	p1.throwAtMouse();
	p1.catchBall();
}

function setUpInput() {
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
	canvas.addEventListener('mousemove',calculateMousePos);
	canvas.addEventListener('mousedown', handleClick);
}