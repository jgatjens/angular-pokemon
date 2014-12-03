'use strict';

angular.module('ngApp.profile.password', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('forgotPassword', {
        url         : '/forgot/password',
        controller  : 'PasswordCtrl',
        templateUrl : 'pages/profile/password/password.tpl.html'
      });
  })

  // password controller.
  .controller('PasswordCtrl', function ($rootScope, $scope, $state, Profile) {

    $scope.user = {};
    $scope.okRequest = false;
    $scope.errorSubmitted = false;
    $scope.submitted = false;

    $scope.resetPassword = function () {

      $scope.okRequest = false;
      $scope.submitted = true;
      $scope.errorSubmitted = false;

      // If form is invalid, return and let AngularJS show validation errors.
      if ($scope.passwordForm.$invalid) {
        return;
      }

      Profile.resetPassword($scope.user.email)
        .then(function (user) {

          $scope.okRequest = true;

        }, function (error){
          $scope.errorSubmitted = true;
          $scope.user.errorMessage = error.message;
        });

    }

  });


