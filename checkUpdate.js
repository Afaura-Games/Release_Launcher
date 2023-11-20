const electron = require("electron");
const { autoUpdater } = require("electron-updater");
let checkupdateWindow = undefined;

function CheckUpdateWin() {
    checkupdateWindow = new electron.BrowserWindow({
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
    checkupdateWindow.setMenuBarVisibility(false);
    checkupdateWindow.loadFile("checkUpdate.html");
    checkupdateWindow.once('ready-to-show', () => {
        if (checkupdateWindow) {
            checkupdateWindow.show();
        }
    });
}

autoUpdater.checkForUpdates();

module.exports = {
    CheckUpdateWin
};