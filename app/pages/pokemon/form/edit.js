'use strict';

angular.module('ngApp.pokemon.form.edit', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('pokemonEdit', {
        url         : '/pokemon/edit/:id',
        controller  : 'PokemonEditCtrl',
        authenticate: true,
        templateUrl : 'pages/pokemon/form/form.tpl.html',
        resolve: {
          pokemon: function (Pokemon, $stateParams) {
            var id = $stateParams.id;
            return Pokemon.getById(id);
          }
        }
      });
  })

  // new pokemon controller.
  .controller('PokemonEditCtrl', function ($scope, FileReader, Pokemon, pokemon) {

    if (pokemon.picture) pokemon.picture = pokemon.picture._url;

    $scope.edit = true;
    $scope.pokemon = angular.copy(pokemon);

    $scope.okRequest = false;
    $scope.errorSubmitted = false;
    $scope.submitted = false;

    // Food Brand Arrays
    $scope.brands = Pokemon.getBrands();

    // Datapicker
    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    // Pokemons type
    $scope.types = Pokemon.getTypes();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.readFile = function () {
      FileReader.readAsDataUrl($scope.pokemon.file, $scope)
        .then(function(result) {
          $scope.pokemon.picture = result;
        });
    };

    $scope.clickInputFile = function () {
      var fileInput = document.querySelector('#fileinput');
      fileinput.click();
    }

    $scope.submit = function () {

      $scope.okRequest = false;
      $scope.submitted = true;
      $scope.errorSubmitted = false;

      // If form is invalid, return and let AngularJS show validation errors.
      if ($scope.pokemonForm.$invalid) {
        return;
      }

      Pokemon.save($scope.pokemon)
        .then(function (result) {
            if (result){
              $scope.okRequest = true;
              $scope.pokemon.picture = result.pokemon.get('picture')._url;
            }
          },
          function (error) {
            $scope.errorSubmitted = true;
            $scope.user.errorMessage = error.message;
          }
        );
    }

  });
