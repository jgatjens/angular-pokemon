'use strict';

angular.module('ngVet.pet.list', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('petsList', {
        url         : '/list',
        controller  : 'ListPetCtrl',
        authenticate: true,
        templateUrl : 'pages/pet/list/list.tpl.html',
        resolve: {
          json: function (Pet) {
            return Pet.list().then(function(pets) {
              return pets;
            });
          }
        }
      });
  })

  // List pet controller.
  .controller('ListPetCtrl', function ($scope, $rootScope, json, $filter, Pet, Profile) {

    // console.log(data);
    $scope.activePet = $rootScope.user.currentPet;
    $scope.pets = json;
    // $scope.colmd = 4;
    // $scope.colsm = 6;

    // if (json.length == 1) {
    //    $scope.colmd = 6;
    //    $scope.colsm = 8;
    // } else if (json.length <= 3 ) {
    //   $scope.colmd = 12 / json.length;
    //   $scope.colsm = 12 / (json.length);
    // }

    $scope.edit = function (pet) {

    }

    $scope.active = function (pet) {

      Profile.saveCurrentPet(pet.objectId).then(function () {
        $scope.activePet = pet.objectId;
      });

    }

    $scope.remove = function (pet) {

      swal({
        title: "Delete Pet",
        text: "Are you sure you want to delete this pet and all the content relate to it?",
        type: "warning",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel plx!",
        showCancelButton: true,
        closeOnConfirm: false,
        closeOnCancel: false
      },
      function(isConfirm) {
        console.log('Delete pet id: ', pet.objectId);

        if (isConfirm) {
            Pet.remove(pet.objectId).then(function () {
              var index = $scope.pets.indexOf(pet);
              $scope.pets.splice(index, 1);
              // $scope.$apply();

              swal("Deleted!", "Your pokemon has been deleted.", "success");

            }, function (error){
              swal({
                title: "Something went wrong",
                type: "error"
              })
            });
        } else {
            swal("Cancelled", "Your imaginary pokemon is safe :)", "error");
        }


      });

    }

    // angular.forEach($scope.pets, function(pet) {
    //   pet.rank = Math.random();
    // });

  });
