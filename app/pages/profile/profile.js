'use strict';

angular.module('ngVet.profile', [ 'ngVet.profile.about', 'ngVet.profile.links' ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('profile', {
        url         : '/profile',
        controller  : 'ProfileCtrl',
        templateUrl : 'pages/profile/profile.tpl.html'
      });
  })

  // Profile controller.
  .controller('ProfileCtrl', function ($scope) {
    $scope.setTab = function (tab) {
      $scope.activeTab = tab;
    };
  });
