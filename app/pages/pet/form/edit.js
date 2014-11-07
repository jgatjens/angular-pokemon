'use strict';

angular.module('ngVet.pet.edit', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('pets.edit', {
        url         : '/edit/:id',
        controller  : 'EditPetCtrl',
        authenticate: true,
        templateUrl : 'pages/pet/form/form.tpl.html',
        resolve: {
          petObj: function (Pet, $stateParams) {
            var id = $stateParams.id;
            return Pet.getById(id);
          }
        }
      });
  })

  // new pet controller.
  .controller('EditPetCtrl', function ($scope, Pet, petObj) {

    $scope.edit = true;
    $scope.pet = petObj;

    $scope.okRequest = false;
    $scope.errorSubmitted = false;
    $scope.submitted = false;

    // Food Brand Arrays
    $scope.brands = Pet.getBrands();

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
    $scope.types = Pet.getTypes();

    $scope.editPet = function () {

      $scope.okRequest = false;
      $scope.submitted = true;
      $scope.errorSubmitted = false;

      // If form is invalid, return and let AngularJS show validation errors.
      if ($scope.petForm.$invalid) {
        return;
      }

      Pet.save(petObj)
        .then(function (pet) {
          $scope.okRequest = true;

        }, function (error){
          $scope.errorSubmitted = true;
          $scope.user.errorMessage = error.message;
        });

    }

  });
