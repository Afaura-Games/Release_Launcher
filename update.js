const electron = require("electron");
const { app, ipcMain } = require('electron');
const { autoUpdater } = require("electron-updater");
/*const {RestartWin} = require("./restart");*/
let updateWindow = undefined;
let restartWindow = undefined;

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

function z() {
    updateWindow.UpdateWin();
}

function x() {
    restartWindow.UpdateWin();
}

function DestroyWindow() {
    /*RestartWin();*/
    updateWindow.close();
}

ipcMain.on('download_app', () => {
    autoUpdater.downloadUpdate();
});

module.exports = {
    UpdateWin,
    DestroyWindow,
    z,
    x
};