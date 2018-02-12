'use strict';
const electron = require('electron');
const config = require('./config');

const {ipcRenderer: ipc} = electron;

const playPauseSelector = '.play_pause_button';
const skipForwardSelector = '.skip_forward_button';
const skipBackSelector = '.skip_back_button';

let playerAvailable = false;

ipc.on('playPause', () => {
	document.querySelector(playPauseSelector).click();
});

ipc.on('skipForward', () => {
	document.querySelector(skipForwardSelector).click();
});

ipc.on('skipBack', () => {
	document.querySelector(skipBackSelector).click();
});

function registerClickHandlers() {
	const playButtonEl = document.querySelector(playPauseSelector);
	const skipBackEl = document.querySelector(skipBackSelector);
	const skipForwardEl = document.querySelector(skipForwardSelector);

	playButtonEl.addEventListener('click', () => {
		ipc.send('playPause');
	});
	skipBackEl.addEventListener('click', () => {
		ipc.send('skipBack');
	});
	skipForwardEl.addEventListener('click', () => {
		ipc.send('skipForward');
	});
}

// Check if player is visible.
function checkForPlayer() {
	if (!playerAvailable) {
		const player = document.querySelector('#players');

		if (!player.classList.contains('ng-hide')) {
			playerAvailable = true;
			registerClickHandlers();
		}
		else {
			// Recheck for buttons.
			setTimeout(() => {
				checkForPlayer();
			}, 3000);
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	// Check for the player elements.
	checkForPlayer();
});