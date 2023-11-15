/*const electron = require("electron");
const { autoUpdater, AppUpdater } = require("electron-updater");
const path = require("path");
let updateWindow = undefined;

function createWindow() {
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

module.exports = {
    createWindow,
};*/