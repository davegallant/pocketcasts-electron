# PocketCasts Beta Electron (Unofficial)

[![Build Status](https://travis-ci.org/davegallant/pocketcasts-electron.svg?branch=master)](https://travis-ci.org/davegallant/pocketcasts-electron)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/davegallant/pocketcasts-electron.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/davegallant/pocketcasts-electron/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/davegallant/pocketcasts-electron.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/davegallant/pocketcasts-electron/context:javascript)


![pocketcasts_electron](https://user-images.githubusercontent.com/4519234/46927999-60f74880-d006-11e8-83a8-5f686d509a76.PNG)

Wraps the [Pocket Casts Web Player](https://play.pocketcasts.com/) web page in an [electron](https://electronjs.org/) package.

Media keys are mapped.

## How to build (Windows, Mac and Linux)

```bash
npm install
sudo apt install libdbus-1-dev libglib2.0-dev # debian / ubuntu
npm run package
npm run start
```

Built packages/installers located in dist/
