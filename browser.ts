"use strict";
const electron = require("electron");

const { ipcRenderer: ipc } = electron;

const playPauseSelector = ".play_pause_button";
const skipForwardSelector = ".skip_forward_button";
const skipBackSelector = ".skip_back_button";

let playerAvailable = false;

ipc.on("playPause", () => {
  let element: HTMLElement = document.querySelector(playPauseSelector);
  element.click();
});

ipc.on("skipForward", () => {
  let element: HTMLElement = document.querySelector(skipForwardSelector);
  element.click();
});

ipc.on("skipBack", () => {
  let element: HTMLElement = document.querySelector(skipBackSelector);
  element.click();
});

function registerClickHandlers() {
  const playButtonEl = document.querySelector(playPauseSelector);
  const skipBackEl = document.querySelector(skipBackSelector);
  const skipForwardEl = document.querySelector(skipForwardSelector);

  playButtonEl.addEventListener("click", () => {
    ipc.send("playPause");
  });
  skipBackEl.addEventListener("click", () => {
    ipc.send("skipBack");
  });
  skipForwardEl.addEventListener("click", () => {
    ipc.send("skipForward");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Register media keys
  registerClickHandlers();
});
