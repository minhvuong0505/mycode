
(function($) {
    "use strict";


    $(document).ready(function() {

        $('[data-fancybox]').fancybox({
            youtube : {
                controls : 0,
                showinfo : 0
            },
            vimeo : {
                color : 'f00'
            }
        });

        /*  [ owl-carousel ]
        - - - - - - - - - - - - - - - - - - - - */

        $('.photo .owl-carousel').on('initialized.owl.carousel changed.owl.carousel', function(e) {
            if (!e.namespace) return
            var carousel = e.relatedTarget
            $(this).parent().find(".currentItem").text(carousel.relative(carousel.current()) + 1);
            $(this).parent().find(".owlItems").text( '/'+ carousel.items().length);
        }).owlCarousel({
            items:1,
            loop:true,
            autoplay:true,
            autoplayTimeout:4000,
            autoplayHoverPause:true,
            dots:false,
            navText: ["",""],
            nav: true,
            smartSpeed: 600,
        });
       
    }); 

})(jQuery);