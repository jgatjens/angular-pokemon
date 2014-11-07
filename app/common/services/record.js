'use strict';

angular.module('ngVet.common.services.record', [ ])

  .service('Record', function ($q, $log, $rootScope) {

    var self = this;

    this.list = [];

    /**
    * Public method, createPet
    * @Object, form
    */

    this.create = function (form) {

      var Pet = Parse.Object.extend("Pets");
      var Records = Parse.Object.extend("Records");
      var record = new Records();

      record.set("title", form.title);
      record.set("weight", form.weight);
      record.set("comment", form.comment);

      var pet = new Pet();
      pet.id = form.pet.objectId;

      record.set("pet", pet);

      var defer = $q.defer();

      record.save(null, {
        success: function(obj) {
          // Hooray! Let them use the app now.
          defer.resolve(obj);
        },
        error: function(obj, error) {
          // Show the error message somewhere and let the user try again.
          defer.reject(_checkErros(error));
        }
      });

      return defer.promise;
    };


    /**
     * Private method, valided nextwork connection
     */

    var _checkErros = function (error) {

      if (error.code === 100){
        // throw new TypeError('XMLHttpRequest failed');
        return { code: error.code, message: 'No connection with the server' };
      } else {
        return error;
      }

    }


  });
