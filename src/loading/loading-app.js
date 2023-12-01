
// Importation des modules
const electron = require("electron");
require('electron-debug')({ showDevTools: false });
const { ipcMain } = require('electron');
const { autoUpdater } = require("electron-updater");

// Création de la variable pour gérer la fenêtre
let checkingWindow = undefined;

// Création d'un événement qui permet de créer une fenêtre lors de son appelle
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
            nodeIntegration: true,
        },
    });
    //checkingWindow.center();
    electron.Menu.setApplicationMenu(null);
    checkingWindow.setMenuBarVisibility(false);
    checkingWindow.loadFile("src/loading/checking/checking.html");
    checkingWindow.once('ready-to-show', () => {
        if (checkingWindow) {
            checkingWindow.show();
        }
    });
    /*ipcMain.on('content-refreshed', () => {
        // Traitez l'événement de rafraîchissement ici
        checkingWindow.webContents.send('content-refreshed', 'Nouveau contenu');
    });*/
    checkingWindow.webContents.on('did-finish-load', () => {
        expandWindow(); // Appel automatique de la fonction pour agrandir la fenêtre au chargement
    });
    
    
}
//checkingWindow.center();
// Création d'un événement qui permet d'agrandir les fenêtres
/*ipcMain.on('expand-app', () => {
    expwin;
});*/

/*function expandWindow() {
    checkingWindow.setSize(600, 600, true);
}*/
ipcMain.on('content-refreshed', () => {
    
});
/**setInterval(() => {
    
    checkingWindow.reload();
}, 16);*/

function expandWindow() {
    const targetWidth = 1285;
    const targetHeight = 725;
  
    const interval = setInterval(() => {
        if (checkingWindow && !checkingWindow.isDestroyed()) {
            //console.log("function is online");
            const currentSize = checkingWindow.getSize();
            let currentWidth = currentSize[0];
            let currentHeight = currentSize[1];
  
            currentWidth += (targetWidth - currentWidth) * 0.1;
            currentHeight += (targetHeight - currentHeight) * 0.1;
  
            checkingWindow.setSize(Math.round(currentWidth), Math.round(currentHeight), true);
  
            const currentPos = checkingWindow.getPosition();
            const newX = Math.round(currentPos[0] - (currentWidth - currentSize[0]) / 2);
            const newY = Math.round(currentPos[1] - (currentHeight - currentSize[1]) / 2);
  
            checkingWindow.setPosition(newX, newY);
  
            if (Math.abs(currentWidth - targetWidth) < 1 && Math.abs(currentHeight - targetHeight) < 1) {
                clearInterval(interval);
            }
        }
        else {
            // La fenêtre est détruite (fermée), arrêtez l'interval
            console.log("function is down")
            clearInterval(interval);
        }
        //console.log(checkingWindow.getSize());
    }, 16); // ~60 FPS
    //console.log(checkingWindow.getSize());
    //console.log(checkingWindow.getPosition());
}
  

// Création d'un événement qui ferme la fenêtre lors de son appelle
function destroyWindow() {
    checkingWindow.close();
}

// Création d'un événement qui permet lors de son appelle, de charger dynamiquement des pages html
function loadPage(folderName, pageName) {
    checkingWindow.loadFile(`${folderName}/${pageName}.html`);
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