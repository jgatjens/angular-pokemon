'use strict';

angular.module('ngVet.pet.new', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('pets.new', {
        url         : '/new',
        controller  : 'NewPetCtrl',
        templateUrl : 'pages/pet/new/new.tpl.html'
      });
  })

  // new pet controller.
  .controller('NewPetCtrl', function ($scope) {

  });
