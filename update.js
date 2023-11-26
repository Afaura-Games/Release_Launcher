const electron = require("electron");
const { app, ipcMain } = require('electron');
const { autoUpdater } = require("electron-updater");
const {RestartWin} = require("./restart");
let updateWindow = undefined;

function UpdateWin() {
    updateWindow = new electron.BrowserWindow({
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
    updateWindow.setMenuBarVisibility(false);
    updateWindow.loadFile("update.html");
    updateWindow.once('ready-to-show', () => {
        if (updateWindow) {
            updateWindow.show();
        }
    });
}

function DestroyWindow() {
    RestartWin();
    updateWindow.close();
}

ipcMain.on('download_app', () => {
    autoUpdater.downloadUpdate();
});

module.exports = {
    UpdateWin,
    DestroyWindow
};