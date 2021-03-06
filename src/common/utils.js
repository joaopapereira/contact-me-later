var ipc = require("ipc"),
    path = require('path');

angular
    .module('Utils', ['Db'])
    .directive('toggleAddView', [function() {
        return function(scope, el) {
            el.bind('click', function(e) {
                e.preventDefault();
                ipc.send('toggle-add-view');
            });
        };
    }])
    .directive('saveContact', ['Storage', function(Storage) {
        return function(scope, el) {
            el.bind('click', function(e) {
                e.preventDefault();
                console.log("testing");

                if(scope.vm.formData) {
                    Storage
                        .insert(scope.vm.formData)
                        .then(function() {
                          console.log("done insert")
                            // refresh list in main view
                           ipc.send('update-main-view');
                           // reset form & close insert window
                           scope.vm.formData = {};
                           ipc.send('toggle-insert-view');
                        });
                }
            });
        };
    }])
