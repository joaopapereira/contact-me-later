
var remote = require('remote'),
    remoteIpc = remote.require('electron').ipcMain;

angular
    .module('MainView', ['Db', 'Utils'])
    .controller('MainCtrl', ['Storage', '$scope', function(Storage, scope) {
        var vm = this;
        Storage.init()
          .then(function (db) {
            vm.contacts = db.find_all();

            remoteIpc.on('update-main-view', function() {
                Storage
                    .reload()
                    .then(function() {
                        vm.contacts = db.find_all();
                    });
            });
        });
    }]);
