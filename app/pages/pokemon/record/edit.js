'use strict';

angular.module('ngApp.pokemon.record.edit', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('pokemonRecord', {
        url: '/record/edit/:id',
        params: {
          id: { value: null }
        },
        controller  : 'RecordEditCtrl',
        authenticate: true,
        templateUrl : 'pages/pokemon/record/record.tpl.html',
        resolve: {
          record: function (Record) {
            return Record.getById().then(function(record) {
              return record;
            });
          }
        }
      });
  })

  // Record controller.
  .controller('RecordEditCtrl', function ($scope, $state, record, Profile, Record) {

    $scope.okRequest = false;
    $scope.errorSubmitted = false;
    $scope.submitted = false;

    // No Pokemons
    // if (pokemonList.length === 0 ) {
    //   $scope.warningNoPokemon = true
    // }

    // angular.forEach(pokemonList, function(pokemon) {

    //   if ($state.params.id) {
    //     if (pokemon.objectId === $state.params.id) {
    //       currentPokemon = i;
    //     }
    //   } else {
    //     if (pokemon.objectId === id) {
    //       currentPokemon = i;
    //     }
    //   }

    //   i++;
    // });
    $scope.edit = true;
    $scope.record = angular.copy(record);

    $scope.submit = function (){

      $scope.okRequest = false;
      $scope.submitted = true;
      $scope.errorSubmitted = false;

      // If form is invalid, return and let AngularJS show validation errors.
      if ($scope.recordForm.$invalid) {
        return;
      }

      Record.save($scope.record)
        .then(function (pokemon) {

            $scope.errorSubmitted = false;
            $scope.submitted = false;

            setTimeout(function () {
              $state.go('home');
            }, 500);

        }, function (error){
          $scope.errorSubmitted = true;
          $scope.user.errorMessage = error.message;
        });
    }

  });
