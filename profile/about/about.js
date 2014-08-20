'use strict';

angular.module('ngCmApp.profile.about', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('profile.about', {
        url         : '/about',
        templateUrl : '/profile/about/about.tpl.html'
      });
  });
