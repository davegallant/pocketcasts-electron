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
    }
});