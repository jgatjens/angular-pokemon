'use strict';

angular.module('ngVet.common.directives.nav', [ ])
  // nav directive.
  .directive('ngVetNav', function () {
    return {
      restrict    : 'EA',
      replace     : true,
      templateUrl : 'common/directives/nav/nav.tpl.html'
    }
  })
  .controller('navCtrl', function ($scope, Profile) {

    var profile = new Profile();
    $scope.logout = function () {
      // $rootScope.isLogin = false;
      Profile.myVetLogout();

    };

  });
