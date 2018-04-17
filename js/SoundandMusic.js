var audioFormat;

var hitByBallSound = new SoundOverlapsClass("./audio/HitByBall");
var catchBallSound = new SoundOverlapsClass("./audio/CatchingBall");

var currentBackgroundMusic = new backgroundMusicClass();

var musicVolume = localStorage.getItem("musicVolume");
var effectsVolume = localStorage.getItem("effectsVolume");

if (musicVolume === null) {
	musicVolume = 1;
}
if (effectsVolume === null) {
	effectsVolume = 1;
}

var isMuted = false;
const VOLUME_INCREMENT = 0.05;

function setFormat() {
	var audio = new Audio();
	if (audio.canPlayType("audio/mp3")) {
		audioFormat = ".mp3";
	} else {
		audioFormat = ".ogg";
	}
}

function backgroundMusicClass() {

	let musicSound = null;

	this.loopSong = function (filenameWithPath) {
		setFormat(); // calling this to ensure that audioFormat is set before needed

		if (musicSound != null) {
			musicSound.pause();
			musicSound = null;
		}
		musicSound = new Audio(filenameWithPath + audioFormat);
		musicSound.loop = true;
		this.setVolume(musicVolume);
	}

	this.pauseSound = function () {
		musicSound.pause();
	}

	this.resumeSound = function () {
		musicSound.play();
	}

	this.startOrStopMusic = function () {
		if (musicSound.paused) {
			musicSound.play();
		} else {
			musicSound.pause();
		}
	}

	this.setVolume = function (volume) {
		// Multipliction by a boolean serves as 1 for true and 0 for false
		musicSound.volume = Math.pow(volume * !isMuted, 2);

		if (musicSound.volume == 0) {
			musicSound.pause();
		} else if (musicSound.paused) {
			musicSound.play();
		}
	}
}

function SoundOverlapsClass(filenameWithPath) {
	setFormat();

	var fullFilename = filenameWithPath;
	var soundIndex = 0;
	var sounds = [new Audio(fullFilename + audioFormat), new Audio(fullFilename + audioFormat)];

	this.play = function () {
		if (sounds[soundIndex] != undefined) { // this is incase the player has not loaded sound files

			if (!sounds[soundIndex].paused) {
				sounds.splice(soundIndex, 0, new Audio(fullFilename + audioFormat));
			}
			sounds[soundIndex].currentTime = 0;
			sounds[soundIndex].volume = Math.pow(getRandomVolume() * effectsVolume * !isMuted, 2);
			sounds[soundIndex].play();

			soundIndex = (++soundIndex) % sounds.length;
		}
	}
}

function getRandomVolume() {
	var min = 0.9;
	var max = 1;
	var randomVolume = Math.random() * (max - min) + min;
	return randomVolume.toFixed(2);
}

function toggleMute() {
	isMuted = !isMuted;
	currentBackgroundMusic.setVolume(musicVolume);
}

function setEffectsVolume(amount) {
	if (amount > 1.0) {
		amount = 1.0;
	} else if (amount < 0.0) {
		amount = 0.0;
	}
	
	countdown.volume = amount;
	Jump.volume = amount;
	HitByBall.volume = amount;
	timeup.volume = amount;
	CatchingBall.volume = amount;
	menuSelection.volume = amount;
	
	effectsVolume = amount;
	
}

function setMusicVolume(amount) {
	if (amount > 1.0) {
		amount = 1.0;
	} else if (amount < 0.0) {
		amount = 0.0;
	}
	
	DodgeMenu.volume = amount;
	pgroundherogamesong.volume = amount;
	
	musicVolume = amount;
}

function getEffectsVolume(){
	return effectsVolume;
}

function getMusicVolume(){
	return musicVolume;
}

function turnVolumeUp() {
	setMusicVolume(musicVolume + VOLUME_INCREMENT);
	setEffectsVolume(effectsVolume + VOLUME_INCREMENT);
}

function turnVolumeDown() {
	setMusicVolume(musicVolume - VOLUME_INCREMENT);
	setEffectsVolume(effectsVolume - VOLUME_INCREMENT);
}
