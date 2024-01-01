const electron = require("electron");
const { ipcMain } = require('electron');
require('electron-debug')({ showDevTools: false });
let launcherWindow = undefined;

function LauncherWin() {
    launcherWindow = new electron.BrowserWindow({
        title: "Afaura Games",
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
    launcherWindow.loadFile("src/launcher/launcher.html");
    launcherWindow.once('ready-to-show', () => {
        if (launcherWindow) {
            launcherWindow.show();
        }
    });
}



module.exports = {
    LauncherWin
};