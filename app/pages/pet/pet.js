'use strict';

angular.module('ngVet.pet', ['ngVet.pet.list','ngVet.pet.new', 'ngVet.pet.edit', 'ngVet.record.new'])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('pets', {
        url         : '/',
        controller  : 'PetCtrl',
        templateUrl : 'pages/pet/pet.tpl.html',
        authenticate: true,
        resolve:{
          list: function (Record) {
            return Record.list().then(function (records) {
              return records;
            });
          }
        }
      });
  })

  // Home controller.
  .controller('PetCtrl', function ($scope, list, Record) {

    // $scope.histories = [
    //   {
    //     'id': '1409093271212',
    //     'title': 'Take care of your Jiglypo',
    //     'doctor': 'Dr. Topo',
    //     'create_date': '1409093271216',
    //     'modify_date': '1409093271209',
    //     'action_type': 'glyphicon glyphicon-flash',
    //     'description': 'We saved the cat lives by catching Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.',
    //     'clinic_logo': 'angular.png'
    //   }
    // ];

    $scope.records = list;

    $scope.delete = function (record) {

      swal({
        title: "Delete Record",
        text: "Are you sure you want to delete this record?",
        type: "warning",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel plx!",
        showCancelButton: true,
        closeOnConfirm: false,
        closeOnCancel: false
      },
      function(isConfirm) {
        console.log('Delete record id: ', {});

        if (isConfirm) {

            Record.remove(record.objectId).then(function () {
              var index = $scope.records.indexOf(record);
              $scope.records.splice(index, 1);
              // $scope.$apply();

              swal("Deleted!", "Record has been deleted.", "success");

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

    };

    // angular.forEach($scope.histories, function(history) {
    //   history.rank = Math.random();

    // });


  });


