import { app } from 'electron';
import { BrowserWindow, globalShortcut } from "electron";
import log = require("electron-log");

const dbus = require("dbus-next");


export async function registerKeys(win: BrowserWindow, platform: string) {
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

export async function registerBindings(desktopEnv: string, win: BrowserWindow) {
  // @ts-ignore
  const listener = (n, keyName) => {
    switch (keyName) {
      case "Next":
        win.webContents.send("skipForward");
      case "Previous":
        win.webContents.send("skipBack");
      case "Play":
        win.webContents.send("playPause");
      default: return;
    }
  };

  const session = dbus.sessionBus();

  try {
    const legacy = await session.getProxyObject(`org.${desktopEnv}.SettingsDaemon`, `/org/${desktopEnv}/SettingsDaemon/MediaKeys`);
    legacy.getInterface(`org.${desktopEnv}.SettingsDaemon.MediaKeys`);
    legacy.on('MediaPlayerKeyPressed', listener);
    app.on('browser-window-focus', () => {
      legacy.GrabMediaPlayerKeys('PocketCasts', 0);
    });
  } catch (e) {
    //
  }

  try {
    const future = await session.getProxyObject(`org.${desktopEnv}.SettingsDaemon.MediaKeys`, `/org/${desktopEnv}/SettingsDaemon/MediaKeys`);
    future.getInterface(`org.${desktopEnv}.SettingsDaemon.MediaKeys`);
    future.on('MediaPlayerKeyPressed', listener);
    app.on('browser-window-focus', () => {
      future.GrabMediaPlayerKeys('PocketCasts', 0);
    });
  } catch (e) {
    //
  }

}
