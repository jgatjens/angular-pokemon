'use strict';

angular.module('ngVet.pet.record', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('pets.record', {
        url         : '/record',
        // controller  : 'RecordPetCtrl',
        authenticate: true,
        templateUrl : 'pages/pet/record/record.tpl.html'
      });
  });

  // record pet controller.
  // .controller('RecordPetCtrl', function ($scope) {

  // });
