'use strict';

(function() {
    angular.module('selfie', [
            'ui.router'
            // 'ng-flip'
        ])
        .config(config)
        .controller('magazineController',ctrl);

    function config($stateProvider, $urlRouterProvider,$locationProvider) {
        $locationProvider.hashPrefix('');
    	$urlRouterProvider.otherwise('/magazine/page/1');
        $stateProvider
            .state('magazine', {
                // abstract: true,
                url: '/magazine',
                views: {
                    '': {
                        templateUrl: 'app/main.html',
                    },
                    'toolbar@magazine': {
                        templateUrl: 'app/toolbar/toolbar.html',
                        controller:'toolbarController as vm'
                    },
                    'magazine@magazine': {
                        templateUrl: 'app/magazine/magazine.html',
                        controller:'magazineController as vm'
                    }
                }
            })
            .state('magazine_pageno', {
                // abstract: true,
                url: '/magazine/page/:page',
                cache:true,
                views: {
                    '': {
                        templateUrl: 'app/main.html',
                    },
                    'toolbar@magazine_pageno': {
                        templateUrl: 'app/toolbar/toolbar.html',
                        controller:'toolbarController as vm'
                    },
                    'magazine@magazine_pageno': {
                        templateUrl: 'app/magazine/magazine.html',
                        controller:'magazineController as vm'
                    }
                }
            })
    }

    function ctrl(){
        var base='assets/pages/';
        this.pages = [ base+'1.jpg', 
            base+'2.jpg', base+'3.jpg', base+'4.jpg', base+'5.jpg', base+'6.jpg', 
            base+'7.jpg', base+'8.jpg', base+'9.jpg',base+'10.jpg',base+'11.jpg',
            base+'12.jpg' ];
    }
})();
