'use strict';

angular.module('ngVet.pet.new', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('pets.new', {
        url         : '/new',
        controller  : 'NewPetCtrl',
        controllerAs: 'newPet',
        authenticate: true,
        templateUrl : 'pages/pet/new/new.tpl.html'
      });
  })

  // new pet controller.
  .controller('NewPetCtrl', function ($scope) {

    $scope.pet = {};
    $scope.okRequest = false;
    $scope.errorSubmitted = false;
    $scope.submitted = false;

    $scope.createPet = function () {

      $scope.okRequest = false;
      $scope.submitted = true;
      $scope.errorSubmitted = false;

      // If form is invalid, return and let AngularJS show validation errors.
      if ($scope.newPetForm.$invalid) {
        return;
      }

      // profile.myVetResetPassword($scope.user.email)
      //   .then(function (user) {

      //     $scope.okRequest = true;

      //   }, function (error){
      //     $scope.errorSubmitted = true;
      //     $scope.user.errorMessage = error.message;
      //   });

    }

  });

