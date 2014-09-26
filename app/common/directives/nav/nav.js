'use strict';

angular.module('ngVet.common.directives.nav', [ ])
  // nav directive.
  .directive('ngVetNav', function () {
    return {
      restrict    : 'EA',
      replace     : true,
      controller  : 'navCtrl',
      templateUrl : 'common/directives/nav/nav.tpl.html'
    }
  })
  .controller('navCtrl', function ($scope, profile) {

    $scope.logout = function () {
      profile.myVetLogout();
    };

  });
