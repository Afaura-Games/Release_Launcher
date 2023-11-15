const { app, BrowserWindow } = require('electron');
const electron = require("electron");
const { autoUpdater, AppUpdater } = require("electron-updater");
const LauncherWindow = require("./launcher");
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
}

// Quand electron est prêt !
app.whenReady().then(() => {
    ChekUpdateWin();

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) {
            ChekUpdateWin();
        }
    })
    autoUpdater.checkForUpdates();
})

// Ecouter l'événement 'update-available' qui est émis quand une mise à jour est trouvée
autoUpdater.on("update-available", () => {
    // Créer un bouton qui permet à l'utilisateur de télécharger la mise à jour
    let button = document.createElement("button");
    button.textContent = "Télécharger la mise à jour";
    button.addEventListener("click", () => {
      // Déclencher le téléchargement de la mise à jour
      autoUpdater.downloadUpdate();
    });
    document.body.appendChild(button);
});

// Ecouter l'événement 'update-downloaded' qui est émis quand la mise à jour est téléchargée
autoUpdater.on("update-downloaded", () => {
    // Créer un bouton qui permet à l'utilisateur d'installer la mise à jour
    let button = document.createElement("button");
    button.textContent = "Installer la mise à jour";
    button.addEventListener("click", () => {
      // Quitter l'application et installer la mise à jour
      autoUpdater.quitAndInstall();
    });
    document.body.appendChild(button);
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
        app.quit()
    }
})

