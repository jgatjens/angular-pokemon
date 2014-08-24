'use strict';

angular.module('ngVet.pet.list', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('pets.list', {
        url         : '/list',
        controller  : 'ListPetCtrl',
        templateUrl : 'pages/pet/list/list.tpl.html'
      });
  })

  // List pet controller.
  .controller('ListPetCtrl', function ($scope) {

    $scope.pets = [
      {
        'name': 'lu',
        'weigth': '15 kg',
        'logo': '01.jpg'
      },
      {
        'name': 'luke',
        'weigth': '32 kg',
        'logo': '02.jpg'
      },
       {
        'name': 'tequila',
        'weigth': '3 kg',
        'logo': '02.jpg'
      },
      {
        'name': 'toby',
        'weigth': '40 kg',
        'logo': '01.jpg'
      }
    ];

    angular.forEach($scope.pets, function(pet) {
      pet.rank = Math.random();
    });

  });
