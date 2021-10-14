$(function () {
	
	
	$('#galery').fancybox({
	  beforeLoad : function() {
		this.opts.iframe.tpl = '<iframe allow="camera,microphone" id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>';
	  }
	});
	/*
	MMENU
	============================
	*/
	$('nav#proj-mobilenav').mmenu({
		"extensions": [
			"pagedim-black",
            "border-full"
		],
		navbar: {
			title: Global.title
		},
		"offCanvas": {
			"position": "right"
		},
		lazySubmenus: {
		   	load: true
		}
	});
	
	
	
	/*
	Date
	============================
	*/
	function setDateTime() {
		var myDate = new Date();
		var mySecond = myDate.getSeconds();
		var myMinute = myDate.getMinutes();
		var myHour = myDate.getHours();
		var myDay = myDate.getDate();
		var myMonth = myDate.getMonth();
		var myYear = myDate.getFullYear();
		var monthNames = [ "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sept", "Okt", "Nov", "Des" ];

		if (myHour<10) {
			myHour = '0' + myHour;
		}
		if (myMinute<10) {
			myMinute = '0' + myMinute;
		}
		else {
			myMinute = + myMinute;
		}

		$('#proj-header-time, #proj-header-date').empty();
		$('#proj-header-time').append(myHour + ':' + myMinute);
		$('#proj-header-date').append(myDay + ' ' + monthNames[myMonth] + ' ' + myYear);
	}

	setDateTime();
	setInterval(setDateTime, 1000);
	
	
	
	/* Swiper 
	==================== */
	var totalslide = $('#proj-slideshow .swiper-slide').length;
	var prefix = '';

	if(totalslide < 10) {
		prefix = '0';
	}
	
	/* Home slideshow */
	var swiperHSlideshow = new Swiper('#proj-slideshow .swiper-container', {
		navigation: {
			nextEl: '#proj-slideshow .swiper-button-next',
			prevEl: '#proj-slideshow .swiper-button-prev',
		},
		pagination: {
			el: '#proj-slideshow .swiper-pagination',
			clickable: true
		},
		autoplay: {
			delay: 5000,
		},
        loop: true,
        on: {
			init: function () {
				$('#swiper-current').empty().append(prefix + (this.realIndex + 1));
				$('#swiper-total').append('/ ' + prefix + totalslide);
			},
			slideChangeStart: function() {
				$('#swiper-current').empty().append(prefix + (this.realIndex + 1));
			}
		}
    });
    
	/* Home News */
    var swiperHScroll = new Swiper('#proj-scroll-news .swiper-container', {
        scrollbar: {
			el: '#proj-scroll-news .swiper-scrollbar',
			hide: false,
			draggable: true,
			snapOnRelease: true
		},
        slidesPerView: 'auto',
        grabCursor: true
    });
    
	/* Ads */
	var swiperAds = new Swiper('#proj-ads .swiper-container', {
		navigation: {
			nextEl: '#proj-ads .swiper-button-next',
			prevEl: '#proj-ads .swiper-button-prev',
		},
		autoplay: {
			delay: 5000,
		},
		slidesPerView: 5,
		spaceBetween: 20,
        loop: true,
        breakpoints: {
			991: {
				slidesPerView: 4
			},
			768: {
				spaceBetween: 10,
				slidesPerView: 3
			},
			480: {
				spaceBetween: 10,
				slidesPerView: 2
			},
			320: {
				spaceBetween: 10,
				slidesPerView: 1
			}
		}
    });
	
	/* Tenant Ads */
	var swiperMSlideshow = new Swiper('#proj-tenant-ads .swiper-container', {
		pagination: {
			el: '#proj-tenant-ads .swiper-pagination',
			clickable: true
		},
		autoplay: {
			delay: 5000,
		},
        loop: true
    });
    
	
	
	/* Sidebar
	==================== */
    $('.proj-sidebar-heading').on('click',function(e) {
    	$(this).parent().toggleClass('active');
    	e.preventDefault();
    })



	/* Select 
	==================== */
	$('select').select2({
		minimumResultsForSearch: Infinity,
		placeholder: 'Pilih',
	});
    
	
	
	/* Fancybox 
	==================== */
	/* Single */
	$(".proj-fancybox").fancybox({
        animationEffect   : false,
        closeClickOutside : false
	});
	
	/* iframe */
	$(".proj-fancybox-iframe").fancybox({
	});
	
	/* Gallery */
	$(".proj-fancybox-gallery").fancybox({
        idleTime  : false,
		baseClass : 'fancybox-custom-layout',
        margin    : 0,
		infobar   : false,
        thumbs    : {
            hideOnClose : false
        },
        touch : {
            vertical : 'auto'
        },
        buttons : [
            'close',
            'thumbs',
            'slideShow',
            'fullScreen',
        ],
        animationEffect   : false,
        closeClickOutside : false
	});
	
	/* Morph */
    // Step 1: Create jQuery plugin
    // ============================

    $.fn.fancyMorph = function( opts ) {

        var Morphing = function( $btn, opts ) {
            var self = this;

            self.opts = $.extend({
                animationEffect : false,
                infobar    : false,
                buttons    : ['close'],
                smallBtn   : false,
                touch      : false,
                baseClass  : 'fancybox-morphing',
                afterClose : function() {
                    self.close();
                }
            }, opts);

            self.init( $btn );
        };

        Morphing.prototype.init = function( $btn ) {
            var self = this;

            self.$btn = $btn.addClass('morphing-btn');

            self.$clone = $('<div class="morphing-btn-clone" />')
                .hide()
                .insertAfter( $btn );

            // Add wrapping element and set initial width used for positioning
            $btn.wrap( '<span class="morphing-btn-wrap"></span>' ).on('click', function(e) {
                e.preventDefault();

                self.start();
            });

        };

        Morphing.prototype.start = function() {
            var self = this;

            if ( self.$btn.hasClass('morphing-btn_circle') ) {
                return;
            }

            // Set initial width, because it is not possible to start CSS transition from "auto"
            self.$btn.width( self.$btn.width() ).parent().width( self.$btn.outerWidth() );

            self.$btn.off('.fm').on("transitionend.fm webkitTransitionEnd.fm oTransitionEnd.fm MSTransitionEnd.fm", function(e) {

                if ( e.originalEvent.propertyName === 'width' ) {
                    self.$btn.off('.fm');

                    self.animateBg();
                }

            }).addClass('morphing-btn_circle');

        };

        Morphing.prototype.animateBg = function() {
            var self = this;

            self.scaleBg();

            self.$clone.show();

            // Trigger repaint
            self.$clone[0].offsetHeight;

            self.$clone.off('.fm').on("transitionend.fm webkitTransitionEnd.fm oTransitionEnd.fm MSTransitionEnd.fm", function(e) {
                self.$clone.off('.fm');

                self.complete();

            }).addClass('morphing-btn-clone_visible');
        };

        Morphing.prototype.scaleBg = function() {
            var self = this;

            var $clone = self.$clone;
            var scale  = self.getScale();
            var $btn   = self.$btn;
            var pos    = $btn.offset();

            $clone.css({
                top       : pos.top  + $btn.outerHeight() * 0.5 - ( $btn.outerHeight() * scale * 0.5 ) - $(window).scrollTop(),
                left      : pos.left + $btn.outerWidth()  * 0.5 - ( $btn.outerWidth()  * scale * 0.5 ) - $(window).scrollLeft(),
                width     : $btn.outerWidth()  * scale,
                height    : $btn.outerHeight() * scale,
                transform : 'scale(' + ( 1 / scale ) + ')'
            });
        };

        Morphing.prototype.getScale = function() {
            var $btn    = this.$btn,
                radius  = $btn.outerWidth() * 0.5,
    			left    = $btn.offset().left + radius - $(window).scrollLeft(),
    			top     = $btn.offset().top  + radius - $(window).scrollTop(),
                windowW = $(window).width(),
                windowH = $(window).height();

            var maxDistHor  = ( left > windowW / 2 ) ? left : ( windowW - left ),
    			maxDistVert = ( top > windowH / 2 )  ? top  : ( windowH - top );

    		return Math.ceil(Math.sqrt( Math.pow( maxDistHor, 2 ) + Math.pow( maxDistVert, 2 ) ) / radius );
        };

        Morphing.prototype.complete = function() {
            var self = this;
            var $btn = self.$btn;

            $.fancybox.open({ src : $btn.data('src') || $btn.attr('href') }, self.opts);
        };

        Morphing.prototype.close = function() {
            var self   = this;
            var $clone = self.$clone;

            self.scaleBg();

            $clone.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
                $clone.hide();

                self.$btn.removeClass('morphing-btn_circle');
            });

            $clone.removeClass('morphing-btn-clone_visible');

            $(window).off('resize.fm');
        };

        // Init
        this.each(function() {
            var $this = $(this);

            if ( !$this.data("morphing") ) {
                $this.data( "morphing", new Morphing( $this, opts ) );
            }

        });

        return this;
    };


    // Step 2: Start using it!
    // =======================

    $(".proj-fancybox-morph").fancyMorph({
        hash : 'morphing'
    });
    
    /* Slideshow popup */
	$(".proj-quickview").fancybox({
		baseClass : 'quick-view-container',
		infobar   : false,
		buttons   : false,
		thumbs    : false,
        margin    : 0,
        touch     : {
            vertical : false
        },
        animationEffect    : false,
        transitionEffect   : "slide",
        transitionDuration : 500,
        clickContent : function( current, event ) {
			return false;
		},
		baseTpl :
            '<div class="fancybox-container" role="dialog">' +
				'<div class="quick-view-content">' +
					'<div class="quick-view-carousel">' +
						'<div class="fancybox-stage"></div>' +
					'</div>' +
					'<div class="quick-view-aside"></div>' +
					'<button data-fancybox-close class="quick-view-close">X</button>' +
				'</div>' +
			'</div>',

		onInit : function( instance ) {

            /*

                #1 Create bullet navigation links
                =================================

            */

            var bullets = '<ul class="quick-view-bullets">';

			for ( var i = 0; i < instance.group.length; i++ ) {
				bullets += '<li><a data-index="' + i + '" href="javascript:;"><span>' + ( i + 1 ) + '</span></a></li>';
			}

			bullets += '</ul>';

			$( bullets ).on('click touchstart', 'a', function() {
				var index = $(this).data('index');

				$.fancybox.getInstance(function() {
					this.jumpTo( index );
				});

			})
			.appendTo( instance.$refs.container.find('.quick-view-carousel') );

            /*

                #2 Create arrow navigation links
                =================================

            */
            var arrow = '<div class="quick-view-nav">';
            	arrow += '<div class="quick-view-arrow prev"><a href="javascript:;"><i class="fa fa-angle-left" aria-hidden="true"></i></a></div>';
				arrow += '<div class="quick-view-arrow next"><a href="javascript:;"><i class="fa fa-angle-right" aria-hidden="true"></i></a></div>';
				arrow += '</div>';

			$(arrow).on('click touchstart', '.quick-view-arrow.prev a', function() {
				$.fancybox.getInstance(function() {
					this.previous(0);
				});
			}).on('click touchstart', '.quick-view-arrow.next a', function() {
				$.fancybox.getInstance(function() {
					this.next(0);
				});
			})
			.appendTo( instance.$refs.container.find('.quick-view-carousel') );


            /*

                #2 Add product form
                ===================

            */

			var $element = instance.group[ instance.currIndex ].opts.$orig;
			var form_id  = $element.data('qw-form');

			instance.$refs.container.find('.quick-view-aside').append(

                // In this example, this element contains the form
                $( '#' + form_id ).clone( true ).removeClass('hidden')
            );

        },

        beforeShow : function( instance ) {

            /*
                Mark current bullet navigation link as active
            */

            instance.$refs.container.find('.quick-view-bullets')
                .children()
                .removeClass('active')
                .eq( instance.currIndex )
                .addClass('active');

        }

    });
	
	
	
	/*
	MAP
	============================
	*/
	$("#proj-map").mapbox({ 
		mousewheel: true, 
		layerSplit: 8//smoother transition for mousewheel 
	}); 
	$("#proj-map-control a").click(function() {//control panel 
		var viewport = $("#proj-map"); 
		//this.className is same as method to be called 
		if(this.className == "zoom" || this.className == "back") { 
			viewport.mapbox(this.className, 2);//step twice 
		} 
		else { 
			viewport.mapbox(this.className); 
		} 
		return false; 
	});
	
	
	
	/*
	Contact
	============================
	*/
	var target = $('#proj-contact-keperluan select option:selected').attr('data-target');
	if(target) {
		$(target).addClass('active');
	}
	
	$('#proj-contact-keperluan select').change(function() {
		var target = $('#proj-contact-keperluan select option:selected').attr('data-target');
		$('.proj-contact-keperluan').removeClass('active');
		
		if(target) {
			$(target).addClass('active');
		}
	})
	
	
	
	/*
	Upload form
	============================
	*/
	$('.form-upload input').each(function() {
		var fileName = $(this).val().split('/').pop().split('\\').pop();
		console.log(fileName);
	});
	
	
	
	/*
	Fixed menu
	============================
	*/
	scrollIntervalID = setInterval(stickIt, 10);
	
	
	
	/*
	Back to Top
	============================
	*/
	window.onscroll = function() {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			document.getElementById("proj-btt").style.display = "block";
		} else {
			document.getElementById("proj-btt").style.display = "none";
		}
	};

	// When the user clicks on the button, scroll to the top of the document
	$('#proj-btt').on('click',function() {
		$('html, body').animate({
			scrollTop:0
		}, 1000);
	})
    
    
    
})



function stickIt() {
	orgElement = $('#proj-header');
	
	if ($(window).scrollTop() > 0) {
		orgElement.addClass('fixed');
	} else {
		orgElement.removeClass('fixed');
	}
}



function loadBtn() {
	$('.loadBtn').button('loading');
}
function resetBtn() {
	$('.loadBtn').button('reset');
}