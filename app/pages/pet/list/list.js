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
          data: function (Pet) {
            return Pet.list().then(function(pets) {
              return pets;
            });
          }
        }
      });
  })

  // List pet controller.
  .controller('ListPetCtrl', function ($scope, data) {

    console.log(data);

    $scope.pets = data;

    //   {
    //     'name': 'Lu',
    //     'weigth': '15 kg',
    //     'logo': '01.jpg'
    //   },


    angular.forEach($scope.pets, function(pet) {
      pet.rank = Math.random();
    });

  });
