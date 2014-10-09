'use strict';

angular.module('ngVet.pet.new', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider

      // state for new entrys
      .state('pets.new', {
        url         : '/new',
        controller  : 'NewPetCtrl',
        authenticate: true,
        templateUrl : 'pages/pet/form/form.tpl.html'
      })
  })

  // new pet controller.
  .controller('NewPetCtrl', function ($scope, Pet) {

    $scope.pet = {
      name: undefined,
      brand: undefined,
      type: undefined,
      weigth: undefined,
      birthday: undefined,
      gender: undefined,
      pedigree: false,
      crossdog: false,
      onsale: false,
      description: ''
    }

    $scope.okRequest = false;
    $scope.errorSubmitted = false;
    $scope.submitted = false;

    // Food Brand Arrays
    $scope.brands = Pet.getBrands()

    // Datapicker
    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    // Pets type
    $scope.types = Pet.getTypes()

    $scope.createPet = function () {

      $scope.okRequest = false;
      $scope.submitted = true;
      $scope.errorSubmitted = false;

      // If form is invalid, return and let AngularJS show validation errors.
      if ($scope.petForm.$invalid) {
        return;
      }

      Pet.create($scope.pet)
        .then(function (pet) {
          // $scope.okRequest = true;
          swal({
            title: "You just created a new pet",
            text: "Do you want to add more?",
            type: "success",
            confirmButtonText: 'Create another',
            cancelButtonText: 'Continue',
            showCancelButton: true
          },
          function() {
            $scope.pet = {};
            $scope.errorSubmitted = false;
            $scope.submitted = false;
            // $scope.$apply();
          });

        }, function (error){
          $scope.errorSubmitted = true;
          $scope.user.errorMessage = error.message;
        });

    }

  });
