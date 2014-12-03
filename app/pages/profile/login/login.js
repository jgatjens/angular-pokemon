'use strict';

angular.module('ngApp.profile.login', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('login', {
        url         : '/login/:username?errorCode',
        params: {
          username: { value: '' },
          errorCode: { value: '' }
        },
        controller  : 'LoginCtrl',
        templateUrl : 'pages/profile/login/login.tpl.html'
      });
  })

  // Login controller.
  .controller('LoginCtrl', function ($rootScope, $scope, $state, Profile) {

    $scope.user = {
      username: $state.params.username ? $state.params.username : ''
    };
    $scope.submitted = false;
    $scope.confirmEmail = false;
    $scope.errorSubmitted = false;

    $scope.accessDenied = $state.params.errorCode;

    $scope.login = function () {

      $scope.errorSubmitted = false;
      $scope.confirmEmail = false;
      $scope.submitted = true;
      // If form is invalid, return and let AngularJS show validation errors.
      if ($scope.loginForm.$invalid) {
        return;
      }

      Profile.login($scope.user.username, $scope.user.password)
        .then(function (user) {

          // Verified email
          if (!Profile.isEmailVerified()) {
            $scope.confirmEmail = true;
            return;
          }

          $state.go('home');

        }, function(error){
          $scope.errorSubmitted = true;
          $scope.user.errorMessage = error.message;
          // console.log(error);
        });
    }

    $scope.loginWithFacebook = function () {

      // $scope.errorSubmitted = false;
      // $scope.submitted = true;

      // Profile.loginWithFacebook()
      //   .then(function (user) {
      //     $state.go('home');
      //   }, function(error){
      //     $scope.errorSubmitted = true;
      //     $scope.user.errorMessage = error.message;
      //   });

    }

  });


