'use strict';

angular.module('ngVet.profile', ['ngVet.common.directives.match', 'ngVet.profile.password', 'ngVet.profile.about', 'ngVet.profile.login', 'ngVet.profile.register' ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('profile', {
        url         : '/profile',
        controller  : 'ProfileCtrl',
        authenticate: true,
        templateUrl : 'pages/profile/profile.tpl.html'
      });
  })

  // Profile controller.
  .controller('ProfileCtrl', function ($scope, $rootScope, profile) {

    $scope.userInfo = {};

    $scope.okName = false;
    $scope.submitted = false;

    $scope.saveName = function () {

      $scope.submitted = true

      // If form is invalid, return and let AngularJS show validation errors.
      if (!$scope.profileForm.name.$valid) {
        return;
      }

      profile.myVetSaveName($scope.user)
        .then(function (user){
          console.log(user);
          $scope.okName = true;
        }, function(error){
          $scope.errorSubmitted = true;
          $scope.user.errorMessage = error.message;
        });

    }


    $scope.okPassword = false;
    $scope.submittedPassword = false;

    $scope.savePassword = function () {

      $scope.submittedPassword = true

      // If form is invalid, return and let AngularJS show validation errors.
      if ($scope.passwordForm.password.$valid) {
        return;
      }

      profile.myVetSavePassword($scope.user)
        .then(function (user){
          console.log(user);
          $scope.okPassword = true;
        }, function(error){
          $scope.errorSubmitted = true;
          $scope.user.errorMessage = error.message;
        });

    }

  });
