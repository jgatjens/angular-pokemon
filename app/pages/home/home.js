'use strict';

angular.module('ngApp.home', ['ngApp.pokemon.list', 'ngApp.pokemon.form', 'ngApp.pokemon.record'])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('home', {
        url         : '/home',
        controller  : 'HomeCtrl',
        templateUrl : 'pages/home/home.tpl.html',
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
  .controller('HomeCtrl', function ($scope, list, Record) {

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


