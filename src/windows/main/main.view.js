
angular
    .module('MainView', ['Db'])
    .controller('MainCtrl', function() {
        var vm = this;
        Storage.then(function (db) {
            vm.contacts = db.find_all();

            remoteIpc.on('update-main-view', function() {
                Storage
                    .reload()
                    .then(function() {
                        vm.contacts = db.find_all();
                    });
            });
        });
    });
