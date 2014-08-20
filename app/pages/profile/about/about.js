'use strict';

angular.module('ngVet.profile.about', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('profile.about', {
        url         : '/about',
        templateUrl : 'pages/profile/about/about.tpl.html'
      });
  });
