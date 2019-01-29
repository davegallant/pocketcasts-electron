import { BrowserWindow, globalShortcut } from "electron";

module.exports = {
  register: function(win: BrowserWindow, platform: String) {
    globalShortcut.register("MediaPlayPause", () => {
      win.webContents.send("playPause");
    });
    globalShortcut.register("MediaPreviousTrack", () => {
      win.webContents.send("skipBack");
    });
    globalShortcut.register("MediaNextTrack", () => {
      win.webContents.send("skipForward");
    });
  }
};
