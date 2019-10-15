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
    // dbus takes control on many Linux distros.
    try {
      const DBus = require("dbus");
      const dbus = new DBus();
      const session = dbus.getBus("session");
      const desktopEnv = "gnome";

      session.getInterface(
        `org.${desktopEnv}.SettingsDaemon`,
        `/org/${desktopEnv}/SettingsDaemon/MediaKeys`,
        `org.${desktopEnv}.SettingsDaemon.MediaKeys`,
        // @ts-ignore
        (err: Error, iface) => {
          if (!err) {
            iface.on("MediaPlayerKeyPressed", (keyName: string) => {
              switch (keyName) {
                case "Next":
                  win.webContents.send("skipForward");
                case "Previous":
                  win.webContents.send("skipBack");
                case "Play":
                  win.webContents.send("playPause");
              }
            });
            iface.GrabMediaPlayerKeys(
              0,
              `org.${desktopEnv}.SettingsDaemon.MediaKeys`,
            ); // eslint-disable-line
          }
        },
      );
    } catch (error) {
      log.error(error);
    }
  }
}
