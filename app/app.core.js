'use strict';

(function() {
    angular.module('selfie', [
            'ui.router'
            // 'ng-flip'
        ])
        .config(config)
        .controller('magazineController',ctrl);

    function config($stateProvider, $urlRouterProvider) {
    	$urlRouterProvider.otherwise('/app');
        $stateProvider
            .state('app', {
                // abstract: true,
                url: '/app',
                views: {
                    '': {
                        templateUrl: 'app/main.html',
                    },
                    'toolbar@app': {
                        templateUrl: 'app/toolbar/toolbar.html',
                    },
                    'magazine@app': {
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
