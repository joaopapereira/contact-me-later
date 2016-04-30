var ipc = require("electron").ipcMain;

angular
    .module('Utils', [])
    .directive('toggleInsertView', function() {
        return function(scope, el) {
            el.bind('click', function(e) {
                e.preventDefault();
                ipc.send('toggle-insert-view');
            });
        };
    });
