'use strict';

angular.module('ngVet.notification.detail', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('notificationDetail', {
        url         : '/notification/detail/{id}',
        controller  : 'NotificationDetailCtrl',
        authenticate: true,
        templateUrl : 'pages/notification/detail/detail.tpl.html'
      });
  })

    // notification controller.
  .controller('NotificationDetailCtrl', function ($scope) {


    $scope.note = {
      'title': 'Some title Pokemon',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.',
      'checked': true,
      'logo': 'angular.png'
    }


  });
