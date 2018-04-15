const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_A = 65;
const KEY_D = 68;
const KEY_W = 87;
const KEY_S = 83;
const KEY_P = 80;
const KEY_ENTER = 13;

var keyHeld_MoveLeft = false;
var keyHeld_Jump = false;
var keyHeld_MoveRight = false;
var keyHeld_Duck = false;

var mouseX = 0;
var mouseY = 0;
var mouseDown = false;

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
		case KEY_P:
			if (newState) {
				togglePauseState();
			}
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

	switch (scene) {
		case SCENE_MAIN_MENU: {
			mainMenuKeyPressed(evt.keyCode);
			break;
		}

		case SCENE_HOW_TO: {
			howToPlayKeyPressed(evt.keyCode);
			break;
		}

		case SCENE_CREDITS: {
			creditsKeyPressed(evt.keyCode);
			break;
		}
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
	mouseDown = true;
	p1.throwAtPos(mouseX,mouseY);
	p1.catchBall();
	//console.log("Clicked");
}

function handleClickRelease() {
	mouseDown = false;
}

function setUpInput() {
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
	canvas.addEventListener('mousemove',calculateMousePos);
	canvas.addEventListener('mousedown', handleClick);
	canvas.addEventListener('mouseup', handleClickRelease);
}
