'use strict';

angular.module('ngApp.common.services.record', [ ])

  .service('Record', function ($q, $log, $rootScope, Profile) {

    var self = this;

    this.list = [];

    /**
    * Public method, createPokemon
    * @Object, form
    */

    this.create = function (form) {

      var Pokemon = Parse.Object.extend("Pokemon");
      var Records = Parse.Object.extend("Records");
      var record = new Records();

      record.set("title", form.title);
      record.set("weight", form.weight);
      record.set("comment", form.comment);

      var pokemon = new Pokemon();
      pokemon.id = form.pokemon.objectId;

      record.set("pokemon", pokemon);
      record.set("user", Profile.user);

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
    * Public method, List
    */

    this.list = function () {

      var defer     = $q.defer(),
          Pokemon   = Parse.Object.extend("Records");

      var query = new Parse.Query(Pokemon);

      query.equalTo("user", Profile.user);
      query.find({
        success: function(pokemon) {
          // userPosts contains all of the posts by the current user.

          var list = [];

          // angular for each
          angular.forEach(pokemon, function(child, key) {
            // backbone method toJSON, get obj info from model
            this.push(child.toJSON());
          }, list);

          // self.list = angular.copy(list);

          defer.resolve(list);
        },
        error: function(obj, error) {
          // Show the error message somewhere and let the user try again.
          defer.reject(_checkErros(error));
        }
      });

      return defer.promise;
    };

    /**
    * Public method, remove
    * @Object, form
    */

    this.remove = function (obejctId) {

      var defer = $q.defer();

      var Record = Parse.Object.extend("Records");
      var query = new Parse.Query(Record);


      query.get(obejctId, {
        success: function(myObj) {
          // The object was retrieved successfully.
          myObj.destroy({});
          defer.resolve(true);
        },
        error: function(object, error) {
          // The object was not retrieved successfully.
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
