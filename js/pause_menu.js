var hovering = HOVER_NONE;
var lastMouseX = mouseX;
var lastMouseY = mouseY;
var currentEffectVol = 1;
var currentMusicVol = 99;

const HOVER_MUSIC = 0;
const HOVER_EFFECTS = 1;

var musicCollider = {
    x: 110,
    y: 40,
    width: 220,
    height: 20,
}

var effectsCollider = {
    x: 110,
    y: 95,
    width: 220,
    height: 20,
}

function pauseUpdate() {
	currentEffectVol = getEffectsVolume();
	currentMusicVol = getMusicVolume();
	
    if (!keyboardControlled) {
        pauseHandleMouseHover();
        //pauseHandleMouseClick();
    }

    pauseHandleMouseMove();
    pauseDraw();
	
	musicCollider.x = canvas.width/2 - 110;
    musicCollider.y = canvas.height/2 + 40;
    musicCollider.width = 220;
    musicCollider.height = 20;
	
	effectsCollider.x = canvas.width/2 - 110;
    effectsCollider.y = canvas.height/2 + 95;
    effectsCollider.width = 220;
    effectsCollider.height = 20;
}

function pauseDraw() {
	drawAll();
	drawAlphaLayer();

	// Background
	canvasContext.globalAlpha = 0.3;
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(canvas.width/2 - 120, canvas.height/2 - 70, 240, 200);
	
	// Paused
	canvasContext.globalAlpha = 1;
	canvasContext.fillStyle = 'white';
	canvasContext.textAlign = "center";
	canvasContext.font = "40px Helvetica";
	canvasContext.fillText("Paused", canvas.width / 2, canvas.height / 2 - 20);
	
	canvasContext.fillStyle = 'white';
	canvasContext.font = "20px Helvetica";
	
	// Music Volume
	if (hovering == HOVER_MUSIC){
		canvasContext.fillStyle = 'yellow';
		canvasContext.fillRect(canvas.width/2 - 111, canvas.height/2 + 39, 222, 22);
	}
	canvasContext.fillStyle = 'red';
	canvasContext.fillRect(canvas.width/2 - 110, canvas.height/2 + 40, 220 * currentMusicVol, 20);
	canvasContext.fillStyle = 'white';
	canvasContext.fillText("Music Volume: " + Math.ceil(currentMusicVol * 100), canvas.width / 2, canvas.height / 2 + 30);

	
	// Effects Volume
	if (hovering == HOVER_EFFECTS){
		canvasContext.fillStyle = 'yellow';
		canvasContext.fillRect(canvas.width/2 - 111, canvas.height/2 + 94, 222, 22);
	}
	canvasContext.fillStyle = 'red';
	canvasContext.fillRect(canvas.width/2 - 110, canvas.height/2 + 95, 220 * currentEffectVol, 20);
	canvasContext.fillStyle = 'white';
	canvasContext.fillText("Effects Volume: " + Math.ceil(currentEffectVol * 100), canvas.width / 2, canvas.height / 2 + 85);
	
	canvasContext.textAlign = "left";
}

function pauseHandleMouseHover() {
    if (mouseX >= musicCollider.x && mouseX <= (musicCollider.x + musicCollider.width) &&
        mouseY >= musicCollider.y && mouseY <= (musicCollider.y + musicCollider.height)) {
        hovering = HOVER_MUSIC;
    } else if (mouseX >= effectsCollider.x && mouseX <= (effectsCollider.x + effectsCollider.width) &&
               mouseY >= effectsCollider.y && mouseY <= (effectsCollider.y + effectsCollider.height)) {
        hovering = HOVER_EFFECTS;
    } else {
        hovering = HOVER_NONE;
    }
}

function pauseHandleMouseClick(atX) {
	if (hovering == HOVER_MUSIC && atX != NaN) {
		var location = (atX  - (canvas.width/2 - 110)) / 220;
		setMusicVolume(location);
	}
	if (hovering == HOVER_EFFECTS && atX != NaN) {
		var location = (atX  - (canvas.width/2 - 110)) / 220;
		setEffectsVolume(location);
	}
}

function pauseKeyPressed(keycode) {
    if (keycode == KEY_UP_ARROW || keycode == KEY_DOWN_ARROW) {
        keyboardControlled = true;
        if (hovering == HOVER_MUSIC){
			hovering = HOVER_EFFECTS;
		} else {
			hovering = HOVER_MUSIC;
		}
    } else if (keycode == KEY_LEFT_ARROW) {
		if (hovering == HOVER_MUSIC) {
			setMusicVolume(getMusicVolume() - .05);
		} else if (hovering == HOVER_EFFECTS) {
			setEffectsVolume(getEffectsVolume() - .05);
		}
    } else if (keycode == KEY_RIGHT_ARROW) {
		if (hovering == HOVER_MUSIC) {
			setMusicVolume(getMusicVolume() + .05);
		} else if (hovering == HOVER_EFFECTS) {
			setEffectsVolume(getEffectsVolume() + .05);
		}
    }
}

function pauseHandleMouseMove() {
    if (mouseX != lastMouseX ||
        mouseY != lastMouseY) {
        keyboardControlled = false;
    }
    lastMouseX = mouseX;
    lastMouseY = mouseY;
}
