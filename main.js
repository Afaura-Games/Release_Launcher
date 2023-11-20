const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require("electron-updater");
const LauncherWindow = require("./launcher");
const RestartWindow = require("./restart");
const UpdateWindow = require("./update");
const CheckUpdateWin = require("./checkUpdate");

function destroyWindow() {
    CheckUpdateWin.close();
}

function DestroyWindow() {
    UpdateWindow.close();
}

/* Quand electron est prêt ! */
app.whenReady().then(() => {
    CheckUpdateWin.CheckUpdateWin();

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) {
            CheckUpdateWin.CheckUpdateWin();
        }
    })
})

autoUpdater.on("update-available", () => {
    destroyWindow();
    UpdateWindow.UpdateWin();
});

autoUpdater.on("update-not-available", () => {
    destroyWindow();
    LauncherWindow.LauncherWin();
});

autoUpdater.on("update-downloaded", () => {
    DestroyWindow();
    RestartWindow.RestartWin();
});

autoUpdater.on("error", () => {
});

/* Gestion de la fermeture de toutes les fenêtres */
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit(); 
    }
})