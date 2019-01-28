# PocketCasts Beta Electron (Unofficial)

[![Build Status](https://travis-ci.org/davegallant/pocketcasts-electron.svg?branch=master)](https://travis-ci.org/davegallant/pocketcasts-electron)

![pocketcasts_electron](https://user-images.githubusercontent.com/4519234/46927999-60f74880-d006-11e8-83a8-5f686d509a76.PNG)

Wraps the [Pocket Casts Web Player](https://play.pocketcasts.com/) web page in an [electron](https://electronjs.org/) package.

Media keys are mapped.

## How to build (Windows, Mac and Ubuntu)

```bash
npm install
sudo apt install libdbus-1-dev libglib2.0-dev # ubuntu only
npm run dist # packages it up
```

Built packages/installers located in dist/
