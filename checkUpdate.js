const electron = require("electron");
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

function destroyWindow() {
    checkupdateWindow.close();
}

module.exports = {
    CheckUpdateWin,
    destroyWindow
};