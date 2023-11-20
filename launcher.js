const electron = require("electron");
let launcherWindow = undefined;

function LauncherWin() {
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

function Quit() {
    window.close();
}

module.exports = {
    LauncherWin
};