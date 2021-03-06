'use strict';

angular.module('ngApp.common.directives.footer', [])
  // footer directive.
  .directive('ngAppFooter', function () {
    return {
      restrict    : 'EA',
      replace     : true,
      controller  : 'FooterCtrl',
      templateUrl : 'common/directives/footer/footer.tpl.html'
    }
  })

  .controller('FooterCtrl', function ($scope, $window) {

    $scope.openTwitter = function(e) {
      // e.preventDefault();
      $window.open('https://twitter.com/jgatjens');
    }

  });
