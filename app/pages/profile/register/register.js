'use strict';

angular.module('ngApp.profile.register', ['ngApp.common.directives.match', 'ngApp.common.directives.passwordStrength'])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('register', {
        url         : '/register',
        controller  : 'RegisterCtrl',
        templateUrl : 'pages/profile/register/register.tpl.html'
      });
  })

  // register controller.
  .controller('RegisterCtrl', function ($rootScope, $scope, $state, Profile) {

    $scope.user = {};
    $scope.submitted = false;
    $scope.errorSubmitted = false;

    $scope.register = function () {

      $scope.errorSubmitted = false;
      $scope.submitted = true;
      // If form is invalid, return and let AngularJS show validation errors.
      if ($scope.registerForm.$invalid) {
        return;
      }

      Profile.signin($scope.user)
        .then(function (user){
          swal({
            title: "Thanks for sign in.",
            text: "Now please confirm your email before login !",
            type: "success",
            confirmButtonText: 'Login',
            showCancelButton: true
          },
          function() {
            $state.go('login', { username: $scope.user.username });
          });
        }, function(error){
          $scope.errorSubmitted = true;
          $scope.user.errorMessage = error.message;
        });
    }

  });


