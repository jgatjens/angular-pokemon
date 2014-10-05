'use strict';

// directive match inputs values
// ej: password and confirmPaassword

angular.module('ngVet.common.directives.match', [])
  // nav directive.
  .directive('ngVetMatch', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      scope: {
          match: '='
      },
      link: function(scope, elem, attrs, ctrl) {
          scope.$watch(function() {
              var modelValue = ctrl.$modelValue || ctrl.$$invalidModelValue;
              return (ctrl.$pristine && angular.isUndefined(modelValue)) || scope.match === modelValue;
          }, function(currentValue) {
              ctrl.$setValidity('match', currentValue);
          });
      }
    };
  });
