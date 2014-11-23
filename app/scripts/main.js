'use strict';

// 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router'
angular.module('ngApp', [

  // Vendor modules.
  'ngAnimate',
  'ui.router',
  // 'angularMoment',
  'ui.bootstrap',

  // Share common code.
  'ngApp.common',

  // Sections
  'ngApp.home',
  'ngApp.notification',
  'ngApp.profile'
])


  // Configuration.
  .config(function ($urlRouterProvider, $sceDelegateProvider, $locationProvider) {

    // use #! in the url.
    $locationProvider.hashPrefix('!');

    // Default application's url.
    $urlRouterProvider.otherwise('/home');

    // Allow assets from local and external sources
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self'
    ]);


    // moment.locale('en', {
      //   relativeTime : {
      //     future: "in %s",
      //     past:   "%s old",
      //     s:  "seconds",
      //     m:  "a minute",
      //     mm: "%d minutes",
      //     h:  "an hour",
      //     hh: "%d hours",
      //     d:  "a day",
      //     dd: "%d days",
      //     M:  "a month",
      //     MM: "%d months",
      //     y:  "a year",
      //     yy: "%d years"
      //   }
    // });

    // Parse init
    Parse.initialize(config.applicationID, config.jsKey);


    // Modified XMLHttpRequest to add a listener for start and stop the progress bar
    //
    // Save the real open
    var oldOpen = XMLHttpRequest.prototype.open;

    function onStateChange() {
      // fires on every readystatechange ever
      // use `this` to determine which XHR object fired the change event

      if (this.readyState === 1) {
        NProgress.start();
      }
      // use status == 200 to know if the request was successfully
      if (this.readyState === 4 && ( this.status === 200 || this.status === 201 || this.status === 202)) {
        NProgress.done(true);
      }

      // If request fail show progress bar in red
      if (this.readyState === 4 && ( this.status === 404 || this.status === 0 || this.status === 400 || this.status === 403 )) {
        NProgress.fail();
      }
    }

    NProgress.fail = function () {
      var NProgressDOM =  document.getElementById('nprogress');
      NProgressDOM.className = 'fail';

      NProgress.inc(60);

      setTimeout(function() {
        NProgress.done();
      }, 500);

      setTimeout(function() {
        NProgressDOM.className = '';
      }, 1000);
    };

    XMLHttpRequest.prototype.open = function() {
      // when an XHR object is opened, add a listener for its readystatechange events
      this.addEventListener('readystatechange', onStateChange);

      // run the real `open`
      oldOpen.apply(this, arguments);
    };

  })

  .run(function( $rootScope, Profile, $state) {

    $rootScope.$on('$stateChangeStart', function(){
      // start
      NProgress.start();
    });

    // $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
    $rootScope.$on('$stateChangeSuccess',function(event, toState){

      NProgress.done(true);

      // check for child states
      if (toState.name.match(/\./g)) {
        // get root state
        $rootScope.activePage = toState.name.split('.')[0];
      } else {
        $rootScope.activePage = toState.name;
      }

      if (toState.authenticate && !Profile.isAuthenticated()){

        event.preventDefault();

        // User isn’t authenticated
        $state.transitionTo('login', { errorCode: 403 });

      }

    });

  });
