const {
    globalShortcut
} = require('electron');

module.exports = ({
    registerGlobalMediaButtons: function(win) {
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
    registerBindings: function(desktopEnv, session) {
        session.getInterface(`org.${desktopEnv}.SettingsDaemon`,
            `/org/${desktopEnv}/SettingsDaemon/MediaKeys`,
            `org.${desktopEnv}.SettingsDaemon.MediaKeys`, (err, iface) => {
                if (!err) {
                    iface.on('MediaPlayerKeyPressed', (n, keyName) => {
                        switch (keyName) {
                            case 'Next':
                                Emitter.sendToGooglePlayMusic('playback:nextTrack');
                                return;
                            case 'Previous':
                                Emitter.sendToGooglePlayMusic('playback:previousTrack');
                                return;
                            case 'Play':
                                Emitter.sendToGooglePlayMusic('playback:playPause');
                                return;
                            case 'Stop':
                                Emitter.sendToGooglePlayMusic('playback:stop');
                                return;
                            default:
                                return;
                        }
                    });
                    iface.GrabMediaPlayerKeys(0, `org.${desktopEnv}.SettingsDaemon.MediaKeys`); // eslint-disable-line
                }
            });
    }

});