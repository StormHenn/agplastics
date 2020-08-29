(function ($) {
"use strict";
$('.main-menu nav > ul > li').slice(-2).addClass('last-elements');

/* meanmenu */
$('.main-menu nav').meanmenu({
	 meanMenuContainer: '.mobile-menu-area',
	 meanScreenWidth: "767"
});
 
/* slider-active  */
$('.slider-active').owlCarousel({
    loop:true,
    nav:true,
	navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
    responsive:{
        0:{
            items:1,
			nav:false,
        },
        767:{
            items:1,
			nav:false,
        },
        1000:{
            items:1
        }
    }
})

/* counter */
$('.counter').counterUp(900);

/* mixItUp */
$('#Container').mixItUp();

/* image-link */
$('.image-link').magnificPopup({
  type: 'image',
  gallery:{
    enabled:true
  }
});

/* video-popup */
$('.video-popup').magnificPopup({
  type: 'iframe'
});

})(jQuery);	