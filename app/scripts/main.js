'use strict';

// 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router'
angular.module('ngVet', [

  // Vendor modules.
  'ui.router',
  'ngAnimate',
  'ui.bootstrap',

  // Principal submodules.
  'ngVet.common',

  // Sections
  'ngVet.home',
  'ngVet.notification',
  'ngVet.pet',
  'ngVet.profile'
])


  // Configuration.
  .config(function ($urlRouterProvider, $sceDelegateProvider, $locationProvider) {

    // use #! in the url.
    $locationProvider.hashPrefix('!');

    // Default application's url.
    $urlRouterProvider.otherwise('/login');

    // Allow assets from local and external sources
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self'
    ]);


    // Parse init
    Parse.initialize('8WUpXyrczIHufksKvskQ8hrA3eiroUWhvnguAW8l', 'tIDTd21YkMetRjQFLwY29GW5zcKBzgk5DoX6gUEj');

    // Init Facebook
    window.fbAsyncInit = function() {
      Parse.FacebookUtils.init({
        appId: '1544086335825154',
        channelUrl : '//www.slidebean.com/fbchannel.html',
        status: true,
        cookie: true,
        xfbml: true
      });

    };

    // Add facebook sdk to the document
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/all.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


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

      if (this.readyState === 4 && this.status === 200) {
        NProgress.done(true);
      }

      // Add red color
      if (this.readyState === 4 && this.status === 404) {
          var NProgressDOM =  document.getElementById('nprogress');
          NProgressDOM.className = 'fail';

          NProgress.inc(60);

          setTimeout(function() {
            NProgress.done();
          }, 500);

          setTimeout(function() {
            NProgressDOM.className = '';
          }, 1500);
      }
    }

    XMLHttpRequest.prototype.open = function() {
        // when an XHR object is opened, add a listener for its readystatechange events
        this.addEventListener('readystatechange', onStateChange);
        // this.addEventListener("load", onLoadSuccess);
        // run the real `open`
        oldOpen.apply(this, arguments);
    };


  })

  .run(function( $rootScope, profile, $state) {


    $rootScope.$on('$stateChangeStart', function(){
      // start
      NProgress.start();
    });

    // $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
    $rootScope.$on('$stateChangeSuccess',function(event, toState){

      NProgress.done();

      // check for child states
      if (toState.name.match(/\./g)) {
        // get root state
        $rootScope.activePage = toState.name.split('.')[0];
      } else {
        $rootScope.activePage = toState.name;
      }

      if (toState.authenticate && !profile.isAuthenticated()){
        // User isn’t authenticated
        $state.transitionTo('login', { errorCode: 403 });
        event.preventDefault();
      }
      // if (toState.name == 'login' && Profile.isAuthenticated()) {
      //   $state.transitionTo("home");
      // }
    });

  });
