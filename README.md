# PocketCasts Beta Electron (Unofficial)

[![Build Status](https://travis-ci.org/davegallant/pocketcasts_electron.svg?branch=master)](https://travis-ci.org/davegallant/pocketcasts_electron)

Wraps the [Pocket Casts Web Player](https://play.pocketcasts.com/) web page in an [electron](https://electronjs.org/) package.

Media keys are mapped.

## How to build (Windows, Mac and Ubuntu)

 - `npm install`
 - <b>Ubuntu only:</b>`sudo apt install libdbus-1-dev libglib2.0-dev`
 - `npm install -g yarn`
 - `yarn dist`
 - Built images are then found in dist/