# PocketCasts Electron (Unofficial)

[![Build/release](https://github.com/davegallant/pocketcasts-electron/actions/workflows/build.yml/badge.svg)](https://github.com/davegallant/pocketcasts-electron/actions/workflows/build.yml)
[![Dependabot](https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot)](https://dependabot.com/)

> This project was created before Pocket Casts had an [official Desktop App](https://support.pocketcasts.com/article/desktop-app/) for Mac and Windows. This project still works, has a system tray feature and works on Linux.

![pocketcasts](https://user-images.githubusercontent.com/4519234/127884202-129e2db5-3042-42b8-a0f7-6321836507b3.png)

Wraps the [Pocket Casts Web Player](https://play.pocketcasts.com/) web page in an [electron](https://electronjs.org/) package.

Media keys are mapped.

## Releases

Check out the latest [releases](https://github.com/davegallant/pocketcasts-electron/releases).

Windows and macOS apps are not currently signed.

## Running from source

```console
$ yarn install
$ yarn run start
```

On linux, [dbus](https://www.freedesktop.org/wiki/Software/dbus/) is required for keybindings.
