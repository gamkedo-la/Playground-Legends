var backgroundImage = document.createElement("img");
backgroundImage.id = "background";

var player1 = document.createElement("img");
var player1Loaded = false;

var player1ThrowingImage = document.createElement("img");
var player1ThrowingImageLoaded = false;
var player1ThrowingSprite;

var player1JumpingImage = document.createElement("img");
var player1JumpingImageLoaded = false;
var player1JumpingSprite;

var player2 = document.createElement("img");
var player2Loaded = false;

var ballImage = document.createElement("img");
var ballImageLoaded = false;

var shadowImage = document.createElement("img");
var shadowImageLoaded = false;

var aimerImage = document.createElement("img");
var aimerImageLoaded = false;

var impactImage = document.createElement("img");
var impactImageLoaded = false;

var animImage = document.createElement("img");
var animImageLoaded = false;
var animRunningSprite;

var player2RunningImage = document.createElement("img");
var player2RunningImageLoaded = false;
var player2RunningSprite;

var player3RunningImage = document.createElement("img");
var player3RunningImageLoaded = false;
var player3RunningSprite;

var player4RunningImage = document.createElement("img");
var player4RunningImageLoaded = false;
var player4RunningSprite;

var menuLogo = document.createElement("img");
var menuLogoImageLoaded = false;

var menuPlayers = document.createElement("img");
var menuPlayersImageLoaded = false;

var menuBG = document.createElement("img");
var menuBGImageLoaded = false;

var menuBG_how2 = document.createElement("img");
var menuBG_how2ImageLoaded = false;

var menuBG_credits = document.createElement("img");
var menuBG_creditsImageLoaded = false;

var menuBG_overlay = document.createElement("img");
var menuBG_overlayImageLoaded = false;

var menuBG_how2overlay = document.createElement("img");
var menuBG_how2overlayImageLoaded = false;

var menuBG_creditsoverlay = document.createElement("img");
var menuBG_creditsoverlayImageLoaded = false;

var how2_p1 = document.createElement("img");
var how2_p1ImageLoaded = false;

var credits_p2 = document.createElement("img");
var credits_p2ImageLoaded = false;

var audioON_img = document.createElement("img");
var audioONImageLoaded = false;

var audioOFF_img = document.createElement("img");
var audioOFFImageLoaded = false;

var blackboardPopUp = document.createElement("img");
var blackboardPopUpLoaded = false;

function setUpImages() {
	randomizeBackground();

	player1.onload = function () {
		player1Loaded = true;
	}
	player1.src = "images/player1.png";

	player2.onload = function () {
		player2Loaded = true;
	}
	player2.src = "images/player2.png";

	/*player3.onload = function () {
		player3Loaded = true;
	}
	player3.src = "images/player3.png";

	player4.onload = function () {
		player4Loaded = true;
	}
	player4.src = "images/player4.png";*/

	ballImage.onload = function () {
		ballImageLoaded = true;
	}
	ballImage.src = "images/redball.png";

	shadowImage.onload = function () {
		shadowImageLoaded = true;
	}
	shadowImage.src = "images/shadow.png";

	aimerImage.onload = function () {
		aimerImageLoaded = true;
	}
	aimerImage.src = "images/aimer.png";

	impactImage.onload = function () {
		impactImageLoaded = true;
	}
	impactImage.src = "images/impact.png";

	animRunningSprite = sprite({
		context: canvasContext,
		width: 195,
		height: 124,
		image: animImage,
		loop: true,
		numberOfFrames: 3,
		ticksPerFrame: 10,
	});
	animImage.onload = function () {
		animImageLoaded = true;
	}
	animImage.src = "images/playerRunningSpriteSheet.png";

	player1ThrowingSprite = sprite({
		context: canvasContext,
		width: 320,
		height: 124,
		image: player1ThrowingImage,
		loop: false,
		numberOfFrames: 4,
		ticksPerFrame: 5,
	});
	animImage.onload = function () {
		player1ThrowingImageLoaded = true;
	}
	player1ThrowingImage.src = "images/throwingSpriteSheet.png";
    
    player1JumpingSprite = sprite({
		context: canvasContext,
		width: 300,
		height: 124,
		image: player1JumpingImage,
		loop: false,
		numberOfFrames: 3,
		ticksPerFrame: 6,
	});
    animImage.onload = function () {
		player1JumpingImageLoaded = true;
	}
	player1JumpingImage.src = "images/player1JumpingSpriteSheet.png";

	player2RunningSprite = sprite({
		context: canvasContext,
		width: 195,
		height: 124,
		image: player2RunningImage,
		loop: true,
		numberOfFrames: 3,
		ticksPerFrame: 10,
	});
	player2RunningImage.onload = function () {
		player2RunningImageLoaded = true;
	}
	player2RunningImage.src = "images/player2RunningSpriteSheet.png";

	player3RunningSprite = sprite({
		context: canvasContext,
		width: 195,
		height: 124,
		image: player3RunningImage,
		loop: true,
		numberOfFrames: 3,
		ticksPerFrame: 10,
	});
	player3RunningImage.onload = function () {
		player3RunningImageLoaded = true;
	}
	player3RunningImage.src = "images/player3RunningSpriteSheet.png";

	player4RunningSprite = sprite({
		context: canvasContext,
		width: 195,
		height: 124,
		image: player4RunningImage,
		loop: true,
		numberOfFrames: 3,
		ticksPerFrame: 10,
	});
	player4RunningImage.onload = function () {
		player4RunningImageLoaded = true;
	}
	player4RunningImage.src = "images/player4RunningSpriteSheet.png";

    menuLogo.onload = function () {
        menuLogoImageLoaded = true;
    }
    menuLogo.src = "images/menuLogo.png";

    menuPlayers.onload = function () {
        menuPlayersImageLoaded = true;
    }
    menuPlayers.src = "images/menuPlayers.png";

    menuBG.onload = function () {
        menuBGImageLoaded = true;
    }
    menuBG.src = "images/menuBG.png";

    menuBG_how2.onload = function () {
        menuBG_how2ImageLoaded = true;
    }
    menuBG_how2.src = "images/menuBG_how2.png";

    menuBG_credits.onload = function () {
        menuBG_creditsImageLoaded = true;
    }
    menuBG_credits.src = "images/menuBG_credits.png";

    menuBG_overlay.onload = function () {
        menuBG_overlayImageLoaded = true;
    }
    menuBG_overlay.src = "images/menuBG_overlay.png";

    menuBG_how2overlay.onload = function () {
        menuBG_how2overlayImageLoaded = true;
    }
    menuBG_how2overlay.src = "images/menuBG_how2overlay.png";

    menuBG_creditsoverlay.onload = function () {
        menuBG_creditsoverlayImageLoaded = true;
    }
    menuBG_creditsoverlay.src = "images/menuBG_creditsoverlay.png";

    how2_p1.onload = function () {
        how2_p1ImageLoaded = true;
    }
    how2_p1.src = "images/how2_p1.png";

    credits_p2.onload = function () {
        credits_p2ImageLoaded = true;
    }
    credits_p2.src = "images/credits_p2.png";

    audioON_img.onload = function () {
        audioONImageLoaded = true;
    }
    audioON_img.src = "images/audioON.png";

    audioOFF_img.onload = function () {
        audioOFFImageLoaded = true;
    }
    audioOFF_img.src = "images/audioOFF.png";

    blackboardPopUp.onload = function () {
		blackboardPopUpLoaded = true;
	}
	blackboardPopUp.src = "images/blackboard.png";
}

function drawImageRotatedAlpha(canvasContext, image, x, y, angle, opacity) {
	canvasContext.save();
	canvasContext.translate(x, y);
	if (angle !== undefined) {
		canvasContext.rotate(angle);
	}
	if (opacity !== undefined) canvasContext.globalAlpha = opacity;
	canvasContext.drawImage(image, -image.width / 2, -image.height / 2);
	canvasContext.restore();
}

function randomizeBackground() {
	var randBackground = Math.floor(Math.random() * 3);
	switch (randBackground) {
		case 0:
			backgroundImage.src = "images/background3.png";
			break;
		case 1:
			backgroundImage.src = "images/backgroundclass.gif";
			break;
		case 2:
			backgroundImage.src = "images/backgroundrocky.gif";
			break;
		default: // Shouldn't occur
			backgroundImage.src = "images/background2.png";
	}
	
	backgroundImage.style = 'height: 100vh;position:absolute; z-index:-999;';
	document.body.insertBefore(backgroundImage, gameCanvas);
}
