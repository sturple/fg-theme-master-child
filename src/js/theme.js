/****** theme.js *****/

/* install specific ****/

jQuery(function($) {   
    imagesLoaded($('.feature-carousel img'),
        function(e, msg) {
            var navpos = 0;
            if (msg.length > 0 ) {
                console.log('Error loading images.', msg);
            }
            // this updates the window and menu location after images have been loaded.            
            $('.carousel').css({'min-height' : '100%'}).animate({opacity: 1});
            $(window).trigger('resize');
            

            $('.script-navigation').fgStickyComponent({
                topoffset: 0,
                triggertop: $('#header-container').offset().top + $('#header-container').outerHeight(),
                removesize : 1200
            });
            // this code is used for fading menu on scroll down and fading in menu on scroll up
            $('.script-navigation').on('fg.stickycomponent.moving',function(e, g, wt){             
                if (navpos < wt) {
                    if (!$(this).hasClass('sticky-scroll-down')) {
                        $(this).removeClass('sticky-scroll-up').addClass('sticky-scroll-down');
                    }
                }
                else {
                    if (!$(this).hasClass('sticky-scroll-up')) {
                        $(this).removeClass('sticky-scroll-down').addClass('sticky-scroll-up');
                    }
                }
                navpos = wt;                
            });
            //clears all scrolling classes when in normal mode.
            $('.script-navigation').on('fg.stickycomponent.normal',function(e, g, wt){
                $(this).removeClass('sticky-scroll-down sticky-scroll-up');
            });
        }
    );   


    if ( ($('.fg-wow').length > 0 ) && ( typeof WOW === 'function') ) {
        var wow = new WOW(
          {
            boxClass:     'fg-wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset:       0,          // distance to the element when triggering the animation (default is 0)
            mobile:       false,       // trigger animations on mobile devices (default is true)
            live:         true,       // act on asynchronously loaded content (default is true)
            callback:     function(box) {
             
            },
            scrollContainer: null // optional scroll container selector, otherwise use window
          }
        );
        wow.init();
    }
    
   
    
});



