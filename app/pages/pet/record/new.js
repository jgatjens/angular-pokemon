'use strict';

angular.module('ngVet.pet.record', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('pets.record', {
        url         : '/record/:id',
        params: {
          id: { value: null }
        },
        controller  : 'RecordCtrl',
        authenticate: true,
        templateUrl : 'pages/pet/record/record.tpl.html',
        resolve: {
          petList: function (Pet) {
            return Pet.list().then(function(pets) {
              return pets;
            });
          }
        }
      });
  })

  // Record controller.
  .controller('RecordCtrl', function ($scope, $state, petList, Profile, Record) {

    var id = Profile.getCurrentPetId();
    var currentPet, i = 0;

    $scope.okRequest = false;
    $scope.errorSubmitted = false;
    $scope.submitted = false;

    angular.forEach(petList, function(pet) {

      if ($state.params.id) {
        if (pet.objectId === $state.params.id) {
          currentPet = i;
        }
      } else {
        if (pet.objectId === id) {
          currentPet = i;
        }
      }

      i++;
    });

    $scope.record = {
      pet: petList[currentPet],
      title: undefined,
      weight: undefined,
      comment: undefined,
      petList: petList,
      temperature: undefined
    }

    $scope.createRecord = function (){

      $scope.okRequest = false;
      $scope.submitted = true;
      $scope.errorSubmitted = false;

      // If form is invalid, return and let AngularJS show validation errors.
      if ($scope.recordForm.$invalid) {
        return;
      }

      Record.create($scope.record)
        .then(function (pet) {

          swal({
            title: "You just created a new record",
            text: "Do you want to add more?",
            type: "success",
            confirmButtonText: 'Create another',
            cancelButtonText: 'Continue',
            showCancelButton: true
          },
          function(isConfirm) {

            if (isConfirm) {

              $scope.record = {
                pet: petList[currentPet],
                title: undefined,
                weight: undefined,
                comment: undefined,
                petList: petList,
                temperature: undefined
              }

              $scope.errorSubmitted = false;
              $scope.submitted = false;

            } else {
              $state.go('home')
            }

          });

        }, function (error){
          $scope.errorSubmitted = true;
          $scope.user.errorMessage = error.message;
        });


    }

  });
