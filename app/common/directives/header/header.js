'use strict';

angular.module('ngApp.common.directives.header', [ ])
  // header directive.
  .directive('ngAppHeader', function () {
    return {
      restrict    : 'EA',
      replace     : true,
      transclude  : true,
      controller  : 'HeaderCtrl',
      templateUrl : 'common/directives/header/header.tpl.html'
    }
  })

  .controller('HeaderCtrl', function ($rootScope) {

    var svgMorpheus = new SVGMorpheus('#iconsvg');

    var toggleSvg =  function (id) {
      svgMorpheus.to(id, {duration: 500, easing: 'linear', rotation: 'Clockwise'});
    };


    var menu = $('body > .container');

    $rootScope.toggleMenu = function () {

      menu.toggleClass('cbp-spmenu-push-toright')
      $('#cbp-spmenu').toggleClass('cbp-spmenu-open');

      if (menu.hasClass('cbp-spmenu-push-toright')){
        toggleSvg('exit_to_app');
      } else {
        toggleSvg('hamburguer');
      }

    }

    toggleSvg('hamburguer');
  });
