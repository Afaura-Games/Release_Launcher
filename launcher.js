const electron = require("electron");
const path = require("path");
let launcherWindow = undefined;

function createWindow() {
    launcherWindow = new electron.BrowserWindow({
        title: "Mise à jour",
        width: 1280,
        height: 720,
        resizable: false,
        frame: true,
        show: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        },
    });
    electron.Menu.setApplicationMenu(null);
    launcherWindow.setMenuBarVisibility(false);
    launcherWindow.loadFile("launcher.html");
    launcherWindow.once('ready-to-show', () => {
        if (launcherWindow) {
            launcherWindow.show();
        }
    });
}

var restart = 0;
function app_restart() {
    restart++
    if(restart > 0) {
        window.close();
    }
}

module.exports = {
    createWindow,
    restart
};