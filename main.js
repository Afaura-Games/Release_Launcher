const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require("electron-updater");
const {LauncherWin} = require("./launcher");
const {RestartWin} = require("./restart");
const {UpdateWin, DestroyWindow, z, x} = require("./update");
const {CheckUpdateWin, destroyWindow, destroywindow} = require("./checkUpdate");

autoUpdater.autoDownload = false;

/* Quand electron est prêt ! */
app.whenReady().then(() => {
    CheckUpdateWin();

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) {
            CheckUpdateWin();
        }
    })
    autoUpdater.checkForUpdates();
})

autoUpdater.on("update-available", () => {
    destroyWindow();
    z();
});

autoUpdater.on("update-not-available", () => {
    destroywindow()
    LauncherWin();
});

autoUpdater.on("update-downloaded", () => {
    DestroyWindow();
    x();
});

autoUpdater.on("error", () => {
});

/* Gestion de la fermeture de toutes les fenêtres */
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit(); 
    }
})