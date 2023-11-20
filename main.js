const { app, BrowserWindow } = require('electron');
const electron = require("electron");
const { autoUpdater, AppUpdater } = require("electron-updater");
const LauncherWindow = require("./launcher");
const {restart} = require('./launcher');
const path = require('path');
let CheckUpdateWindow = undefined;
let UpdateWindow = undefined;
let RestartWindow = undefined;

function destroyWindow() {
    CheckUpdateWindow.close();
}

function DestroyWindow() {
    UpdateWindow.close();
}

function ChekUpdateWin() {
    CheckUpdateWindow = new electron.BrowserWindow({
        title: "Mise à jour",
        width: 400,
        height: 500,
        resizable: false,
        frame: false,
        show: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        },
    });
    electron.Menu.setApplicationMenu(null);
    CheckUpdateWindow.setMenuBarVisibility(false);
    CheckUpdateWindow.loadFile("checkUpdate.html");
    CheckUpdateWindow.once('ready-to-show', () => {
        if (CheckUpdateWindow) {
            CheckUpdateWindow.show();
        }
    });
}

function UpdateWin() {
    UpdateWindow = new electron.BrowserWindow({
        title: "Mise à jour",
        width: 400,
        height: 500,
        resizable: false,
        frame: false,
        show: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        },
    });
    electron.Menu.setApplicationMenu(null);
    UpdateWindow.setMenuBarVisibility(false);
    UpdateWindow.loadFile("update.html");
    UpdateWindow.once('ready-to-show', () => {
        if (UpdateWindow) {
            UpdateWindow.show();
        }
    });
}

function RestartWin() {
    RestartWindow = new electron.BrowserWindow({
        title: "Mise à jour",
        width: 400,
        height: 500,
        resizable: false,
        frame: false,
        show: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        },
    });
    electron.Menu.setApplicationMenu(null);
    RestartWindow.setMenuBarVisibility(false);
    RestartWindow.loadFile("restart.html");
    RestartWindow.once('ready-to-show', () => {
        if (RestartWindow) {
            RestartWindow.show();
        }
    });
    /*restart = 0;
    function app_restart() {
        restart++;
        if(restart > 0) {
            window.close();
            app.on('window-all-closed', () => {
                app.relaunch();
                app.quit();
            })
        }
    }*/
}

/* Quand electron est prêt ! */
app.whenReady().then(() => {
    LauncherWindow.createWindow();

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) {
            LauncherWindow.createWindow();
        }
    })
    /*autoUpdater.checkForUpdates();*/
})

autoUpdater.on("update-available", () => {
    destroyWindow();
    UpdateWin();
});

autoUpdater.on("update-not-available", () => {
    destroyWindow();
    LauncherWindow.createWindow();
});

autoUpdater.on("update-downloaded", () => {
    DestroyWindow();
    RestartWin();
});

autoUpdater.on("error", () => {
});














/*
autoUpdater.on("update-available", (info) => {
    destroyWindow();
    UpdateWin();
    function DlUpdate() {
        autoUpdater.downloadUpdate();
    }
});

autoUpdater.on("update-not-available", (info) => {
    destroyWindow();
    LauncherWindow.createWindow();
});

 Redémarrer l'application
autoUpdater.on("update-downloaded", (info) => {
    DestroyWindow();
    RestartWin();
    function Restart() {
        app.relaunch()
        app.exit()
    }
});
  
autoUpdater.on("error", (info) => {
});


 Gestion de la fermeture de toutes les fenêtres */
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        if(restart > 0) {
            app.relaunch();
            app.quit();
        }
        else {
            app.quit();
        }
        
    }
})

/*function jsp() {
    app.on('window-all-closed', () => {
        app.relaunch();
        app.quit();
    })
}*/
