var hovering = HOVER_NONE;
var lastMouseX = mouseX;
var lastMouseY = mouseY;

function pauseUpdate() {
    if (!keyboardControlled) {
        pauseHandleMouseHover();
        pauseHandleMouseClick();
    }

    pauseHandleMouseMove();
    pauseDraw();
}

function pauseDraw() {
	canvasContext.globalAlpha = 0.3;
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);
	canvasContext.globalAlpha = 1;
	canvasContext.fillStyle = 'white';
	canvasContext.textAlign = "center";
	canvasContext.fillText("Paused", canvas.width / 2, canvas.height / 2);
	canvasContext.textAlign = "left";
}

function pauseHandleMouseHover() {
    if (mouseX >= backCollider.x && mouseX <= (backCollider.x + backCollider.width) &&
        mouseY >= backCollider.y && mouseY <= (backCollider.y + backCollider.height)) {
        hovering = HOVER_BACK;
    } else {
        hovering = HOVER_NONE;
    }
}

function pauseHandleMouseClick() {
    if (mouseDown && hovering == HOVER_BACK) {
        scene = SCENE_MAIN_MENU;
    }
}

function pauseKeyPressed(keycode) {
    if (keycode == KEY_UP_ARROW || keycode == KEY_DOWN_ARROW) {
        keyboardControlled = true;
        hovering = HOVER_BACK;
    } else if (keycode == KEY_ENTER) {
        scene = SCENE_MAIN_MENU;
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
