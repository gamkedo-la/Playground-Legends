const P2_DRAW_OFFSET = 32;
var hovering = HOVER_NONE;
var lastMouseX = mouseX;
var lastMouseY = mouseY;

function creditsUpdate() {
    if (!keyboardControlled) {
        creditsHandleMouseHover();
        creditsHandleMouseClick();
    }

    creditsHandleMouseMove();
    creditsDraw();
}

function creditsDraw() {
    // Background
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    // menuBG
    canvasContext.drawImage(menuBG_credits, menuBG_X,menuBG_Y);
    canvasContext.drawImage(menuBG_creditsoverlay, menuBG_overlay_X,menuBG_overlay_Y);

    // Logo
    canvasContext.globalAlpha = 0.25;
    canvasContext.drawImage(menuLogo, (canvas.width / 2) - (menuLogo.width / 2), 25);
    canvasContext.globalAlpha = 1;

    // Title
    //canvasContext.fillStyle = 'white';
    //canvasContext.font = '50px Helvetica';
    //var title = 'Playground Legends';
    //var titleMeasure = canvasContext.measureText(Math.floor(title));
    //canvasContext.fillText(title, (canvas.width / 2) - (titleMeasure.width * 2) - 20, 100);

    // Sub-Title
    canvasContext.fillStyle = 'black';
    canvasContext.font = 'bold 40px Helvetica';
    var subTitle = 'Credits';
    var subTitleMeasure = canvasContext.measureText(Math.floor(subTitle));
    canvasContext.fillText(subTitle, 350, 150);

    // P2
    canvasContext.globalAlpha = 0.25;
    canvasContext.drawImage(credits_p2, PLAYERS_X + (PLAYERS_DRAW_WIDTH / 2) - P2_DRAW_OFFSET,PLAYERS_Y, SINGLE_PLAYER_WIDTH,PLAYERS_DRAW_HEIGHT);
    canvasContext.globalAlpha = 1;

    // Back
    canvasContext.fillStyle = 'black';
    if (hovering == HOVER_BACK) canvasContext.fillStyle = 'red';
    canvasContext.font = 'bold 30px Helvetica';
    canvasContext.fillText('BACK', 650, 550);


    // Draw Colliders (DEBUG)
    /*
    canvasContext.strokeStyle="yellow";
    canvasContext.strokeRect(backCollider.x ,backCollider.y ,backCollider.width, backCollider.height);
    */
}

function creditsHandleMouseHover() {
    if (mouseX >= backCollider.x && mouseX <= (backCollider.x + backCollider.width) &&
        mouseY >= backCollider.y && mouseY <= (backCollider.y + backCollider.height)) {
        hovering = HOVER_BACK;
    } else {
        hovering = HOVER_NONE;
    }
}

function creditsHandleMouseClick() {
    if (mouseDown && hovering == HOVER_BACK) {
        scene = SCENE_MAIN_MENU;
    }
}

function creditsKeyPressed(keycode) {
    if (keycode == KEY_UP_ARROW || keycode == KEY_DOWN_ARROW) {
        keyboardControlled = true;
        hovering = HOVER_BACK;
    } else if (keycode == KEY_ENTER) {
        scene = SCENE_MAIN_MENU;
    }
}

function creditsHandleMouseMove() {
    if (mouseX != lastMouseX ||
        mouseY != lastMouseY) {
        keyboardControlled = false;
    }
    lastMouseX = mouseX;
    lastMouseY = mouseY;
}
