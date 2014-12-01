'use strict';

angular.module('ngApp.common.directives.links', [ ])

  // Debug directive.
  .directive('formLinks', function () {
    return {
      restrict     : 'A',
      templateUrl  : 'common/directives/links/links.tpl.html',
      controllerAs   : function ($scope, $state) {

        $scope.regiter = ($state.current.name === 'register');
        $scope.login = ($state.current.name === 'login');
        $scope.emailVerification = ($state.current.name === 'emailVerification');

      }
    }
  });
