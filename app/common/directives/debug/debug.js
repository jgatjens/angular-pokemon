'use strict';

angular.module('ngVet.common.directives.debug', [ ])

  // Debug directive.
  .directive('debug', function () {
    return {
      restrict    : 'E',
      scope       : {
        data : '='
      },
      templateUrl : 'common/directives/debug/debug.tpl.html',
      link        : function (scope, element, attrs) {
        scope.title = attrs.data;
      }
    };
  });
