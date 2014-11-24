'use strict';

angular.module('ngApp.pokemon.record.edit', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('editRecord', {
        url: '/record/edit/:id',
        params: {
          id: { value: null }
        },
        controller  : 'EditRecordCtrl',
        authenticate: true,
        templateUrl : 'pages/pokemon/record/record.tpl.html',
        resolve: {
          pokemonList: function (Pokemon) {
            return Pokemon.list().then(function(pokemons) {
              return pokemons;
            });
          },
          record: function (Record,  $stateParams) {
            var id =  $stateParams.id;
            return Record.getById(id).then(function(record) {
              return record;
            });
          }
        }
      });
  })

  // Record controller.
  .controller('EditRecordCtrl', function ($scope, $state, Profile, Record, pokemonList, record) {

    $scope.okRequest = false;
    $scope.errorSubmitted = false;
    $scope.submitted = false;
    var currentPokemon, i = 0;

    // No Pokemons
    if (pokemonList.length === 0 ) {
      $scope.warningNoPokemon = true
    }

    angular.forEach(pokemonList, function(pokemon) {

      if (pokemon.objectId === record.pokemon.objectId) {
        currentPokemon = i;
      }

      i++;
    });

    $scope.edit = true;
    $scope.record = angular.copy(record);
    $scope.record.pokemon = pokemonList[currentPokemon];
    $scope.record.pokemonList = pokemonList;

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
            }, 1000);

        }, function (error){
          $scope.errorSubmitted = true;
          $scope.user.errorMessage = error.message;
        });
    }

  });
