'use strict';

angular.module('ngVet.common.services.pet', [ ])

  .service('pet', function ($q, $log, profile) {

    var self = this;

    /**
    * Public method, myVetCreatePet assigned to prototype
    * @Object, form
    */

    this.myVetCreatePet = function (pet) {

      self = this;

      var Pet = Parse.Object.extend("Pets");
      var pet = new Pet();

      pet.set("name", pet.name);
      pet.set("brand", pet.brand);
      pet.set("type", pet.type);
      pet.set("weigth", pet.weigth);
      pet.set("birthday", pet.birthday);
      pet.set("gender", pet.gender);
      pet.set("pedigree", pet.pedigree);
      pet.set("crossdog", pet.crossdog);
      pet.set("onsale", pet.onsale);
      pet.set("description", pet.description);
      pet.set("user", profile.user);

      var defer = $q.defer();

      /*pet.save(null, {
        success: function(obj) {
          // Hooray! Let them use the app now.
          defer.resolve(obj);
        },
        error: function(obj, error) {
          // Show the error message somewhere and let the user try again.
          defer.reject(_checkErros(error));
        }
      });*/

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
