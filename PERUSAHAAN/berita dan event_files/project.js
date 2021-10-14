$(document).ready(function(){
	$('#makevcall').fancybox({
		helpers : {
			media: true 
		},
		buttons: [
			"zoom",
			"share",
			"slideShow",
			"fullScreen",
			"download", 
			"thumbs",
			"close"
		],
		width: "100%",
		height: 870,
		autoSize: false,
		scrolling: false
	}); 
	
    if($('.proj-homebanner').length>0){
    	var owl = $('.proj-homebanner');
        owl.on('initialized.owl.carousel', function(event) {
            var currentItem = event.item.index;
            var items = event.item.count; 
            $('.proj-totalbanner').html(items);
            $('.proj-currentbanner').html(currentItem + 1);
        })
    	owl.owlCarousel({
    		items:1,
            autoplay:true,
            rewind:true,
    		dotsEach:true,
            nav:true
    	});
    	owl.on('changed.owl.carousel', function(event) {
            var currentItem = event.item.index;
            var items = event.item.count; 
            $('.proj-totalbanner').html(items);
            $('.proj-currentbanner').html(currentItem + 1);
        });
    }
    if($('.proj-tabsbox').length>0){
        $('.proj-tabsbox').tabs();
    }
    /*if($('.proj-sf-slider').length>0){
        $('.proj-sf-slider').owlCarousel({
            items:1,
            nav:true
        });
    }*/
    if($('.proj-lp-slider').length>0){
       $('.proj-lp-slider').owlCarousel({
            items:3,
            nav:true,
            margin:10,
            dots:false
        }); 
    }
    if($('.proj-maintabs').length>0){
        $('.proj-maintabs').tabs();
    };
    if($('.proj-subtabs').length>0){
        $('.proj-subtabs').tabs();
    };
    if($('.proj-subsubtabsbox').length>0){
        $('.proj-subsubtabsbox').tabs();
    };
    if($('.proj-tab-img-box').length>0){
        $('.proj-tab-img-box').tabs();
    };
    if($('.proj-select-custom').length>0){
        $('.proj-select-custom').select2({
            minimumResultsForSearch: Infinity
        });
    }
    if($('.proj-dropdown').length>0){
        $('.proj-dropdown').select2({
        });
    }
    /*$('.proj-menu-button').click(function(){
        if($(this).siblings('.proj-headerbox').css('display')=='none'){
            $('.proj-headerbox').show();
            $('html, body').addClass('proj-menu-open');
        }
        else{
            $('.proj-headerbox').hide();
            $('html, body').removeClass('proj-menu-open');
        }
    });*/
    if($('#proj-mobilenav').length>0){
        $("#proj-mobilenav").mmenu({
            "extensions": [
                "pagedim-black",
                "border-full"
            ],
            "navbar": {
                title: "Angkasa Pura"
            },
            "offCanvas": {
                "position": "right"
            },
            lazySubmenus: {
                load: true
            }
        });
    }
    $('.proj-nav-title').click(function(){
        if($(window).width()<1130){
            if($(this).siblings('.proj-submenu').css('display')=='none'){
                $('.proj-submenu').slideUp();
                $('.proj-sm-airport-box').slideUp();
                $(this).siblings('.proj-submenu').slideDown();
                $('.proj-nav-title').removeClass('proj-open');
                $(this).addClass('proj-open');
                return false;
            }
            else{
               $(this).siblings('.proj-submenu').slideUp();
               $(this).removeClass('proj-open');
               return false;
            }
        }
    });
    $('.proj-choosebox .txtdefault').click(function(){
        if($(this).siblings('.proj-sm-airport-box').css('display')=='none'){
            $('.proj-submenu').slideUp();
            $(this).siblings('.proj-sm-airport-box').slideDown(); 
        }
        else{
            $(this).siblings('.proj-sm-airport-box').slideUp();
        }
    });
    $('.proj-maintabsmenu li a').click(function(){
        var text_submenu = $(this).html();
        if($(window).width()<768){
            $('.proj-submenu-btn').html(text_submenu);
            $('.proj-maintabsmenu').slideUp(); 
        }
    });
    $('.proj-subtabs-menu li a').click(function(){
        var text_submenu = $(this).html();
        if($(window).width()<768){
            $('.proj-subtabsmenu-btn').html(text_submenu);
            $('.proj-subtabs-menu').slideUp(); 
        }
    });
    $('.proj-submenu-btn').click(function(){
        if($('.proj-maintabsmenu').css('display')=='none'){
           $('.proj-maintabsmenu').slideDown();
        }
        else{
            $('.proj-maintabsmenu').slideUp();    
        }
    })
    $('.proj-subtabsmenu-btn').click(function(){
        if($('.proj-subtabs-menu').css('display')=='none'){
           $('.proj-subtabs-menu').slideDown();
        }
        else{
            $('.proj-subtabs-menu').slideUp();    
        }
    })
    $('.proj-indexmenu').click(function(){
        if($('.proj-indexmenubox').css('display')=='none'){
           $('.proj-indexmenubox').slideDown();
        }
        else{
            $('.proj-indexmenubox').slideUp();    
        }
    })
    $('.proj-backtotop').click(function(){
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
    if($('.proj-media').length>0){
        $('.proj-media').owlCarousel({
            responsive:{
                0 : {
                    items:2,
                    margin:20,
                    dots:false,
                    nav:true,
                },
                768 : {
                    items:3,
                    margin:20,
                    dots:false,
                    nav:true,
                },
                1120 : {
                    items:4,
                    margin:20,
                    dots:false,
                    nav:true,
                }
            }
        });
    }
	
	$('#play-video').on('click', function(ev) {
		$(this).hide();
		// $("#video")[0].src += "&autoplay=1";
		$("#video")[0].src += "/?&autoplay=1";
		ev.preventDefault();
	});
	
	
	var LIVECHAT = new LIVECHAT_WIDGET(
		'livechat-widget-inf',
		'https://interacton4.infomedia.co.id:3000/ap2/assets/custom/responsive.js',
		'https://interacton4.infomedia.co.id:3000/ap2'
	);
	LIVECHAT.init();
});
$(window).on('scroll', function () {
    if ($(window).scrollTop() > 110) {
        $('.proj-backtotop').fadeIn();
    } else {
        $('.proj-backtotop').fadeOut();
    }
});
$(window).bind('resize', function(){
    if($(window).width()>767){
        $('.proj-maintabsmenu, .proj-subtabs-menu').show();
    }
    else{
        $('.proj-maintabsmenu, .proj-subtabs-menu').hide();
    }
})
