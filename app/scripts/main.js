'use strict';

// 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router'
angular.module('ngVet', [

  // Vendor modules.
  'ui.router',
  'ngAnimate',
  'ui.bootstrap',

  // Principal submodules.
  'ngVet.common',

  // Sections
  'ngVet.home',
  'ngVet.notification',
  'ngVet.pet',
  'ngVet.login',
  'ngVet.profile'
])

  // Module configuration.
  .config(function ($urlRouterProvider, $sceDelegateProvider, $locationProvider) {

    // use #! in the url.
    $locationProvider.hashPrefix('!');

    // Default application's url.
    $urlRouterProvider.otherwise('/');

    // Allow assets from local and external sources
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self'
    ]);

  })

  .run(function( $rootScope) {

    // temp


    // $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
    $rootScope.$on('$stateChangeSuccess',function(event, toState){

      // check for child states
      if (toState.name.match(/\./g)) {
        // get root state
        $rootScope.activePage = toState.name.split('.')[0];
      } else {
        $rootScope.activePage = toState.name;
      }

    });

  });
