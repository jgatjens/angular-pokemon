'use strict';

angular.module('ngVet.common.factories.httpInterceptors', [ ])
  .config(function ($httpProvider) {
    $httpProvider.responseInterceptors.push('retryInterceptor');
    // $httpProvider.responseInterceptors.push('retryInterceptor2');
  })

  // loads json files if server response with error
  .factory('retryInterceptor', function ($injector, $q, $window) {

    var errorCount = 0;

    return function (responsePromise ) {
      return responsePromise.then(null, function (errResponse){

        if (errResponse.errorCount < 5 && errResponse.status === 503 || errResponse.status === 0 || errResponse.status === 404) {

          // modificar por
          var parser = document.createElement('a');
          parser.href = errResponse.config.url;

          var jsonFile = parser.pathname.slice(1, parser.pathname.length).replace(/\//g,'.') + 'json';
          errResponse.config.url = window.location.pathname  + 'assets/json/' + jsonFile;

          errResponse.errorCount = errorCount++;

          return $injector.get('$http')(errResponse.config);

        } else if (errResponse.errorCount > 3) {
          alert('Server Error, please try again.');
          $window.history.back();
          setTimeout(function() {
            $window.location.reload();
          }, 1000);
        }

      });
    };

  });

