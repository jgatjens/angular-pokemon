'use strict';

angular.module('ngApp.pokemon.list', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('pokemonList', {
        url         : '/list',
        controller  : 'PokemonListCtrl',
        authenticate: true,
        templateUrl : 'pages/pokemon/list/list.tpl.html',
        resolve: {
          json: function (Pokemon) {
            return Pokemon.list().then(function(pokemons) {
              return pokemons;
            });
          }
        }
      });
  })

  // List pokemon controller.
  .controller('PokemonListCtrl', function ($scope, $rootScope, json, $filter, Pokemon, Profile) {

    // console.log(data);
    $scope.activePokemon = $rootScope.user.currentPokemon;
    $scope.pokemons = json;
    // $scope.colmd = 4;
    // $scope.colsm = 6;

    // if (json.length == 1) {
    //    $scope.colmd = 6;
    //    $scope.colsm = 8;
    // } else if (json.length <= 3 ) {
    //   $scope.colmd = 12 / json.length;
    //   $scope.colsm = 12 / (json.length);
    // }

    $scope.active = function (pokemon) {

      Profile.saveCurrentPokemon(pokemon.objectId).then(function () {
        $scope.activePokemon = pokemon.objectId;
      });

    }

    $scope.remove = function (pokemon) {

      swal({
        title: "Delete Pokemon",
        text: "Are you sure you want to delete this pokemon and all the content relate to it?",
        type: "warning",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel plx!",
        showCancelButton: true,
        closeOnConfirm: false,
        closeOnCancel: false
      },
      function(isConfirm) {
        console.log('Delete pokemon id: ', pokemon.objectId);

        if (isConfirm) {
            Pokemon.remove(pokemon.objectId).then(function () {
              var index = $scope.pokemons.indexOf(pokemon);
              $scope.pokemons.splice(index, 1);
              // $scope.$apply();

              swal("Deleted!", "Your pokemon has been deleted.", "success");

            }, function (error){
              swal({
                title: "Something went wrong",
                type: "error"
              })
            });
        } else {
            swal("Cancelled", "Your imaginary pokemon is safe :)", "error");
        }


      });

    }


  });
