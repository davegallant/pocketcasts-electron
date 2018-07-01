const { app, BrowserWindow } = require("electron");
const config = require("./config");
const path = require("path");
const url = require("url");
const mediaKeys = require("./mediaKeys");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  const lastWindowState = config.get("lastWindowState");
  const betaUrl = "https://playbeta.pocketcasts.com/web/new-releases";
  const titlePrefix = "PocketCasts";

  // Create the browser window.
  win = new BrowserWindow({
    title: app.getName(),
    x: lastWindowState.x,
    y: lastWindowState.y,
    // width: lastWindowState.width,
    // height: lastWindowState.height,
    icon: path.join(__dirname, "build/icon.png"),
    minWidth: 1000,
    minHeight: 400,
    alwaysOnTop: config.get("alwaysOnTop"),
    titleBarStyle:
      process.platform === "darwin" &&
      Number(
        require("os")
          .release()
          .split(".")[0]
      ) >= 17
        ? null
        : "hidden-inset",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "browser.js"),
      nodeIntegration: false,
      plugins: true
    }
  });

  win.loadURL(betaUrl);

  win.on("focus", () => {
    mediaKeys.register(win, process.platform);
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
