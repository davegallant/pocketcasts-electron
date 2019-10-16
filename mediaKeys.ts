import { app, BrowserWindow, globalShortcut } from "electron";
import log = require("electron-log");


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
      registerBindings("gnome", win);
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

  const dbus = require("dbus-next");
  const session = dbus.sessionBus();

  try {
    const legacy = await session.getProxyObject(`org.${desktopEnv}.SettingsDaemon`, `/org/${desktopEnv}/SettingsDaemon/MediaKeys`);
    const iface = legacy.getInterface(`org.${desktopEnv}.SettingsDaemon.MediaKeys`);
    iface.on("MediaPlayerKeyPressed", listener);
    iface.GrabMediaPlayerKeys("PocketCasts", 0);

  } catch (e) {
    log.error(e);
  }

  try {
    const future = await session.getProxyObject(`org.${desktopEnv}.SettingsDaemon.MediaKeys`, `/org/${desktopEnv}/SettingsDaemon/MediaKeys`);
    const iface = future.getInterface(`org.${desktopEnv}.SettingsDaemon.MediaKeys`);
    iface.on("MediaPlayerKeyPressed", listener);
    iface.GrabMediaPlayerKeys("PocketCasts", 0);
  } catch (e) {
    log.error(e);
  }

}
