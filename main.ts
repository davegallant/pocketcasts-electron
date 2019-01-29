import { app, BrowserWindow, Menu, nativeImage, Tray } from "electron";

import windowStateKeeper = require("electron-window-state");
import path = require("path");
import { config } from "./config";
import { registerKeys } from "./mediaKeys";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow = null;
let tray: Tray = null;

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) {
        win.restore();
      }
      win.focus();
    }
  });
}

// Add icons and context menus to the system's notification area.
function createTray() {
  const iconPath: string = path.join(__dirname, "assets/icon.png");
  console.log(iconPath);
  const trayIcon = nativeImage.createFromPath(iconPath);
  tray = new Tray(trayIcon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "⏯️ Play/Pause",
      type: "normal",
      click() {
        win.webContents.send("playPause");
      },
    },
    {
      label: "⏭️ Skip 30s",
      type: "normal",
      click() {
        win.webContents.send("skipForward");
      },
    },
    {
      label: "⏮️ Rewind 15s",
      type: "normal",
      click() {
        win.webContents.send("skipBack");
      },
    },
    {
      label: "⏹️ Quit",
      type: "normal",
      click() {
        app.quit();
      },
    },
  ]);
  tray.setToolTip("Pocket Casts");
  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    win.isVisible() ? win.hide() : win.show();
  });
}

function createWindow() {
  const betaUrl = "https://playbeta.pocketcasts.com/web/new-releases";

  const mainWindowState = windowStateKeeper({
    defaultHeight: 600,
    defaultWidth: 800,
  });

  // Create the browser window.
  win = new BrowserWindow({
    alwaysOnTop: config.get("alwaysOnTop"),
    autoHideMenuBar: true,
    height: mainWindowState.height,
    icon: path.join(__dirname, "assets/icon.png"),
    minHeight: 600,
    minWidth: 800,
    title: app.getName(),
    webPreferences: {
      nodeIntegration: false,
      plugins: true,
      preload: path.join(__dirname, "browser.js"),
    },
    width: mainWindowState.width,
    x: mainWindowState.x,
    y: mainWindowState.y,
  });

  // Let us register listeners on the window, so we can update the state
  // automatically (the listeners will be removed when the window is closed)
  // and restore the maximized or full screen state
  mainWindowState.manage(win);

  win.loadURL(betaUrl);

  win.on("focus", () => {
    registerKeys(win);
  });

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createTray);

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
