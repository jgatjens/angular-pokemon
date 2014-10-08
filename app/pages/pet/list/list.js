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
  .controller('ListPetCtrl', function ($scope, json) {

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
    //   {
    //     'name': 'Lu',
    //     'weigth': '15 kg',
    //     'logo': '01.jpg'
    //   },


    angular.forEach($scope.pets, function(pet) {
      pet.rank = Math.random();
    });

  });
