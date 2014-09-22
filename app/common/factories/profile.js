'use strict';

angular.module('ngVet.common.factories.profile', [ ])

  .factory('profile', function ($q, $log) {

    var Profile = Parse.Object.extend("User", {

      // Instance methods
      myVetSignin: function (form) {

        var user = new Parse.User();
        user.set("name", form.name);
        user.set("username", form.username);
        user.set("password",form.password);
        user.set("email", form.email);

        // other fields can be set just like with Parse.Object
        // user.set("phone", "415-392-0202");

        var defer = $q.defer();

        console.log(user);

        user.signUp(null, {
          success: function(user) {
            // Hooray! Let them use the app now.
            defer.resolve(user);
          },
          error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            $log.error("Error: " + error.code + " " + error.message);
            defer.reject(error);
          }
        });

        return defer.promise;

      },

      myVetSaveName: function (user) {
        var defer = $q.defer();
        var user = new Parse.User();

        user.set("name", user.username);

        user.save(null, {
          success: function (user) {
            defer.resolve({ success: true });
          },
          error: function () {
            defer.reject({ success: false });
          }
        });
      },

      myVetLinkFacebook: function () {

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

      },

      myVetLogin: function (username, password) {
        var defer = $q.defer();


        console.log(username, password);

        Parse.User.logIn(username, password, {
          success: function(user) {
            // Do stuff after successful login.
            defer.resolve(user);
          },
          error: function(user, error) {
            $log.error(error);
            // The login failed. Check error to see why.
            defer.reject(error);
          }
        });

        return defer.promise;

      },

      myVetLogout: function () {
        Parse.User.logOut();
      },

      isAuthenticated: function () {
        $log.info('isAuthenticated');
        return Parse.User.current();
      },

      isEmailVerified: function () {
        return this.attributes.emailVerified;
      }

    }, {
      // Class methods

      // historyByUser: function (username) {

      //   var query = new Parse.Query(this);

      //   query.equalTo("username", username);
      //   return $q.when(query.find());

      // }

    });

    // // Title property
    // Object.defineProperty(User.prototype, "name", {
    //   get: function() {
    //     return this.get("name");
    //   },
    //   set: function(aValue) {
    //     this.set("name", aValue);
    //   }
    // });

    return Profile;

  });
