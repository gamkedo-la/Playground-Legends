const HOVER_NONE = 0;
const HOVER_START = 1;
const HOVER_HOW = 2;
const HOVER_CREDITS = 3;

var startCollider = {
    x: 70,
    y: 265,
    width: 260,
    height: 50,
}

var howCollider = {
    x: 70,
    y: 315,
    width: 260,
    height: 50,
}

var creditsCollider = {
    x: 70,
    y: 365,
    width: 260,
    height: 50,
}

var hovering = HOVER_NONE;
var keyboardControlled = false;
var lastMouseX = mouseX;
var lastMouseY = mouseY;

function mainMenuUpdate() {
    if (!keyboardControlled) {
        mainMenuHandleMouseHover();
        mainMenuHandleMouseClick();
    }

    animSprite.update();

    mainMenuHandleMouseMove();
    mainMenuDraw();
}

function mainMenuDraw() {
    // Background
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    canvasContext.fillStyle = 'white';
    canvasContext.font = '50px Helvetica';
    var title = 'Playground Legends';
    var titleMeasure = canvasContext.measureText(Math.floor(title));
    canvasContext.fillText(title, (canvas.width / 2) - (titleMeasure.width * 2) - 20, 100);

    // Start game
    canvasContext.fillStyle = 'white';
    if (hovering == HOVER_START) canvasContext.fillStyle = 'yellow';
    canvasContext.font = '30px Helvetica';
    canvasContext.fillText('START GAME', 100, 300);

    // How to play
    canvasContext.fillStyle = 'white';
    if (hovering == HOVER_HOW) canvasContext.fillStyle = 'yellow';
    canvasContext.font = '30px Helvetica';
    canvasContext.fillText('HOW TO PLAY', 100, 350);

    // Credits
    canvasContext.fillStyle = 'white';
    if (hovering == HOVER_CREDITS) canvasContext.fillStyle = 'yellow';
    canvasContext.font = '30px Helvetica';
    canvasContext.fillText('CREDITS', 100, 400);

    animSprite.render(10, 10);

    // Draw Colliders (DEBUG)
    /*
    canvasContext.strokeStyle="yellow";
    canvasContext.strokeRect(startCollider.x ,startCollider.y ,startCollider.width, startCollider.height);
    canvasContext.strokeRect(howCollider.x ,howCollider.y ,howCollider.width, howCollider.height);
    canvasContext.strokeRect(creditsCollider.x ,creditsCollider.y ,creditsCollider.width, creditsCollider.height);
    */
}

function mainMenuHandleMouseHover() {
    if (mouseX >= startCollider.x && mouseX <= (startCollider.x + startCollider.width) &&
        mouseY >= startCollider.y && mouseY <= (startCollider.y + startCollider.height)) {
        hovering = HOVER_START;
    } else if (mouseX >= howCollider.x && mouseX <= (howCollider.x + howCollider.width) &&
               mouseY >= howCollider.y && mouseY <= (howCollider.y + howCollider.height)) {
        hovering = HOVER_HOW;
    } else if (mouseX >= creditsCollider.x && mouseX <= (creditsCollider.x + creditsCollider.width) &&
               mouseY >= creditsCollider.y && mouseY <= (creditsCollider.y + creditsCollider.height)) {
        hovering = HOVER_CREDITS;
    } else {
        hovering = HOVER_NONE;
    }
}

function mainMenuHandleMouseClick() {
    if (mouseDown) {
        mainMenuChangeScreen();
    }
}

function mainMenuHandleMouseMove() {
    if (mouseX != lastMouseX ||
        mouseY != lastMouseY) {
        keyboardControlled = false;
    }
    lastMouseX = mouseX;
    lastMouseY = mouseY;
}

function mainMenuKeyPressed(keycode) {
    if (keycode == KEY_UP_ARROW) {
        keyboardControlled = true;
        hovering--;
    } else if (keycode == KEY_DOWN_ARROW) {
        keyboardControlled = true;
        hovering++;
    } else if (keycode == KEY_ENTER) {
        mainMenuChangeScreen();
    }

    if (hovering > 3) {
        hovering = 1;
    } else if (hovering < 1 && keyboardControlled) {
        hovering = 3;
    }
}

function mainMenuChangeScreen() {
    switch (hovering) {
        case HOVER_START:
			menuSelection.play();
            scene = SCENE_GAME;
            DodgeMenu.pause();
            break;
        case HOVER_HOW:
			menuSelection.play();
            scene = SCENE_HOW_TO;
            break;
        case HOVER_CREDITS:
			menuSelection.play();
            scene = SCENE_CREDITS;
            break;
    }
}
