'use strict';

angular.module('ngVet.common.services.pet', [ ])

  .service('Pet', function ($q, $log, Profile) {

    var self = this;

    /**
    * Public method, createPet assigned to prototype
    * @Object, form
    */


    this.create = function (form) {

      self = this;

      var Pets = Parse.Object.extend("Pets");
      var pet = new Pets();

      pet.set("name", form.name);
      pet.set("brand", form.brand);
      pet.set("type", form.type);
      pet.set("weigth", form.weigth);
      pet.set("birthday", form.birthday);
      pet.set("gender", form.gender);
      pet.set("pedigree", form.pedigree);
      pet.set("crossdog", form.crossdog);
      pet.set("onsale", form.onsale);
      pet.set("description", form.description);
      pet.set("user", Profile.user);

      var defer = $q.defer();

      pet.save(null, {
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
    * Public method, petList assigned to prototype
    * @Object, form
    */

    this.list = function () {

      var self  = this,
          defer = $q.defer(),
          Pets   = Parse.Object.extend("Pets");

      var query = new Parse.Query(Pets);

      query.equalTo("user", Profile.user);
      query.find({
        success: function(pets) {
          // userPosts contains all of the posts by the current user.

          var log = [];

          // angular for each
          angular.forEach(pets, function(child, key) {
            // backbone method toJSON, get obj info from model
            this.push(child.toJSON());
          }, log);

          defer.resolve(log);
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
