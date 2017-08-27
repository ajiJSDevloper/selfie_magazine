'use strict';
(function() {
    angular.module('selfie')
    .directive("scroll", function ($window,$timeout) {
        var flag=true;
    return {
        scope: { onScrolled: '&onScrolled' },
        link:function(scope, element, attrs) {
        var raw = element[0];
           element.bind("scroll", function() {
                if(flag && raw.scrollTop+raw.offsetHeight+100>raw.scrollHeight){
                flag=false;
                    $timeout(function(){
                        console.log('888888888888')
                        flag=true;
                        scope.onScrolled(); 
                    },2000)
                }

            });
        }
    };
});
})();