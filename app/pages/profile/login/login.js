'use strict';

angular.module('ngVet.login', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('login', {
        url         : '/login',
        controller  : 'LoginCtrl',
        templateUrl : 'pages/profile/login/login.tpl.html'
      });
  })

  // Login controller.
  .controller('loginCtrl', function ($rootScope) {

    $rootScope.isLogin = false;

  });


