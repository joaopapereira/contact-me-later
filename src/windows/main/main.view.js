
angular
    .module('MainView', ['Db'])
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
