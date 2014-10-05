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
    $scope.pet.brand = undefined;


    $scope.okRequest = false;
    $scope.errorSubmitted = false;
    $scope.submitted = false;

    // Food Brand Arrays
    $scope.selected = undefined;
    $scope.brands = ['Propet', 'Eukanuba', 'super perro', 'chaw chaw', 'prodog', 'procat', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

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

