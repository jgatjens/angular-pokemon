'use strict';

angular.module('ngVet.home', [ ])

  // Module configuration.
  .config(function ($stateProvider) {

    // Module routing.
    $stateProvider
      .state('home', {
        url         : '/',
        controller  : 'HomeCtrl',
        templateUrl : 'pages/home/home.tpl.html',
        authenticate: true,
        resolve:{
          data: function () {
            // var Home = resourceURL('home');
            // return Home.query().then(function (res) {
            //   return res.data;
            // });
          }
        }
      });
  })

  // Home controller.
  .controller('HomeCtrl', function ($scope, data) {

    $scope.histories = [
      {
        'id': '1409093271212',
        'title': 'Take care of your cat',
        'doctor': 'Dr. Topo',
        'create_date': '1409093271216',
        'modify_date': '1409093271209',
        'action_type': 'glyphicon glyphicon-flash',
        'description': 'We saved the cat lives by catching Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.',
        'clinic_logo': 'angular.png'
      },
      {
        'id': '1409093271215',
        'title': 'Take care of your Pet',
        'doctor': 'Dr. Topo',
        'create_date': '1409093271216',
        'modify_date': '1409093271209',
        'action_type': 'glyphicon glyphicon-calendar',
        'description': 'We saved the dog lives by catching Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.',
        'clinic_logo': 'browsersync.png'
      },
      {
        'id': '1409093271215',
        'title': 'Take care of your DOG',
        'doctor': 'Dr. Topo',
        'create_date': '1409093271216',
        'modify_date': '1409093271209',
        'action_type': 'glyphicon glyphicon-calendar',
        'description': 'We saved the dog lives by sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.',
        'clinic_logo': 'gulp.png'
      },
      {
        'id': '1409093271215',
        'title': 'Take care of your Parrot',
        'doctor': 'Dr. Topo',
        'create_date': '1409093271216',
        'modify_date': '1409093271209',
        'action_type': 'glyphicon glyphicon-comment',
        'description': 'We saved the dog lives by sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.',
        'clinic_logo': 'jasmine.png'
      },
      {
        'id': '1409093271215',
        'title': 'Take care of your DOG',
        'doctor': 'Dr. Topo',
        'create_date': '1409093271216',
        'modify_date': '1409093271209',
        'action_type': 'glyphicon glyphicon-pushpin',
        'description': 'We saved the dog lives by sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.',
        'clinic_logo': 'karma.png'
      },
      {
        'id': '1409093271215',
        'title': 'Take care of your DOGGY',
        'doctor': 'Dr. Topo',
        'create_date': '1409093271216',
        'modify_date': '1409093271209',
        'action_type': 'glyphicon glyphicon-bell',
        'description': 'We saved the dog lives by sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.',
        'clinic_logo': 'protractor.png'
      },
      {
        'id': '1409093271215',
        'title': 'Take care of your Cat',
        'doctor': 'Dr. Topo',
        'create_date': '1409093271216',
        'modify_date': '1409093271209',
        'action_type': 'glyphicon glyphicon-star',
        'description': 'We saved the dog lives by sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.',
        'clinic_logo': 'bootstrap.png'
      }
    ];

    angular.forEach($scope.histories, function(history) {
      history.rank = Math.random();
    });


  });


