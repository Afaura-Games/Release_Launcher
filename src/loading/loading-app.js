
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
        width: 800,
        height: 450,
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
    //expandWindow()
    /*checkingWindow.webContents.on('did-finish-load', () => {
        expandWindow(); // Appel automatique de la fonction pour agrandir la fenêtre au chargement
    });*/

    // Retarde le lancement de l'animation de 5 secondes
    setTimeout(() => {
        expandWindow();
    }, 5000);
    
    
}


function expandWindow() {
    const targetWidth = 1280;
    const targetHeight = 720;
    const animationDuration = 1000; // Durée totale de l'animation en millisecondes
  
    let startTime; // Heure de début de l'animation
  
    function animate() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
  
      if (elapsedTime >= animationDuration) {
        // L'animation est terminée, arrêtez l'intervalle
        clearInterval(interval);
      } else {
        const progress = elapsedTime / animationDuration;
  
        const currentWidth = checkingWindow.getSize()[0];
        const currentHeight = checkingWindow.getSize()[1];
  
        const newWidth = currentWidth + (targetWidth - currentWidth) * progress;
        const newHeight = currentHeight + (targetHeight - currentHeight) * progress;
  
        checkingWindow.setSize(Math.round(newWidth), Math.round(newHeight), true);
  
        const currentPos = checkingWindow.getPosition();
        const newX = Math.round(currentPos[0] - (newWidth - currentWidth) / 2);
        const newY = Math.round(currentPos[1] - (newHeight - currentHeight) / 2);
  
        checkingWindow.setPosition(newX, newY);
      }
    }
  
    // Démarrer l'animation
    startTime = Date.now();
    const interval = setInterval(animate, 6); // 60 FPS
  }
  




/*function expandWindow() {
    const targetWidth = 1283;
    const targetHeight = 723;
  
    const interval = setInterval(() => {
        if (checkingWindow && !checkingWindow.isDestroyed()) {
            //console.log("function is online");
            const currentSize = checkingWindow.getSize();
            let currentWidth = currentSize[0];
            let currentHeight = currentSize[1];
  
            currentWidth += (targetWidth - currentWidth) * 0.0009;
            currentHeight += (targetHeight - currentHeight) * 0.0009;
  
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
            //console.log("function is down")
            clearInterval(interval);
        }
        //console.log(checkingWindow.getSize());
    }, 16.66); // ~60 FPS
    //console.log(checkingWindow.getSize());
    //console.log(checkingWindow.getPosition());
}*/
  

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