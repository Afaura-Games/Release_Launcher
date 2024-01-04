const electron = require("electron");
const { ipcMain } = require('electron');
const open = require('open');
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
    launcherWindow.loadFile("src/launcher/accueil.html");
    launcherWindow.once('ready-to-show', () => {
        if (launcherWindow) {
            launcherWindow.show();
        }
    });
}

function loadPage(folderName, pageName) {
    launcherWindow.loadFile(`${folderName}/${pageName}.html`);
}

ipcMain.on('accueil', () => {
    loadPage('src/launcher','accueil');
});

ipcMain.on('accueil-load', () => {
    launcherWindow.reload();
});

ipcMain.on('jeux', () => {
    loadPage('src/launcher','jeux');
});

ipcMain.on('jeux-load', () => {
    launcherWindow.reload();
});

ipcMain.on('web', () => {
    open('https://worldoftanks.eu/fr/tournaments');
});

ipcMain.on('amis', () => {
    loadPage('src/launcher/amis','amis');
});

ipcMain.on('amis-load', () => {
    launcherWindow.reload();
});

ipcMain.on('notifs', () => {
    loadPage('src/launcher/notifs','notifs');
});

ipcMain.on('notifs-load', () => {
    launcherWindow.reload();
});

ipcMain.on('profil', () => {
    loadPage('src/launcher/profil','profil');
});

ipcMain.on('profil-load', () => {
    launcherWindow.reload();
});


module.exports = {
    LauncherWin
};