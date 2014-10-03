'use strict';

angular.module('ngVet.profile.register', ['ngVet.common.directives.match', 'ngVet.common.directives.passwordStrength'])

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
  .controller('RegisterCtrl', function ($rootScope, $scope, $state, profile) {

    $scope.user = {};
    $scope.confirmEmail = false;
    $scope.submitted = false;
    $scope.errorSubmitted = false;

    $scope.register = function () {

      $scope.errorSubmitted = false;
      $scope.submitted = true;
      // If form is invalid, return and let AngularJS show validation errors.
      if ($scope.registerForm.$invalid) {
        return;
      }

      profile.myVetSignin($scope.user)
        .then(function (user){
          $scope.confirmEmail = true;
          // $state.go('home');
        }, function(error){
          $scope.errorSubmitted = true;
          $scope.user.errorMessage = error.message;
        });
    }

  });


