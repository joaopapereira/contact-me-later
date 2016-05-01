var Datastore = require('nedb')
angular
    .module('Db', [])
    .service('Storage', ['$q', function($q) {
      this.db = new Datastore({ filename: './app.db', autoload: true });

      this.init = function() {
        var d = $q.defer();
        d.resolve(this);
        return d.promise;
      };

      this.insert = function(data) {
        var d = $q.defer();
        this.db.insert(doc, function (err, newDoc) {   // Callback is optional
          // newDoc is the newly inserted document, including its _id
          // newDoc has no key called notToBeSaved since its value was undefined
          d.resolve(newDoc);
        });
        return d.promise;
      }
      this.find = function(query) {
        var d = $q.defer();
        this.db.find(query, function (err, docs) {
          // docs is an array containing documents Mars, Earth, Jupiter
          // If no document is found, docs is equal to []
          d.resolve(docs);
        });
        return d.promise;
      }

      this.find_all = function() {
        return this.find({});
      }
}]);
