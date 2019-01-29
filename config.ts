import ElectronStore = require("electron-store");

export const config = new ElectronStore({
  defaults: {
    alwaysOnTop: false,
    lastWindowState: {
      height: 600,
      width: 800,
    },
    zoomFactor: 1,
  },
});
