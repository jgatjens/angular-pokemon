'use strict';

angular.module('ngVet.common.directives.header', [ ])
  // header directive.
  .directive('ngVetHeader', function () {
    return {
      restrict    : 'EA',
      replace     : true,
      transclude: true,
      templateUrl : 'common/directives/header/header.tpl.html'
    }
  });
  // .controller('headerCtrl', function ($scope) {


  // });
