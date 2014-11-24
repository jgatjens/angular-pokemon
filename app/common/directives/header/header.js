'use strict';

angular.module('ngApp.common.directives.header', [ ])
  // header directive.
  .directive('ngAppHeader', function () {
    return {
      restrict    : 'EA',
      replace     : true,
      transclude  : true,
      controller  : 'HeaderCtrl',
      templateUrl : 'common/directives/header/header.tpl.html'
    }
  })

  .controller('HeaderCtrl', function ($rootScope) {

    var body = document.body,
        menu = document.getElementById('cbp-spmenu');

    $rootScope.toggleMenu = function () {
      $(document.body).toggleClass('cbp-spmenu-push-toright')
      $('#cbp-spmenu').toggleClass('cbp-spmenu-open');
    }




  });
