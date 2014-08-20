'use strict';

angular.module('ngVet.profile.links', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('profile.links', {
        url         : '/links',
        controller  : 'LinksCtrl',
        templateUrl : 'pages/profile/links/links.tpl.html'
      });
  })

  // Links controller.
  .controller('LinksCtrl', function ($scope) {

    $scope.links = [{
      name : 'AngularJS',
      url  : 'http://angularjs.org'
    }, {
      name : 'ui-router',
      url  : 'https://github.com/angular-ui/ui-router'
    }];
  });
