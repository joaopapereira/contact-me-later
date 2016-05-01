var ipc = require("ipc");

angular
    .module('Utils', [])
    .directive('toggleAddView', function() {
        console.log("bamm");
        return function(scope, el) {
            el.bind('click', function(e) {
                console.log("piff");
                e.preventDefault();
                ipc.send('toggle-add-view');
            });
        };
    });
