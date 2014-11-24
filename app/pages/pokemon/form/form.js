'use strict';

angular.module('ngApp.pokemon.form', ['ngApp.pokemon.form.edit'])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider

      // state for new entrys
      .state('pokemonNew', {
        url         : '/new',
        controller  : 'FormNewCtrl',
        authenticate: true,
        templateUrl : 'pages/pokemon/form/form.tpl.html'
      })
  })

  // new pokemon controller.
  .controller('FormNewCtrl', function ($scope, $state, FileReader, Pokemon) {

    $scope.pokemon = {
      name: undefined,
      brand: undefined,
      type: undefined,
      picture: undefined,
      file: undefined,
      weigth: undefined,
      birthday: undefined,
      gender: undefined,
      pedigree: false,
      crossdog: false,
      onsale: false,
      description: ''
    }

    $scope.okRequest = false;
    $scope.errorSubmitted = false;
    $scope.submitted = false;

    // Food Brand Arrays
    $scope.brands = Pokemon.getBrands()

    // Datapicker
    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    // Pokemons type
    $scope.types = Pokemon.getTypes()

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

      Pokemon.create($scope.pokemon)
        .then(function (pokemon) {
          // $scope.okRequest = true;
          swal({
            title: "You just created a new pokemon",
            text: "Do you want to add more?",
            type: "success",
            confirmButtonText: 'Create another',
            cancelButtonText: 'Continue',
            showCancelButton: true
          },
          function(isConfirm) {

            if (isConfirm) {
              $scope.pokemon = {};
              $scope.errorSubmitted = false;
              $scope.submitted = false;
            } else {
              $state.go('pokemonList');
            }

          });

        }, function (error){
          $scope.errorSubmitted = true;
          $scope.user.errorMessage = error.message;
        });

    }

  });
