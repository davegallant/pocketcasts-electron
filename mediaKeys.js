
const DBus = require('dbus')

const {
    globalShortcut
} = require('electron');

module.exports = ({
    register: function(win, platform) {
        if (platform == 'win32' || platform == 'darwin') {
            mediaKeys.registerWinAndMac(win);
        } else {
            try {
                const dbus = new DBus();
                const session = dbus.getBus('session');

                module.exports.registerLinux('gnome', session, win);
                module.exports.registerLinux('mate', session, win);
            } catch (error) {
                console.log(error)
            }
        }
    },
    registerWinAndMac: function(win) {
        globalShortcut.register('MediaPlayPause', () => {
            win.send('playPause');
        });
        globalShortcut.register('MediaPreviousTrack', () => {
            win.send('skipBack');
        });
        globalShortcut.register('MediaNextTrack', () => {
            win.send('skipForward');
        });
    },
    registerLinux: function(desktopEnv, session, win) {
        session.getInterface(`org.${desktopEnv}.SettingsDaemon`,
            `/org/${desktopEnv}/SettingsDaemon/MediaKeys`,
            `org.${desktopEnv}.SettingsDaemon.MediaKeys`, (err, iface) => {
                if (!err) {
                    iface.on('MediaPlayerKeyPressed', (n, keyName) => {
                        switch (keyName) {
                            case 'Next':
                                win.send('skipForward');
                            case 'Previous':
                                win.send('skipBack');
                            case 'Play': // Assuming Play/Pause is the same button
                                win.send('playPause');
                        }
                    });
                    iface.GrabMediaPlayerKeys(0, `org.${desktopEnv}.SettingsDaemon.MediaKeys`); // eslint-disable-line
                }
            });
    }

});