const electron = require("electron");
const { app, ipcMain } = require('electron');
const { autoUpdater } = require("electron-updater");
let restartWindow = undefined;

function RestartWin() {
    restartWindow = new electron.BrowserWindow({
        title: "Mise à jour",
        width: 400,
        height: 500,
        resizable: false,
        frame: false,
        show: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        },
    });
    electron.Menu.setApplicationMenu(null);
    restartWindow.setMenuBarVisibility(false);
    restartWindow.loadFile("restart.html");
    restartWindow.once('ready-to-show', () => {
        if (restartWindow) {
            restartWindow.show();
        }
    });
}

ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
});

module.exports = {
    RestartWin
};