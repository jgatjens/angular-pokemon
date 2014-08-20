'use strict';

angular.module('ngCmApp.profile', [ 'ngCmApp.profile.about', 'ngCmApp.profile.links' ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('profile', {
        url         : '/profile',
        controller  : 'ProfileCtrl',
        templateUrl : 'profile/profile.tpl.html'
      });
  })

  // Profile controller.
  .controller('ProfileCtrl', function ($scope) {
    $scope.setTab = function (tab) {
      $scope.activeTab = tab;
    };
  });
