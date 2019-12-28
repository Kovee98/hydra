const { app, BrowserWindow } = require('electron');
const windowStateKeeper = require('electron-window-state');
const path = require('path');

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
    global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\');
}

let mainWindow;

function createWindow () {
    let windowState = windowStateKeeper({
        defaultWidth: 1000,
        defaultHeight: 750
    });

    mainWindow = new BrowserWindow({
        ...windowState,
        icon: path.join(__dirname, '../icons/icon.png'),
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        },
        frame: false
    });

    mainWindow.removeMenu();

    mainWindow.loadURL(process.env.APP_URL);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    windowState.manage(mainWindow);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
