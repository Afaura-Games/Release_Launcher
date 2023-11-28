
// Importation des modules
const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require("electron-updater");
const {LauncherWin} = require("./launcher/launcher");
const {checkingWin, destroyWindow, loadPage} = require("./loading/loading-app");

// Fait en sorte que la mise à jour ne se télécharge pas automatiquement
autoUpdater.autoDownload = false;

// Quand l'application s'ouvre pour la première fois
app.whenReady().then(() => {
    checkingWin();

    // Quand l'application vient de s'ouvrir, mais que aucune fenêtre n'est activé
    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) {
            checkingWin();
        }
    })

    // Permet de vérifier si des mises à jour sont disponibles
    autoUpdater.checkForUpdates();
})

// Quand une mise à jour est disponible
autoUpdater.on("update-available", () => {
    loadPage('update','update');
});

// Quand aucune mise à jour n'est disponible
autoUpdater.on("update-not-available", () => {
    destroyWindow();
    LauncherWin();
});

// Quand la mise à jour vient d'être téléchargée
autoUpdater.on("update-downloaded", () => {
    loadPage('download','downloading');
});

// Emis lorsqu'une erreur apparait
autoUpdater.on("error", () => {
});

// Permet de fermer l'application lorsque toutes les fenêtres sont fermées
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit(); 
    }
})