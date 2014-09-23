'use strict';

angular.module('ngVet.profile.login', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('login', {
        url         : '/login?errorCode',
        controller  : 'LoginCtrl',
        templateUrl : 'pages/profile/login/login.tpl.html'
      });
  })

  // Login controller.
  .controller('LoginCtrl', function ($rootScope, $scope, $state, profile) {

    $scope.user = {};
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


      profile.myVetLogin($scope.user.username, $scope.user.password)
        .then(function (user) {


          // Verified email
          if (!profile.isEmailVerified()) {
            $scope.confirmEmail = true;
            return;
          }

          // $rootScope.profile = user;
          $state.go('home');

        }, function(error){
          $scope.errorSubmitted = true;
          $scope.user.errorMessage = error.message;
          // console.log(error);
        });

    }

  });


