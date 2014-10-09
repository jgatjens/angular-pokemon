'use strict';

angular.module('ngVet.common.services.pet', [ ])

  .service('Pet', function ($q, $log, Profile) {

    var self = this;

    /**
    * Public method, createPet
    * @Object, form
    */

    this.create = function (form) {

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
    * Public method, remove
    * @Object, form
    */


    this.remove = function (obejctId) {

      var defer = $q.defer();

      var Pets = Parse.Object.extend("Pets");
      var query = new Parse.Query(Pets);


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

      var Pets = Parse.Object.extend("Pets");
      var query = new Parse.Query(Pets);

      query.get(obejctId, {
        success: function(myObj) {
          self.pet = myObj;
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


    this.save = function (petInfo) {

      var defer = $q.defer();

      this.pet.set('birthday', petInfo.birthday);
      this.pet.set('brand', petInfo.brand);
      this.pet.set('crossdog', petInfo.crossdog);
      this.pet.set('description', petInfo.description);
      this.pet.set('gender', petInfo.gender);
      this.pet.set('name', petInfo.name);
      this.pet.set('onsale', petInfo.onsale);
      this.pet.set('pedigree', petInfo.pedigree);
      this.pet.set('type', petInfo.type);
      this.pet.set('weigth', petInfo.weigth);

      this.pet.save(null, {
        success: function (pet) {
          defer.resolve({ success: true, pet: pet });
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
      return ['Addiction Foods', 'Pro pet', 'Alpo', 'Artemis', 'AvoDerm', 'Beggin Strips', 'Beneful', 'Bonio', 'By Nature', 'Dog Chow', 'Essential Foods', 'Eukanuba', 'Freshpet', 'Friskies', 'Frosty Paws', 'Gaines-Burgers', 'The Goodlife Recipe', 'Gravy Train', 'Happidog', 'Hills Pet Nutrition', 'The Honest Kitchen', 'Iams', 'Kal Kan', 'Ken-L Ration', 'Kennomeat', 'Kibbles n Bits', 'Milk-Bone', 'Natural Balance Pet Foods', 'Natures Variety', 'Nestlé Purina PetCare', 'Ralston Purina', 'Nutro Products', 'Ol Roy', 'Pedigree Petfoods', 'Purina ONE', 'Royal Canin', 'Science Diet', 'Solid Gold', 'Vegepet', 'WellPet', 'Winalot'];
    };

    /**
    * Public method, getTypes
    */

    this.getTypes = function () {
      return ['Dogs', 'Cats', 'Fish', 'Small Pets', 'Box Turtles', 'Ferrets', 'Cute Pet', 'Rabbits', 'Parrots', 'Guinea Pigs', 'Reptile Pets', 'Green Iguanas', 'House Pets', 'Birds'];
    };

    /**
    * Public method, petList
    */

    this.list = function () {

      var defer = $q.defer(),
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
