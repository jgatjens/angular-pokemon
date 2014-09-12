'use strict';

angular.module('ngVet.common.factories.store', ['ngVet.config'])

  .factory('store', function ($http, API_END_POINT, HOST) {

    return function (sectionName, local) {

      // make a mistake on porporse to fallback to load data from json /assets/json/**
      // var sectionUrl = HOST + API_END_POINT + sectionName;

      // basic configuracion
      var sectionUrl = HOST + API_END_POINT + sectionName + '/';

      var Resource = function (data) {
        angular.extend(this, data);
      };

      Resource.query = function (params) {

        return $http.get(sectionUrl, { cache: false })
                  .then(function (response) {
                    var result = [];
                    angular.forEach(response.data, function (value, key) {
                      result[key] = new Resource(value);
                    });

                    return result;
                  });
      };

      // ---
      // PRIVATE METHODS.
      // ---

      // function handleError( response ) {
      //   // The API response from the server should be returned in a
      //   // nomralized format. However, if the request was not handled by the
      //   // server (or what not handles properly - ex. server error), then we
      //   // may have to normalize it on our end, as best we can.
      //   if (
      //       ! angular.isObject( response.data ) ||
      //       ! response.message
      //       ) {

      //     return( $q.reject( 'An unknown error occurred.' ) );

      //   }

      //   // Otherwise, use expected error message.
      //   return( $q.reject( response.message ) );

      // }

      // // I transform the successful response, unwrapping the application data
      // // from the API response payload.
      // function handleSuccess( response ) {

      //   return( response.data );

      // }

      return Resource;

    };

  });
