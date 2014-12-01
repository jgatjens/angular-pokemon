'use strict';

angular.module('ngApp.common.services.profile', [ ])

  .service('Profile', function ($q, $log, $rootScope) {

    var self        = this;

    // user obj
    this.user       = Parse.User.current();

    /**
    * Public method, Signin assigned to prototype
    * @Object, form
    */

    this.signin = function (form) {
      var user = new Parse.User(),
          self = this;

      user.set("name", form.name);
      user.set("username", form.username);
      user.set("password",form.password);
      user.set("email", form.email);

      var defer = $q.defer();

      user.signUp(null, {
        success: function(user) {
          // Hooray! Let them use the app now.
          _setUser(user);
          defer.resolve(user);
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          defer.reject(_checkErros(error));
        }
      });

      return defer.promise;
    };

    /**
    * Public method, Login assigned to prototype
    * @string, username
    * @string, password
    */
    this.login = function (username, password) {
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
          // The login failed. Check error to see why.
          defer.reject(_checkErros(error));
        }
      });

      return defer.promise;
    }

    /**
    * Public method, LoginWithFacebook assigned to prototype
    */
    this.loginWithFacebook = function () {
      var defer = $q.defer();

      Parse.FacebookUtils.logIn('user_likes, email', {
        success: function(user) {
          if (!user.existed()) {
            $log.error("User signed up and logged in through Facebook!");
          } else {
            $log.error("User logged in through Facebook!");
          }


          _setUser(user);
          defer.resolve(user);
        },
        error: function(user, error) {
          defer.reject(user);
          defer.reject(_checkErros(error));
          $log.error("User cancelled the Facebook login or did not fully authorize.");
        }
      });

      return defer.promise;
    }

    /**
    * Public method, getById
    * @Object, form
    */


    this.getByUsername = function (username) {

      var defer = $q.defer();

      var User = Parse.Object.extend("User");
      var query = new Parse.Query(User);
      query.equalTo("username", username);

      query.find({
        success: function(user) {
          // The object was retrieved successfully.

          if (user.length < 1 ) {
            defer.resolve({ error: true, message: 'User not found' });
            return;
          }

          if ( user[0].get('username') === username) {

            // Do stuff after successful login.
            self.user = user[0];

            _setUser(user[0]);

            defer.resolve(true);
            return;
          }

          defer.resolve({ error: true, message: 'User not found' });
        },
        error: function(object, error) {
          // The object was not retrieved successfully.
           defer.reject(_checkErros(error));
        }
      });

      return defer.promise;
    };

    /**
    * Public method, SaveName assigned to prototype
    * @Object, user
    */
    this.saveLastVisit = function () {
      this.user.set("lastVisit", new Date());
      return _saveUser();
    }

    /**
    * Public method, SaveName assigned to prototype
    * @Object, user
    */
    this.saveName = function (user) {
      this.user.set("name", user.name);
      return _saveUser();
    }

    /**
    * Public method, SaveName assigned to prototype
    * @Object, user
    */
    this.saveEmail = function (user) {
      this.user.set("email", user.email);
      return _saveUser();
    }

    /**
    * Public method, SaveName assigned to prototype
    * @Object, user
    */
    this.savePassword = function (user) {
      this.user.set("password", user.password);
      return _saveUser();
    }

    /**
    * Public method, SaveCurrentPokemon assigned to prototype
    * @Object, id
    */
    this.saveCurrentPokemon = function (id) {
      this.user.set("currentPokemon", id);
      return _saveUser();
    }

    /**
    * Public method, getCurrentPokemon assigned to prototype
    */
    this.getCurrentPokemonId = function () {
      return this.user.get("currentPokemon");
    }

    /**
    * Public method, SaveName assigned to prototype
    * @Object, user
    */
    this.saveAditionalInfo = function (user) {

      if (user.allowEmails) this.user.set("allowEmails", user.allowEmails);
      if (user.gender) this.user.set("gender", user.gender);
      return _saveUser();
    }

    /**
    * Public method, ResetPassword assigned to prototype
    * @Object, email
    */
    this.resetPassword = function (email) {

      var defer = $q.defer();

      console.log(email);

      Parse.User.requestPasswordReset(email, {
        success: function () {
          // Password reset request was sent successfully
          defer.resolve({ success: true, message: 'Password reset request was sent successfully' });
        },
        error: function (error) {
          // Show the error message somewhere
          defer.reject(_checkErros(error));
        }
      });

      return defer.promise;
    }

    /**
    * Public method, LinkFacebook assigned to prototype
    */
    this.linkFacebook = function () {
      var defer = $q.defer();

      if (!Parse.FacebookUtils.isLinked(this.user)) {
        Parse.FacebookUtils.link(this.user, null, {
          success: function(user) {
            self.user = user;
            alert("Woohoo, user logged in with Facebook!");
          },
          error: function(user, error) {
            alert("User cancelled the Facebook login or did not fully authorize.");
          }
        });
      }

      return defer.promise;
    }

    /**
    * Public method, LinkFacebook assigned to prototype
    */
    this.unLinkFacebook = function () {
      var defer = $q.defer();

      if (Parse.FacebookUtils.isLinked()) {
        Parse.FacebookUtils.unlink(user, {
          success: function(user) {
            alert("The user is no longer associated with their Facebook account.");
          }
        });
      }

      return defer.promise;
    }

    /**
    * Public method, Login assigned to prototype
    */
    this.logout = function () {
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

      var defer = $q.defer();

      if (!self.user)
        return defer.reject({ error: { message: 'Object user is not present' } });


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
