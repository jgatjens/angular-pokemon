'use strict';

// directive match inputs values
// ej: password and confirmPaassword

angular.module('ngApp.common.directives.match', [])
  // nav directive.
  .directive('passwordMatch', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      scope: {
          match: '='
      },
      link: function(scope, elem, attrs, ctrl) {
          scope.$watch(function() {
              var modelValue = ctrl.$modelValue || ctrl.$$invalidModelValue;

              console.log(modelValue, scope.match);
              console.log(scope.match === modelValue);

              return (ctrl.$pristine && angular.isUndefined(modelValue)) || scope.match === modelValue;
          }, function(currentValue) {
              ctrl.$setValidity('match', currentValue);
          });
      }
    };
  });
