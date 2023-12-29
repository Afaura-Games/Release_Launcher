// Importation des modules
const electron = require("electron");
require('electron-debug')({ showDevTools: false });
const { ipcMain } = require('electron');
const {LauncherWin} = require("../launcher/launcher");

// Création de la variable pour gérer la fenêtre
let connectingWindow = undefined;

// Création d'un événement qui permet de créer une fenêtre lors de son appelle
function connectingWin() {
    connectingWindow = new electron.BrowserWindow({
        title: "Afaura Games - Connecting",
        width: 400,
        height: 500,
        resizable: false,
        frame: false,
        show: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
        },
    });
    electron.Menu.setApplicationMenu(null);
    connectingWindow.setMenuBarVisibility(false);
    connectingWindow.loadFile("src/connecting/connecting.html");
    connectingWindow.once('ready-to-show', () => {
        if (connectingWindow) {
            connectingWindow.show();
        }
    });
}

// Création d'un événement qui permet lors de son appelle, de charger dynamiquement des pages html
function loadPage(folderName, pageName) {
    connectingWindow.loadFile(`${folderName}/${pageName}.html`);
}

function destroywindow() {
    connectingWindow.close()
}

ipcMain.on('login', () => {
    loadPage('src/connecting/login','login');
});

ipcMain.on('login-app', () => {
    destroywindow()
    LauncherWin()
});

ipcMain.on('sign-up_app', () => {
    destroywindow()
    LauncherWin()
});





// Exportation des modules
module.exports = {
    connectingWin
};