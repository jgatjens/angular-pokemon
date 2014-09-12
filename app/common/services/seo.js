'use strict';

angular.module('ngVet.common.services.seo', [ ])

  // Seo Services.
  .service('PageSeo', function ($rootScope) {

    return {
      update: function (data) {
        $rootScope.seo = data;
      }
    }
  });
