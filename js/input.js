const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_A = 65;
const KEY_D = 68;
const KEY_W = 87;
const KEY_S = 83;

var keyHeld_MoveLeft = false;
var keyHeld_Jump = false;
var keyHeld_MoveRight = false;
var keyHeld_Duck = false;

var mouseX = 0;
var mouseY = 0;

function keyToggle(keyCode,newState) {
	switch(keyCode) {
		case KEY_LEFT_ARROW:
		case KEY_A:
			keyHeld_MoveLeft = newState;
			break;
        case KEY_UP_ARROW:
		case KEY_W:
           	keyHeld_Jump = newState;
            break;
		case KEY_RIGHT_ARROW:
		case KEY_D:
			keyHeld_MoveRight = newState;
			break;
		case KEY_DOWN_ARROW:
		case KEY_S:
			keyHeld_Duck = newState;
			break;

		default:
			return false;
	}
	return true; //key was used by game
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
	p1.throwAtPos(mouseX,mouseY);
	p1.catchBall();
}

function setUpInput() {
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
	canvas.addEventListener('mousemove',calculateMousePos);
	canvas.addEventListener('mousedown', handleClick);
}
