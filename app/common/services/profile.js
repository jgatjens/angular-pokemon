'use strict';

angular.module('ngVet.common.services.profile', [ ])

  .service('profile', function ($q, $log, $rootScope) {

    var self = this;

    // user obj
    this.user = Parse.User.current();

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
            self.user = user;

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
      this.user.set("name", user.name);
      return _saveUser();
    }

    /**
    * Public method, myVetSaveName assigned to prototype
    * @Object, user
    */
    this.myVetSavePassword = function (user) {
      this.user.set("password", user.password);
      return _saveUser();
    }

    this.myVetResetPassword = function (email) {

      var defer = $q.defer();

      console.log(email);

      Parse.User.requestPasswordReset(email, {
        success: function () {
          // Password reset request was sent successfully
          defer.resolve({ success: true, message: 'Password reset request was sent successfully' });
        },
        error: function (error) {
          // Show the error message somewhere
          defer.reject(error);
        }
      });

      return defer.promise;
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

    /**
    * Private method, set user to angular root scope
    */

    var _setUser = function (user) {

      if (!user) return;

      $rootScope.user = user.toJSON();
      $rootScope.user.isAuthenticated = user.authenticated();
    }


    /**
    * Private method, save profile info
    */

    var _saveUser = function () {

      if (!self.user)
        return defer.reject({ error: { message: 'Object user is not present' } });

      var defer = $q.defer();

      self.user.save(null, {
        success: function (user) {
          _setUser(user);
          defer.resolve({ success: true, user: user });
        },
        error: function (user, error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    }

    // set
    _setUser(this.user);

  });
