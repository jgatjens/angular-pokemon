'use strict';

angular.module('ngVet.pet.record', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('pets.record', {
        url         : '/record',
        controller  : 'RecordCtrl',
        authenticate: true,
        templateUrl : 'pages/pet/record/record.tpl.html',
        resolve: {
          petList: function (Pet) {
            return Pet.list().then(function(pets) {
              return pets;
            });
          }
        }
      });
  })

  // Record controller.
  .controller('RecordCtrl', function ($scope, petList, Profile, Record) {

      var id = Profile.getCurrentPetId();
      var currentPet, i = 0;

      angular.forEach(petList, function(pet) {
        if (pet.objectId === id) {
          currentPet = i;
        }
        i++;
      });


    $scope.record = {
      pet: petList[currentPet],
      title: undefined,
      petList: petList,
      temperature: undefined
    }

  });
