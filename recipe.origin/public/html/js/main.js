
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

        $('.block-home1 .owl-carousel').owlCarousel({
            items:1,
            loop:true,
            autoplay:true,
            autoplayTimeout:5000,
            autoplayHoverPause:true,
            dots:true,
            navText: ["",""],
            nav: false,
            smartSpeed: 600
        });

        $('.block-home6 .owl-carousel').owlCarousel({
            items:1,
            loop:false,
            autoplay:false,
            autoplayTimeout:5000,
            autoplayHoverPause:true,
            dots:false,
            navText: ["",""],
            nav: true,
            smartSpeed: 600
        });

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

        $('.block-top1 .owl-carousel').on('initialized.owl.carousel changed.owl.carousel', function(e) {
            if (!e.namespace) return
            var carousel = e.relatedTarget
            $(this).parent().find(".pagination").text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
           
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

        /*  [Mobile menu ]
        - - - - - - - - - - - - - - - - - - - - */
        

        $("[data-action='toggle-nav']").on( 'click', function() {
            $( this ).toggleClass('active');
            $(".header-nav").toggleClass("active");
            $("body").toggleClass("menu-open");
            return false;
            
        }) ;

        $("[data-action='toggle-setting']").on( 'click', function() {
            $("[data-action='close-nav']").click()
            $( this ).toggleClass('active');
            $(".header-setting").toggleClass("active");
            $("body").toggleClass("menu-open");
            return false;
            
        }) ;

        // $(".header-nav li").on( 'click','a', function() {
        //     $("[data-action='toggle-nav']").removeClass('active');
        //     $(".header-nav").removeClass("active");
        //     $("body").removeClass("menu-open");
        //     return true;                
        // })
        
        $("[data-action='close-nav']").on( 'click', function() {
            $("[data-action='toggle-nav']").removeClass('active');
            $(".header-nav").removeClass("active");
            $("body").removeClass("menu-open");
            return false;
            
        }) ;

        // $("[data-action='filter']").on( 'click', function() {
        //     $( this ).toggleClass('active');
        //     $(".header-search").toggleClass("active");
        //     $("body").toggleClass("search-open");
        //     return false;
            
        // }) ;
         
        // $(".head-search .btn-search").on( 'click', function() {
        //     $( this ).toggleClass('active');
        //     $(".header-search").toggleClass("active");
        //     $("body").toggleClass("search-open");
        //     return false;
            
        // }) ;
        // $(".close-search").on( 'click', function() {
        //     $(".header-search").removeClass('active');
        //     $(".page-title .action-filter").removeClass('active');
        //     $(".head-search .btn-search").removeClass("active");
        //     $("[data-action='filter']").removeClass("active");
        //     $("body").removeClass("search-open");
        //     return false;
            
        // }) ;

        // $(".page-title .action-filter").on( 'click', function() {
        //     $( this ).toggleClass('active');
        //     $(".header-search").toggleClass("active");
        //     $("body").toggleClass("search-open");
        //     return false;
            
        // }) ;

    }); 

})(jQuery);