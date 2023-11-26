const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require("electron-updater");
const {LauncherWin} = require("./launcher");
const {RestartWin} = require("./restart");
const {UpdateWin, DestroyWindow} = require("./update");
const {CheckUpdateWin, destroyWindow} = require("./checkUpdate");

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
    UpdateWin();
});

autoUpdater.on("update-not-available", () => {
    destroyWindow();
    LauncherWin();
});

autoUpdater.on("update-downloaded", () => {
    RestartWin();
    DestroyWindow();
});

autoUpdater.on("error", () => {
});

/* Gestion de la fermeture de toutes les fenêtres */
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit(); 
    }
})