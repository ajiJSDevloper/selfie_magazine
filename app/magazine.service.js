'use strict';

(function() {
    angular.module('selfie')
        .factory('magazineService',service);
    
    function service(){
        var globelBound,
            offset={top:40,left:100};
        var service={
            addPage:addPage,
            loadPage:loadPage,
            calculateBound:calculateBound,
            setMagOffset:setMagOffset,
            getBound:getBound,
            getoffset:getoffset
        }
        function getoffset(){
            return offset
        }
        function getBound(){
             return globelBound
        }

        function setMagOffset(_offset){
            offset=_offset
        }
        function addPage(page, book) {
            var id, pages = book.turn('pages');

            // Create a new element for this page
            var element = $('<div />', {});

            // Add the page to the selfie
            if (book.turn('addPage', element, page)) {
                element.html('<div class="gradient"></div><div class="loader"></div>');
                loadPage(page, element);
            }

        }

        function loadPage(page, pageElement) {
            var img = $('<img />');
            img.mousedown(function(e) {
                e.preventDefault();
            });

            img.load(function() {
                img.css({
                    width: '100%',
                    height: '100%'
                });
                img.appendTo(pageElement);
                pageElement.find('.loader').remove();
            })
            
            img.attr('src', 'pages/' + page + '.jpg');
        }

        function calculateBound(d) {
            var bound = {
                width: d.width,
                height: d.height
            };
            if (bound.width > d.boundWidth || bound.height > d.boundHeight) {
                var rel = bound.width / bound.height;
                if (d.boundWidth / rel > d.boundHeight && d.boundHeight * rel <= d.boundWidth) {
                    bound.width = Math.round(d.boundHeight * rel);
                    bound.height = d.boundHeight;
                } else {
                    bound.width = d.boundWidth;
                    bound.height = Math.round(d.boundWidth / rel)
                }
            }
            bound.height=bound.height-20;
            globelBound=bound;
            return bound;
        }

        return service;
    }
 
})();
