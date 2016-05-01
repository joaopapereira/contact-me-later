var app = require('app'),
    BrowserWindow = require('browser-window'),
    ipc = require("electron").ipcMain;

var mainWindow = null,
    addContactWindow = null;


function createaddContactWindow() {
    addContactWindow = new BrowserWindow({
        width: 640,
        height: 480,
        show: false
    });

    addContactWindow.loadURL('file://' + __dirname + '/windows/add_contact/add_contact.html');

    addContactWindow.on('closed',function() {
        addContactWindow = null;
    });
}

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768
    });

    mainWindow.loadURL('file://' + __dirname + '/windows/main/main.html');
    mainWindow.openDevTools();

    ipc.on('toggle-add-view', function() {
        if(addContactWindow === null) {
            createaddContactWindow();
        }
        return addContactWindow.show();
    });
});
