'use strict';

angular.module('ngVet.common.services.profile', [ ])

  .service('profile', function ($q, $log, $rootScope) {

    // user obj
    this.user = null;

    /**
    * Public method, myVetSignin assigned to prototype
    * @Object, form
    */

    this.myVetSignin = function (form) {
        var user = new Parse.User(),
            self = this;

        user.set("name", form.name);
        user.set("username", form.username);
        user.set("password",form.password);
        user.set("email", form.email);

        // other fields can be set just like with Parse.Object
        // user.set("phone", "415-392-0202");

        var defer = $q.defer();

        user.signUp(null, {
          success: function(user) {
            // Hooray! Let them use the app now.
            selt.user = user;

            _setUser(user);
            defer.resolve(user);
          },
          error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            $log.error("Error: " + error.code + " " + error.message);
            defer.reject(error);
          }
        });

        return defer.promise;
    };

    /**
    * Public method, myVetLogin assigned to prototype
    * @string, username
    * @string, password
    */
    this.myVetLogin = function (username, password) {
        var defer = $q.defer(),
            self = this;

        // $log.info(username, password);

        Parse.User.logIn(username, password, {
          success: function(user) {
            // Do stuff after successful login.
            self.user = user;

            _setUser(user);
            defer.resolve(user);
          },
          error: function(user, error) {
            $log.error(error);
            // The login failed. Check error to see why.
            defer.reject(error);
          }
        });

        return defer.promise;

    }

    /**
    * Public method, myVetSaveName assigned to prototype
    * @Object, user
    */
    this.myVetSaveName = function (user) {
      var defer = $q.defer(),
          user = new Parse.User();

      user.set("name", user.username);

      user.save(null, {
        success: function (user) {
          defer.resolve({ success: true });
        },
        error: function () {
          defer.reject({ success: false });
        }
      });

    }

    /**
    * Public method, myVetLinkFacebook assigned to prototype
    */
    this.myVetLinkFacebook = function () {
        var defer = $q.defer();

        Parse.FacebookUtils.logIn(null, {
          success: function(user) {
            if (!user.existed()) {
              $log.error("User signed up and logged in through Facebook!");
            } else {
              $log.error("User logged in through Facebook!");
            }
            defer.resolve(user);
          },
          error: function(user, error) {
            defer.reject(user);
            $log.error("User cancelled the Facebook login or did not fully authorize.");
          }
        });

        return defer.promise;
    }



    /**
    * Public method, myVetLogin assigned to prototype
    */
    this.myVetLogout = function () {
      $rootScope.user = {};
      Parse.User.logOut();
    }

    /**
    * Public method, isAuthenticated assigned to prototype
    */
    this.isAuthenticated = function () {
      return Parse.User.current() && Parse.User.current().authenticated();
    }

    /**
    * Public method, isEmailVerified assigned to prototype
    */
    this.isEmailVerified = function () {
      return this.user.get('emailVerified');
    }

    var _setUser = function(user) {
      $rootScope.user = user.toJSON();
      $rootScope.user.isAuthenticated = user.authenticated();
    }


  });
