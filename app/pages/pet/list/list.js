'use strict';

angular.module('ngVet.pet.list', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('pets.list', {
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
  .controller('ListPetCtrl', function ($scope, json, $filter, Pet) {

    // console.log(data);
    $scope.colmd = 4;
    $scope.colsm = 6;
    $scope.pets = json;

    if (json.length == 1) {
       $scope.colmd = 6;
       $scope.colsm = 8;
    } else if (json.length <= 3 ) {
      $scope.colmd = 12 / json.length;
      $scope.colsm = 12 / (json.length);
    }


    $scope.edit = function (pet) {

    }

    $scope.remove = function (pet) {

      swal({
        title: "Delete Pet",
        text: "Are you sure you want to delete this pet and all the content relate to it?",
        type: "warning",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: 'Cancel',
        showCancelButton: true
      },
      function() {
        console.log('Delete pet id: ', pet.objectId);

        Pet.remove(pet.objectId).then(function () {
          var index = $scope.pets.indexOf(pet);
          $scope.pets.splice(index, 1);
          $scope.$apply();
        }, function (error){
          swal({
            title: "Something went wrong",
            type: "error"
          })
        });

      });

    }

    angular.forEach($scope.pets, function(pet) {
      pet.rank = Math.random();
    });

  });
