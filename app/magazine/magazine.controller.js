'use strict';
(function () {
    angular.module('selfie')
        .controller('magazineController', magazineController);

    function magazineController(magazineService, $state, $stateParams, $location) {
        var vm = this;
        vm.mobileHeight=150;
        vm.init = init;
        vm.thumbOpen = thumbOpen;
        vm.getmobileHeight=getmobileHeight;
        var selfie = $('.magazine');

        function init() {
            if (selfie.width() == 0 || selfie.height() == 0) {
                setTimeout(init(), 10);
                return;
            }
            selfie.turn({

                // Magazine width

                width: 922,

                // Magazine height

                height: 600,

                // Duration in millisecond

                duration: 1000,

                // Hardware acceleration

                acceleration: !isChrome(),

                // Enables gradients

                gradients: true,

                // Auto center this selfie

                autoCenter: true,

                // Elevation from the edge of the selfie when turning a page

                elevation: 100,

                // The number of pages

                pages: 156,

                // Events

                when: {
                    turning: function (event, page, view) {
                        var absUrl = $location.absUrl();
                        var _url = absUrl.split('/');
                        _url.splice(_url.length - 1);
                        var baseUrl = _url.join('/');
                        window.history.pushState('', '', baseUrl + '/' + page);
                        disableControls(page);
                    },

                    turned: function (event, page, view) {
                        disableControls(page);
                        $(this).turn('center');
                        if (page == 1) {
                            $(this).turn('peel', 'br');
                        }
                    },
                    missing: function (event, pages) {
                        for (var i = 0; i < pages.length; i++)
                            magazineService.addPage(pages[i], $(this));

                    }
                }
            });
            zoomJsInit();
        }

        function disableControls(page) {
            if (page == 1)
                $('.previous-button').hide();
            else
                $('.previous-button').show();

            if (page == $('.magazine').turn('pages'))
                $('.next-button').hide();
            else
                $('.next-button').show();
        }


        function isChrome() {
            return navigator.userAgent.indexOf('Chrome') != -1;
        }

        function zoomJsInit() {
            $('.magazine-viewport').zoom({
                flipbook: $('.magazine'),

                max: function () {
                    return largeMagazineWidth() / $('.magazine').width();
                },
                when: {
                    swipeLeft: function () {

                        $(this).zoom('flipbook').turn('next');

                    },
                    swipeRight: function () {

                        $(this).zoom('flipbook').turn('previous');

                    },
                    resize: function (event, scale, page, pageElement) {

                        if (scale == 1)
                            loadSmallPage(page, pageElement);
                        else
                            loadLargePage(page, pageElement);
                    },

                    zoomIn: function () {

                        $('.thumbnails').hide();
                        $('.made').hide();
                        $('.magazine').removeClass('animated').addClass('zoom-in');
                        $('.zoom-icon').removeClass('zoom-icon-in').addClass('zoom-icon-out');

                        if (!window.escTip && !$.isTouch) {
                            // escTip = true;

                            $('<div />', {
                                'class': 'exit-message'
                            }).
                            html('<div>Press ESC to exit</div>').
                            appendTo($('body')).
                            delay(2000).
                            animate({
                                opacity: 0
                            }, 500, function () {
                                $(this).remove();
                            });
                        }
                    },

                    zoomOut: function () {

                        $('.exit-message').hide();
                        $('.thumbnails').fadeIn();
                        $('.made').fadeIn();
                        $('.zoom-icon').removeClass('zoom-icon-out').addClass('zoom-icon-in');

                        setTimeout(function () {
                            $('.magazine').addClass('animated').removeClass('zoom-in');
                            resizeViewport();
                        }, 0);

                    }
                }
            });
            var pageNo = $stateParams.page;
            if (pageNo !== undefined && pageNo != 1) {
                if ($('.magazine').turn('is'))
                    $('.magazine').turn('page', pageNo);
            }

            resizeViewport();
        }



        $(window).resize(function () {
            setTimeout(function () {
                resizeViewport();
            }, 1000)
        }).bind('orientationchange', function () {
            setTimeout(function () {
                resizeViewport();
            }, 1000)
        });

        function resizeViewport() {
            var width = $(window).width(),
                height = $(window).height(),
                options = $('.magazine').turn('options');

            if (width <= 800 && height > 400) selfie.turn("display", "single")
            else selfie.turn("display", "double")

            $('.magazine').removeClass('animated');
            $('.magazine-viewport').css({
                width: width,
                height: height
            }).
            zoom('resize');
            if ($('.magazine').turn('zoom') == 1) {
                var bound = calculateBound({
                    width: options.width,
                    height: options.height,
                    boundWidth: Math.min(options.width, width),
                    boundHeight: Math.min(options.height, height)
                });
                if (width <= 800 && width >= 600 && height > 900) {
                    bound.width -= 50;
                    bound.height = (650 / 500) * bound.width;
                } else if (width <= 600) {
                    bound.width -= 25;
                    bound.height = (650 / 500) * bound.width;
                }
                if (bound.width % 2 !== 0)
                    bound.width -= 1;
                if (bound.width != $('.magazine').width() || bound.height != $('.magazine').height()) {

                    $('.magazine').turn('size', bound.width, bound.height);

                    if ($('.magazine').turn('page') == 1)
                        $('.magazine').turn('peel', 'br');

                    $('.next-button').css({
                        height: bound.height,
                        backgroundPosition: '-38px ' + (bound.height / 2 - 32 / 2) + 'px'
                    });
                    $('.previous-button').css({
                        height: bound.height,
                        backgroundPosition: '-4px ' + (bound.height / 2 - 32 / 2) + 'px'
                    });
                }
                if (width < 500){
                    $('.magazine').css({
                        top: -(bound.height - 20) / 2,
                        left: -(bound.width - 150) / 2
                    });
                }
                console.log(bound);
                console.log(bound.height/2);
                if (width < 500) {
                    var top=(height/2)-50;
                    $('.magazine').css({
                        top: -(top),
                        left: -(bound.width) / 2
                    });
                    calcMoblieThumbHeight(height,bound.height);
                }
            }

            // var magazineOffset = $('.magazine').offset();
            magazineService.setMagOffset($('.magazine').offset())
            // boundH = height - magazineOffset.top - $('.magazine').height(),
            // marginTop = (boundH - $('.thumbnails > div').height()) / 2;          
            $('.magazine').addClass('animated');

        }

        function calcMoblieThumbHeight(height,mag_height) {
            var remins=height - (mag_height+45);
            vm.mobileHeight=remins-10;
        }

        function getmobileHeight(){
            return vm.mobileHeight;
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
            bound.height = bound.height - 20;
            return bound;
        }
        if ($.isTouch)
            $('.magazine-viewport').bind('zoom.doubleTap', zoomTo);
        else
            $('.magazine-viewport').bind('zoom.tap', zoomTo);

        function zoomTo(event) {
            setTimeout(function () {
                if ($('.magazine-viewport').data().regionClicked) {
                    $('.magazine-viewport').data().regionClicked = false;
                } else {
                    if ($('.magazine-viewport').zoom('value') == 1) {
                        $('.magazine-viewport').zoom('zoomIn', event);
                    } else {
                        $('.magazine-viewport').zoom('zoomOut');
                    }
                }
            }, 1);
        }

        function largeMagazineWidth() {
            return 2214;
        }

        function loadLargePage(page, pageElement) {
            var img = $('<img />');
            img.load(function () {
                var prevImg = pageElement.find('img');
                $(this).css({
                    width: '100%',
                    height: '100%'
                });
                $(this).appendTo(pageElement);
                prevImg.remove();

            });
            img.attr('src', 'pages/' + page + '-large.jpg');
        }

        function loadSmallPage(page, pageElement) {
            var img = pageElement.find('img');
            img.css({
                width: '100%',
                height: '100%'
            });
            img.unbind('load');
            img.attr('src', 'pages/' + page + '.jpg');
        }
        // Next button
        $('.next-button').bind($.mouseEvents.over, function () {
            $(this).addClass('next-button-hover');
        }).bind($.mouseEvents.out, function () {
            $(this).removeClass('next-button-hover');
        }).bind($.mouseEvents.down, function () {
            $(this).addClass('next-button-down');
        }).bind($.mouseEvents.up, function () {
            $(this).removeClass('next-button-down');
        }).click(function () {
            $('.magazine').turn('next');
        });

        // Events for the next button

        $('.previous-button').bind($.mouseEvents.over, function () {
            $(this).addClass('previous-button-hover');
        }).bind($.mouseEvents.out, function () {
            $(this).removeClass('previous-button-hover');
        }).bind($.mouseEvents.down, function () {
            $(this).addClass('previous-button-down');
        }).bind($.mouseEvents.up, function () {
            $(this).removeClass('previous-button-down');
        }).click(function () {
            $('.magazine').turn('previous');
        });

        function thumbOpen(id) {
            console.log(id);
        }

    }
})();