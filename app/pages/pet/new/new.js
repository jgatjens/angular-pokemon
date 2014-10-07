'use strict';

angular.module('ngVet.pet.new', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('pets.new', {
        url         : '/new',
        controller  : 'NewPetCtrl',
        controllerAs: 'newPet',
        authenticate: true,
        templateUrl : 'pages/pet/new/new.tpl.html'
      });
  })

  // new pet controller.
  .controller('NewPetCtrl', function ($scope, Pet) {

    $scope.pet = {
      name: undefined,
      brand: undefined,
      type: undefined,
      weigth: undefined,
      birthday: undefined,
      gender: undefined,
      pedigree: false,
      crossdog: false,
      onsale: false,
      description: ''
    }



    // $scope.okRequest = false;
    $scope.errorSubmitted = false;
    $scope.submitted = false;

    // Food Brand Arrays
    $scope.brands = ['Addiction Foods', 'Pro pet', 'Alpo', 'Artemis', 'AvoDerm', 'Beggin Strips', 'Beneful', 'Bonio', 'By Nature', 'Dog Chow', 'Essential Foods', 'Eukanuba', 'Freshpet', 'Friskies', 'Frosty Paws', 'Gaines-Burgers', 'The Goodlife Recipe', 'Gravy Train', 'Happidog', 'Hills Pet Nutrition', 'The Honest Kitchen', 'Iams', 'Kal Kan', 'Ken-L Ration', 'Kennomeat', 'Kibbles n Bits', 'Milk-Bone', 'Natural Balance Pet Foods', 'Natures Variety', 'Nestlé Purina PetCare', 'Ralston Purina', 'Nutro Products', 'Ol Roy', 'Pedigree Petfoods', 'Purina ONE', 'Royal Canin', 'Science Diet', 'Solid Gold', 'Vegepet', 'WellPet', 'Winalot'];

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

    // Pets type
    $scope.types = ['Dogs', 'Cats', 'Fish', 'Small Pets', 'Box Turtles', 'Ferrets', 'Cute Pet', 'Rabbits', 'Parrots', 'Guinea Pigs', 'Reptile Pets', 'Green Iguanas', 'House Pets', 'Birds']

    $scope.createPet = function () {

      $scope.okRequest = false;
      $scope.submitted = true;
      $scope.errorSubmitted = false;

      // If form is invalid, return and let AngularJS show validation errors.
      if ($scope.newPetForm.$invalid) {
        return;
      }

      Pet.create($scope.pet)
        .then(function (pet) {
          // $scope.okRequest = true;
          swal({
            title: "You just created a new pet",
            text: "Do you want to add more?",
            type: "success",
            confirmButtonText: 'Create another',
            cancelButtonText: 'Continue',
            showCancelButton: true
          },
          function() {
            $scope.pet = {};
            $scope.errorSubmitted = false;
            $scope.submitted = false;
            $scope.$apply();
          });

        }, function (error){
          $scope.errorSubmitted = true;
          $scope.user.errorMessage = error.message;
        });

    }

  });

