'use strict';

angular.module('ngVet.pet.record', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('pets.record', {
        url         : '/record',
        controller  : 'RecordCtrl',
        authenticate: true,
        templateUrl : 'pages/pet/record/record.tpl.html'
      });
  })

  // Record controller.
  .controller('RecordCtrl', function ($scope) {

    $scope.record = {
      title: undefined,
      temperature: undefined
    }

  });
