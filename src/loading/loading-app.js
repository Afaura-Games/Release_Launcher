
// Importation des modules
const electron = require("electron");
const { ipcMain } = require('electron');
const { autoUpdater } = require("electron-updater");

// Création de la variable pour gérer la fenêtre
let checkingWindow = undefined;

// Création d'un événement qui permet de créer une fenêtre lors de son appele
function checkingWin() {
    checkingWindow = new electron.BrowserWindow({
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
    checkingWindow.setMenuBarVisibility(false);
    checkingWindow.loadFile("./checking/checking.html");
    checkingWindow.once('ready-to-show', () => {
        if (checkingWindow) {
            checkingWindow.show();
        }
    });
}

// Création d'un événement qui ferme la fenêtre lors de son appele
function destroyWindow() {
    checkingWindow.close();
}

// Création d'un événement qui permet lors de son appele, de charger dynamiquement des pages html
function loadPage(folderName, pageName) {
    checkingWindow.loadFile(`./${folderName}/${pageName}.html`);
}

// Permet de récupérer divers information sur une mise à jour, ici elle sont envoyées vers le fichier "update.html"
autoUpdater.on('download-progress', (progressObj) => {
    checkingWindow.webContents.send('download-progress', progressObj);
});

// Permet de lancer la mise à jours lorsque le bouton "Télécharger" est cliqué
ipcMain.on('update_app', () => {
    autoUpdater.downloadUpdate();
});

// Permet de redémarrer l'application suite au clique effectué sur le bouton "Redémarrer" et d'installer la mise à jour
ipcMain.on('download_app', () => {
    autoUpdater.quitAndInstall();
});

// Exportation des modules
module.exports = {
    checkingWin,
    destroyWindow,
    loadPage
};