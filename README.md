# PocketCasts Electron (Unofficial)

[![Build Status](https://travis-ci.org/davegallant/pocketcasts-electron.svg?branch=master)](https://travis-ci.org/davegallant/pocketcasts-electron)
[![Dependabot](https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot)](https://dependabot.com/)


![pocketcasts](https://user-images.githubusercontent.com/4519234/114802837-5d2a1580-9d6c-11eb-90db-d48316786957.png)


Wraps the [Pocket Casts Web Player](https://play.pocketcasts.com/) web page in an [electron](https://electronjs.org/) package.

Media keys are mapped.

## Releases

Check out the latest [releases](https://github.com/davegallant/pocketcasts-electron/releases).

MacOS apps are not code signed.

## Running from source

```console
$ yarn install
$ yarn run start
```

On linux, `dbus` is required for keybindings.
