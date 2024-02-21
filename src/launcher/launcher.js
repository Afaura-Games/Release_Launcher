const { BrowserWindow, ipcMain } = require("electron");
const open = require('open');
require('electron-debug')({ showDevTools: false });

function LauncherWin() {
    const launcherWindow = new BrowserWindow({
        title: "Afaura Games",
        width: 1280,
        height: 720,
        resizable: false,
        frame: false,
        show: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        },
    });
    launcherWindow.setMenuBarVisibility(false);
    launcherWindow.loadFile("src/launcher/accueil/accueil.html");
    launcherWindow.once('ready-to-show', () => {
        if (launcherWindow) {
            launcherWindow.show();
        }
    });

    ipcMain.on('reduce-app', () => {
        launcherWindow.minimize();
    });

    ipcMain.on('close-app', () => {
        launcherWindow.close();
    });


    function loadPage(folderName, pageName) {
        launcherWindow.loadFile(`${folderName}/${pageName}.html`);
    };

    ipcMain.on('accueil', () => {
        loadPage('src/launcher/accueil','accueil');
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

    ipcMain.on('profil', () => {
        loadPage('src/launcher/setting','account');
    });

    ipcMain.on('newslauncher', () => {
        loadPage('src/launcher/accueil','accueil');
    });

    ipcMain.on('newslauncher-load', () => {
        launcherWindow.reload();
    });

    ipcMain.on('newsjeux', () => {
        loadPage('src/launcher/accueil/news-jeux','news-jeux');
    });

    ipcMain.on('newsjeux-load', () => {
        launcherWindow.reload();
    });

    ipcMain.on('newsdivers', () => {
        loadPage('src/launcher/accueil/news-divers','news-divers');
    });

    ipcMain.on('newsdivers-load', () => {
        launcherWindow.reload();
    });

    ipcMain.on('account', () => {
        loadPage('src/launcher/setting','account');
    });

    ipcMain.on('account-load', () => {
        launcherWindow.reload();
    });

    ipcMain.on('setting', () => {
        loadPage('src/launcher/setting','setting-friends');
    });

    ipcMain.on('setting-load', () => {
        launcherWindow.reload();
    });

    ipcMain.on('message', () => {
        loadPage('src/launcher/setting','voice-message');
    });

    ipcMain.on('message-load', () => {
        launcherWindow.reload();
    });
}

module.exports = {
    LauncherWin
};