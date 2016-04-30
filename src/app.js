var app = require('app'),
BrowserWindow = require('browser-window'),
ipc = require("electron").ipcMain;

var mainWindow = null;


function createInsertWindow() {
    insertWindow = new BrowserWindow({
        width: 640,
        height: 480,
        show: false
    });

    insertWindow.loadURL('file://' + __dirname + '/windows/insert/insert.html');

    insertWindow.on('closed',function() {
        insertWindow = null;
    });
}

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768
    });

    mainWindow.loadURL('file://' + __dirname + '/windows/main/main.html');
    mainWindow.openDevTools();

    ipc.on('toggle-insert-view', function() {
        if(!insertWindow) {
            createInsertWindow();
        }
        return (!insertWindow.isClosed() && insertWindow.isVisible()) ? insertWindow.hide() : insertWindow.show();
    });
});
