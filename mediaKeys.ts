import { BrowserWindow, globalShortcut } from "electron";

export function registerKeys(win: BrowserWindow) {
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
