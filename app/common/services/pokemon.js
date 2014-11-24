'use strict';

angular.module('ngApp.common.services.pokemon', [ ])

  .service('Pokemon', function ($q, $log, Profile) {

    var self = this;

    this.list = [];

    /**
    * Public method, createPet
    * @Object, form
    */

    this.create = function (form) {

      var Pokemon = Parse.Object.extend("Pokemon");
      var pokemon = new Pokemon();

      // create ACL
      var acl = new Parse.ACL();
      // public cannot read data
      acl.setPublicReadAccess(false);
      acl.setPublicWriteAccess(false);
      // user can read data
      acl.setReadAccess( Profile.user, true );
      acl.setWriteAccess( Profile.user, true );
      // save ACL to object
      pokemon.setACL( acl );

      pokemon.set("name", form.name);
      pokemon.set("brand", form.brand);
      pokemon.set("type", form.type);
      pokemon.set("weigth", form.weigth);
      pokemon.set("birthday", form.birthday);
      pokemon.set("gender", form.gender);
      pokemon.set("pedigree", form.pedigree);
      pokemon.set("crossdog", form.crossdog);
      pokemon.set("onsale", form.onsale);
      pokemon.set("description", form.description);
      pokemon.set("user", Profile.user);

      if (form.picture) {
        var file = new Parse.File(form.file.name, { base64: form.picture }, form.file.type);
        pokemon.set("picture", file);
      }

      var defer = $q.defer();

      pokemon.save(null, {
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
    * Public method, remove
    * @Object, form
    */


    this.remove = function (obejctId) {

      var defer = $q.defer();

      var Pet = Parse.Object.extend("Pokemon");
      var query = new Parse.Query(Pet);


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
    * Public method, getById
    * @Object, form
    */


    this.getById = function (obejctId) {

      var defer = $q.defer();

      var Pokemon = Parse.Object.extend("Pokemon");
      var query = new Parse.Query(Pokemon);

      query.get(obejctId, {
        success: function(myObj) {
          self.pokemon = myObj;
          // The object was retrieved successfully.
          defer.resolve(myObj.attributes);
        },
        error: function(object, error) {
          // The object was not retrieved successfully.
           defer.reject(_checkErros(error));
        }
      });

      return defer.promise;
    };

    /**
    * Public method, save
    * @Object, form
    */


    this.save = function (form) {

      var defer = $q.defer();

      this.pokemon.set('birthday', form.birthday);
      this.pokemon.set('brand', form.brand);
      this.pokemon.set('crossdog', form.crossdog);
      this.pokemon.set('description', form.description);
      this.pokemon.set('gender', form.gender);
      this.pokemon.set('name', form.name);
      this.pokemon.set('onsale', form.onsale);
      this.pokemon.set('pedigree', form.pedigree);
      this.pokemon.set('type', form.type);
      this.pokemon.set('weigth', form.weigth);

      if (form.file && form.file.name) {
        var file = new Parse.File(form.file.name, { base64: form.picture }, form.file.type);
        this.pokemon.set("picture", file);
      }

      this.pokemon.save(null, {
        success: function (pokemon) {
          defer.resolve({ success: true, pokemon: pokemon });
        },
        error: function (user, error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    };


    /**
    * Public method, getBrands
    */

    this.getBrands = function () {
      return ['Addiction Foods', 'Pro pokemon', 'Alpo', 'Artemis', 'AvoDerm', 'Beggin Strips', 'Beneful', 'Bonio', 'By Nature', 'Pokemon Chow', 'Essential Foods', 'Eukanuba', 'Freshpokemon', 'Friskies', 'Frosty Paws', 'Gaines-Burgers', 'The Goodlife Recipe', 'Gravy Train', 'Happidog', 'Hills Pet Nutrition', 'The Honest Kitchen', 'Iams', 'Kal Kan', 'Ken-L Ration', 'Kennomeat', 'Kibbles n Bits', 'Milk-Bone', 'Natural Balance Pet Foods', 'Natures Variety', 'Nestlé Purina PetCare', 'Ralston Purina', 'Nutro Products', 'Ol Roy', 'Pedigree Petfoods', 'Purina ONE', 'Royal Canin', 'Science Diet', 'Solid Gold', 'Vegepokemon', 'WellPet', 'Winalot'];
    };

    /**
    * Public method, getTypes
    */

    this.getTypes = function () {
      return ['Fire','Fighting','Water','Flying','Grass','Poison','Electric','Ground','Psychic','Rock','Ice','Bug','Dragon','Ghost ','Dark','Steel ','Fairy']
      // return ['Dogs', 'Cats', 'Fish', 'Small Pokemon', 'Box Turtles', 'Ferrets', 'Cute Pet', 'Rabbits', 'Parrots', 'Guinea Pigs', 'Reptile Pokemon', 'Green Iguanas', 'House Pokemon', 'Birds'];
    };

    /**
    * Public method, pokemonList
    */

    this.list = function () {

      var defer = $q.defer(),
          Pokemon   = Parse.Object.extend("Pokemon");

      var query = new Parse.Query(Pokemon);

      query.equalTo("user", Profile.user);
      query.find({
        success: function(pokemons) {
          // userPosts contains all of the posts by the current user.

          var list = [];

          // angular for each
          angular.forEach(pokemons, function(child, key) {
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
    * Public method, getPetFromListById
    * String Id
    */

    // this.getPokemonFromListById = function (id) {

    //   // angular for each
    //   var currentPokemon = {};

    //   angular.forEach(self.list, function(child, key) {
    //     // backbone method toJSON, get obj info from model
    //     if (child.objectId === id) {
    //       currentPokemon = child;
    //     }
    //   });

    //   return currentPokemon;
    // };


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
