'use strict';

angular.module('ngVet.notification', ['ngVet.notification.detail'])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('notification', {
        url         : '/notification',
        controller  : 'NotificationCtrl',
        authenticate: true,
        templateUrl : 'pages/notification/notification.tpl.html'
      });
  })

  // notification controller.
  .controller('NotificationCtrl', function ($scope) {

    $scope.notes = [
      {
        'id': '1408905260252',
        'title': 'Some title Pokemon',
        'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.',
        'checked': true,
        'logo': 'angular.png'
      },
      {
        'id': '1408905260252',
        'title': 'Acceso sCentro Pokemon',
        'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt. Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.',
        'checked': true,
        'logo': 'angular.png'
      },
      {
        'id': '1408905260252',
        'title': 'Centro Pokemon',
        'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet adipisicing elit, sed do eiusmod tempor incididunt.',
        'checked': false,
        'logo': 'angular.png'
      },
      {
        'id': '1408905260252',
        'title': 'Centro Pokemon',
        'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.',
        'checked': false,
        'logo': 'angular.png'
      },
      {
        'id': '1408905260252',
        'title': 'Acceso Centro Pokemon 2',
        'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.',
        'checked': true,
        'logo': 'angular.png'
      },
      {
        'id': '1408905260252',
        'title': 'Info Centro Pokemon',
        'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.',
        'checked': true,
        'logo': 'angular.png'
      },
      {
        'id': '1408905260252',
        'title': 'Centro Pokemon',
        'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.',
        'checked': false,
        'logo': 'angular.png'
      }
    ];

    angular.forEach($scope.notes, function(note) {
      note.rank = Math.random();
    });

  });


