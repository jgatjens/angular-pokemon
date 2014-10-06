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
  .controller('navCtrl', function ($scope, Profile) {

    $scope.logout = function () {

      // swal({
      //   title: "Are you sure you want to logout ?",
      //   type: "info",
      //   confirmButtonText: 'Logout',
      //   showCancelButton: true
      // },
      // function() {
      //   Profile.logout();
      // });

      Profile.logout();

    };

  });


