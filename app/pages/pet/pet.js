'use strict';

angular.module('ngVet.pet', ['ngVet.pet.list','ngVet.pet.new', 'ngVet.pet.edit', 'ngVet.pet.record'])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('pets', {
        url         : '/pokemon',
        controller  : 'PetCtrl',
        authenticate: true,
        templateUrl : 'pages/pet/pet.tpl.html'
      });
  })

  // pet controller.
  .controller('PetCtrl', function ($state) {

  });


