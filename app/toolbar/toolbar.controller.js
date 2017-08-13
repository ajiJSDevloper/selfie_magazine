'use strict';
(function() {
    angular.module('selfie')
        .controller('toolbarController', toolbarController)
        .directive('openMenu',openMenu);
    function openMenu(){
        return{
            restrict:'A',
            template:'<h1>Aji</h1>',
            scope:{
                menuOptions:'='
            },
            link:function(scope, element, attrs){
                console.log(scope);
                element.on('click', function(event) {
                    
                })
            }
        }
    }
    function toolbarController(magazineService){
        var vm=this;

        vm.menuOptions=[{
            title:'Home',
            actions:''
        },
        {
            title:'Contents',
            actions:''
        },
        {
            title:'Authors',
            actions:''
        },{
            title:'About us',
            actions:''
        },{
            title:'Contact',
            actions:''
        }]
        vm.getBound=getBound;
        vm.show=show;

        function show(){
            var _d=magazineService.getoffset();
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