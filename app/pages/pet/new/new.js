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
  .controller('NewPetCtrl', function ($scope) {

    $scope.pet = {};
    $scope.pet.brand = undefined;


    $scope.okRequest = false;
    $scope.errorSubmitted = false;
    $scope.submitted = false;

    // Food Brand Arrays
    $scope.selected = undefined;
    $scope.brands = ['Addiction Foods', 'Alpo', 'Artemis', 'AvoDerm', 'Beggin Strips', 'Beneful', 'Bonio', 'By Nature', 'Dog Chow', 'Essential Foods', 'Eukanuba', 'Freshpet', 'Friskies', 'Frosty Paws', 'Gaines-Burgers', 'The Goodlife Recipe', 'Gravy Train', 'Happidog', 'Hills Pet Nutrition', 'The Honest Kitchen', 'Iams', 'Kal Kan', 'Ken-L Ration', 'Kennomeat', 'Kibbles n Bits', 'Milk-Bone', 'Natural Balance Pet Foods', 'Natures Variety', 'Nestlé Purina PetCare', 'Ralston Purina', 'Nutro Products', 'Ol Roy', 'Pedigree Petfoods', 'Purina ONE', 'Royal Canin', 'Science Diet', 'Solid Gold (pet food)', 'Vegepet', 'WellPet', 'Winalot'];


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

    $scope.createPet = function () {

      $scope.okRequest = false;
      $scope.submitted = true;
      $scope.errorSubmitted = false;

      // If form is invalid, return and let AngularJS show validation errors.
      if ($scope.newPetForm.$invalid) {
        return;
      }

      // profile.myVetResetPassword($scope.user.email)
      //   .then(function (user) {

      //     $scope.okRequest = true;

      //   }, function (error){
      //     $scope.errorSubmitted = true;
      //     $scope.user.errorMessage = error.message;
      //   });

    }

  });

