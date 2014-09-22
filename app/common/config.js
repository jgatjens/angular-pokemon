'use strict';

angular.module('ngVet.config', [])

  // // Module configuration.
  // .config(function ($urlRouterProvider, $sceDelegateProvider, $locationProvider) {

  //   // use #! in the url.
  //   $locationProvider.hashPrefix('!');

  //   // Default application's url.
  //   $urlRouterProvider.otherwise('/');

  //   // Allow assets from local and external sources
  //   $sceDelegateProvider.resourceUrlWhitelist([
  //     // Allow same origin resource loads.
  //     'self'
  //   ]);


  //   // Parse init
  //   Parse.initialize("8WUpXyrczIHufksKvskQ8hrA3eiroUWhvnguAW8l", "tIDTd21YkMetRjQFLwY29GW5zcKBzgk5DoX6gUEj");


  //   // Init Facebook
  //   // 3) Finally, init Facebook

  //   // window.fbAsyncInit = function() {
  //   //   Parse.FacebookUtils.init({
  //   //     appId: 'facebook app id',
  //   //     channelUrl : '//www.slidebean.com/fbchannel.html',
  //   //     status: true,
  //   //     cookie: true,
  //   //     xfbml: true
  //   //   });
  //   // };

  //   // (function(d, s, id){
  //   //   var js, fjs = d.getElementsByTagName(s)[0];
  //   //   if (d.getElementById(id)) {return;}
  //   //   js = d.createElement(s); js.id = id;
  //   //   js.src = "//connect.facebook.net/en_US/all.js";
  //   //   fjs.parentNode.insertBefore(js, fjs);
  //   // }(document, 'script', 'facebook-jssdk'));

  // })

  // .run(function( $rootScope) {

  //   // $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
  //   $rootScope.$on('$stateChangeSuccess',function(event, toState){

  //     // check for child states
  //     if (toState.name.match(/\./g)) {
  //       // get root state
  //       $rootScope.activePage = toState.name.split('.')[0];
  //     } else {
  //       $rootScope.activePage = toState.name;
  //     }

  //   });

  // });
