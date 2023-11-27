const electron = require("electron");
let checkupdateWindow = undefined;

function CheckUpdateWin() {
    checkupdateWindow = new electron.BrowserWindow({
        title: "Afaura Games - Démarrage",
        width: 350,
        height: 400,
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