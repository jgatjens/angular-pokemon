'use strict';

angular.module('ngVet.common.directives.footer', [])
  // footer directive.
  .directive('ngVetFooter', function () {
    return {
      restrict    : 'EA',
      replace     : true,
      templateUrl : 'common/directives/footer/footer.tpl.html'
    }
  });
