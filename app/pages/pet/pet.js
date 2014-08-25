'use strict';

angular.module('ngVet.pet', ['ngVet.pet.list','ngVet.pet.new', 'ngVet.pet.record'])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('pets', {
        url         : '/pets',
        controller  : 'PetCtrl',
        templateUrl : 'pages/pet/pet.tpl.html'
      });
  })

  // pet controller.
  .controller('PetCtrl', function ($state) {

  });

