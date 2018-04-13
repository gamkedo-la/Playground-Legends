var hovering = HOVER_NONE;

function creditsUpdate() {
    creditsHandleMouseHover();
    creditsHandleMouseClick();
    creditsDraw();
}

function creditsDraw() {
    // Background
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    canvasContext.fillStyle = 'white';
    canvasContext.font = '50px Helvetica';
    var title = 'Playground Legends';
    var titleMeasure = canvasContext.measureText(Math.floor(title));
    canvasContext.fillText(title, (canvas.width / 2) - (titleMeasure.width * 2) - 20, 100);

    // Sub-Title
    canvasContext.fillStyle = 'white';
    canvasContext.font = '40px Helvetica';
    var subTitle = 'Credits';
    var subTitleMeasure = canvasContext.measureText(Math.floor(subTitle));
    canvasContext.fillText(subTitle, 350, 150);

    // Back
    canvasContext.fillStyle = 'white';
    if (hovering == HOVER_BACK) canvasContext.fillStyle = 'yellow';
    canvasContext.font = '30px Helvetica';
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
