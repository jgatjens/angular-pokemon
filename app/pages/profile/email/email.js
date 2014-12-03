'use strict';

angular.module('ngApp.profile.email', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('emailVerification', {
        url         : '/reset/email',
        controller  : 'EmailCtrl',
        templateUrl : 'pages/profile/email/email.tpl.html'
      });
  })

  // password controller.
  .controller('EmailCtrl', function ($rootScope, $scope, $state, Profile) {

    $scope.user = {};
    $scope.okRequest = false;
    $scope.errorSubmitted = false;
    $scope.submitted = false;

    $scope.resendEmailVerification = function () {

      $scope.okRequest = false;
      $scope.submitted = true;
      $scope.errorSubmitted = false;

      // If form is invalid, return and let AngularJS show validation errors.
      if ($scope.emailForm.$invalid) {
        return;
      }


      // search by username !
      Profile.getByUsername($scope.user.username)
        .then(function (user) {

            // if we get a valid user
            if (!user.error) {

            // get email and save to trigger a new email verification
             Profile.saveEmail(user)
              .then(function (user) {

                $scope.okRequest = true;

              }, function (error){
                $scope.errorSubmitted = true;
                $scope.user.errorMessage = error.message;
              });

            } else {
              $scope.errorSubmitted = true;
              $scope.user.errorMessage = user.message;
            }

          }, function (error){
            $scope.errorSubmitted = true;
            $scope.user.errorMessage = error.message;
          });


    }

  });


