
/* 
            Cette page n'a pour but que de tester le démarrage de l'application, elle sera supprimée/modifiée a l'avenir !!
                                                Ne rien stocker d'important ici !!
*/

const electron = require("electron");
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

function Quit() {
    window.close();
}

module.exports = {
    LauncherWin
};