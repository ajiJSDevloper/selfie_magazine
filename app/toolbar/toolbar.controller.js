'use strict';
(function() {
    angular.module('selfie')
        .controller('toolbarController', toolbarController);

    function toolbarController(magazineService){
        var vm=this;
        
        vm.getBound=getBound;
        vm.show=show;

        function show(){
            var _d=magazineService.getoffset();
            console.log(_d);
            if(_d.top >= 40) return true;
            else return false
        }
        function getBound(){
            return $('.magazine').width();
        }

        vm.headStyle={
            padding:''
        }
    }
})();    