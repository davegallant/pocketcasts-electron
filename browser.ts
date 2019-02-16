"use strict";

import { ipcRenderer } from "electron";

const playPauseSelector = ".play_pause_button";
const skipForwardSelector = ".skip_forward_button";
const skipBackSelector = ".skip_back_button";

ipcRenderer.on("playPause", () => {
  const element: HTMLElement = document.querySelector(playPauseSelector);
  element.click();
});

ipcRenderer.on("skipForward", () => {
  const element: HTMLElement = document.querySelector(skipForwardSelector);
  element.click();
});

ipcRenderer.on("skipBack", () => {
  const element: HTMLElement = document.querySelector(skipBackSelector);
  element.click();
});

function registerClickHandlers() {
  const playButtonEl = document.querySelector(playPauseSelector);
  const skipBackEl = document.querySelector(skipBackSelector);
  const skipForwardEl = document.querySelector(skipForwardSelector);

  playButtonEl.addEventListener("click", () => {
    ipcRenderer.send("playPause");
  });
  skipBackEl.addEventListener("click", () => {
    ipcRenderer.send("skipBack");
  });
  skipForwardEl.addEventListener("click", () => {
    ipcRenderer.send("skipForward");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Register media keys
  registerClickHandlers();
});
