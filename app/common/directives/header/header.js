'use strict';

angular.module('ngApp.common.directives.header', [ ])
  // header directive.
  .directive('ngAppHeader', function () {
    return {
      restrict    : 'EA',
      replace     : true,
      transclude  : true,
      templateUrl : 'common/directives/header/header.tpl.html'
    }
  });
  // .controller('headerCtrl', function ($scope) {


  // });
