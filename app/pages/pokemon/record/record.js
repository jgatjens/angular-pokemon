'use strict';

angular.module('ngApp.pokemon.record', ['ngApp.pokemon.record.edit'])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('newRecord', {
        url: '/record/:id',
        params: {
          id: { value: null }
        },
        controller  : 'RecordCtrl',
        authenticate: true,
        templateUrl : 'pages/pokemon/record/record.tpl.html',
        resolve: {
          pokemonList: function (Pokemon) {
            return Pokemon.list().then(function(pokemons) {
              return pokemons;
            });
          }
        }
      });
  })

  // Record controller.
  .controller('RecordCtrl', function ($scope, $state, pokemonList, Profile, Record) {

    var id = Profile.getCurrentPokemonId();
    var currentPokemon, i = 0;

    $scope.warningNoPokemon = false;
    $scope.okRequest = false;
    $scope.errorSubmitted = false;
    $scope.submitted = false;

    // No Pokemons
    if (pokemonList.length === 0 ) {
      $scope.warningNoPokemon = true
    }

    angular.forEach(pokemonList, function(pokemon) {

      if ($state.params.id) {
        if (pokemon.objectId === $state.params.id) {
          currentPokemon = i;
        }
      } else {
        if (pokemon.objectId === id) {
          currentPokemon = i;
        }
      }

      i++;
    });

    $scope.record = {
      pokemon: pokemonList[currentPokemon],
      title: undefined,
      weight: undefined,
      comment: undefined,
      pokemonList: pokemonList,
      temperature: undefined
    }

    $scope.submit = function (){

      $scope.okRequest = false;
      $scope.submitted = true;
      $scope.errorSubmitted = false;

      // If form is invalid, return and let AngularJS show validation errors.
      if ($scope.recordForm.$invalid) {
        return;
      }

      Record.create($scope.record)
        .then(function (pokemon) {

          swal({
            title: "You just created a new record",
            text: "Do you want to add more?",
            type: "success",
            confirmButtonText: 'Create another',
            cancelButtonText: 'Continue',
            showCancelButton: true
          },
          function(isConfirm) {

            if (isConfirm) {

              $scope.record = {
                pokemon: pokemonList[currentPokemon],
                title: undefined,
                weight: undefined,
                comment: undefined,
                pokemonList: pokemonList,
                temperature: undefined
              }

              $scope.errorSubmitted = false;
              $scope.submitted = false;

            } else {
              $state.go('home');
            }

          });

        }, function (error){
          $scope.errorSubmitted = true;
          $scope.user.errorMessage = error.message;
        });


    }

  });
