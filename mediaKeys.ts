import { BrowserWindow, globalShortcut } from "electron";

module.exports = {
  register: function(win: BrowserWindow, platform: String) {
    if (platform == "win32" || platform == "darwin") {
      module.exports.registerWinAndMac(win);
    }
    // else {
    //   try {
    //     const DBus = require("dbus");
    //     const dbus = new DBus();
    //     const session = dbus.getBus("session");

    //     module.exports.registerLinux("gnome", session, win);
    //     module.exports.registerLinux("mate", session, win);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  },
  registerWinAndMac: function(win: BrowserWindow) {
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
  // registerLinux: function(desktopEnv: String, session, win: BrowserWindow) {
  //   session.getInterface(
  //     `org.${desktopEnv}.SettingsDaemon`,
  //     `/org/${desktopEnv}/SettingsDaemon/MediaKeys`,
  //     `org.${desktopEnv}.SettingsDaemon.MediaKeys`,
  //     (err, iface) => {
  //       if (!err) {
  //         iface.on("MediaPlayerKeyPressed", (keyName: String) => {
  //           switch (keyName) {
  //             case "Next":
  //               win.send("skipForward");
  //             case "Previous":
  //               win.send("skipBack");
  //             case "Play": // Assuming Play/Pause is the same button
  //               win.send("playPause");
  //           }
  //         });
  //         iface.GrabMediaPlayerKeys(
  //           0,
  //           `org.${desktopEnv}.SettingsDaemon.MediaKeys`
  //         ); // eslint-disable-line
  //       }
  //     }
  //   );
  // }
};
