import { BrowserWindow, globalShortcut } from "electron";
import log = require("electron-log");

export function registerKeys(win: BrowserWindow, platform: string) {
  if (platform === "win32" || platform === "darwin") {
    globalShortcut.register("MediaPlayPause", () => {
      win.webContents.send("playPause");
    });
    globalShortcut.register("MediaPreviousTrack", () => {
      win.webContents.send("skipBack");
    });
    globalShortcut.register("MediaNextTrack", () => {
      win.webContents.send("skipForward");
    });
  } else {
    // Linux
    try {
      registerBindings('gnome', win);
    } catch (error) {
      log.error(error);
    }

  }
}

export function registerBindings(desktopEnv: string, win: BrowserWindow) {
  // @ts-ignore
  const listener = (err, iface) => {
    if (!err) {
      iface.on('MediaPlayerKeyPressed', (n: string, keyName: string) => {
        switch (keyName) {
          case "Next":
            win.webContents.send("skipForward");
          case "Previous":
            win.webContents.send("skipBack");
          case "Play":
            win.webContents.send("playPause");
          default: return;
        }
      });
      iface.GrabMediaPlayerKeys('PocketCasts', 0);
    }
  };

  let dbus = require("dbus-next");

  const session = dbus.sessionBus();

  log.info(Object.getOwnPropertyNames(session))

  session.getInterface(`org.${desktopEnv}.SettingsDaemon`, `/org/${desktopEnv}/SettingsDaemon/MediaKeys`, `org.${desktopEnv}.SettingsDaemon.MediaKeys`, listener);
  session.getInterface(`org.${desktopEnv}.SettingsDaemon.MediaKeys`, `/org/${desktopEnv}/SettingsDaemon/MediaKeys`, `org.${desktopEnv}.SettingsDaemon.MediaKeys`, listener);

}
