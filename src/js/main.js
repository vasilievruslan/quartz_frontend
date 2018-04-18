'use strict'

//= slick.js
//= anime.min.js
//= jquery.touchSwipe.min.js

$(function () {

	$.get('https://wex.nz/api/3/ticker/btc_usd-eth_usd', function(data) {
		
		$('#btc_usd').html(Math.floor(data.btc_usd.avg));
		$('#eth_usd').html(Math.floor(data.eth_usd.avg));

	}, 'jsonp');
	
	//= cards-slider.js

	$('.members__slider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		fade: true,
		dots: true,
	})
	
	$('.carousel').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: [
	    {
	      breakpoint: 824,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 2,
	        infinite: true,
	      }
	    },
	    {
	      breakpoint: 600,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        centerMode: true,
	        fade: true,
	      }
	    }]
	});

	//menu navbar

	$('.bt-menu').click(function(e) {
		e.preventDefault();
    	$(this).toggleClass('active');
    	$('.header__container').toggleClass('active');
    	$('.header__nav').toggleClass('open');
	});

	// roadmap

	$(window).scroll(function(){
		if ( $(window).scrollTop() > 43 ) {
			$('.header__container').addClass('scroll');
			$('footer.block').fadeOut('200');
		}else{
			$('.header__container').removeClass('scroll')
			$('footer.block').fadeIn('400');
		}

		var sb = $(this).scrollTop() + $(this).height();
		
		try {
			var mp = $('.roadmap').offset().top + $('.roadmap').height() / 2;
		} catch(e) {
			console.log(e);
		}

		if(sb > mp){
			progress.play()
		}
	});

	var rects = document.querySelectorAll('.progress__rect')
	var progress = anime({
		direction: 'reverse',
		targets: rects,
		width: 0,
		easing: 'linear',
	})

	setTimeout(function(){
		progress.pause(); 
	}, 50)


	$('.roadmap__responsive').click(function(event) {
		$('.roadmap__responsive__container').slideToggle(600);
		$('.rm__arrow').toggleClass('active');
		$('.roadmap__responsive__button').toggleClass('active');
	});

	// countdown


	var second = 1000,
		minute = second * 60,
		hour = minute * 60,
		day = hour * 24;

	var countDown = new Date('Apr 26, 2018 00:00:00 UTC'),
	x = setInterval(function() {

		var now = new Date().getTime(),
		distance = countDown - now;
		var arr = [Math.floor(distance / (day)), Math.floor((distance % (day)) / (hour)), Math.floor((distance % (hour)) / (minute)), Math.floor((distance % (minute)) / second)]

		for (var i = arr.length - 1; i >= 0; i--) {
			if (arr[i] < 10) {
				arr[i] = '0' + arr[i]
			}
		}
		
		$('#days').html(arr[0]),
		$('#hours').html(arr[1]),
		$('#minutes').html(arr[2]),
		$('#seconds').html(arr[3]);

		if (distance < 0) {
		 clearInterval(x);
		}

	}, second)


	// calculator

	var price = 0.125223

	$('#input').keyup(function(event) {
		var res = parseFloat($('#input').val()) / price
		$('#output').val(res.toFixed(2))
	});


	// pop-up video

	var stopVideo = function(player) {
    var vidSrc = player.prop('src');
	    player.prop('src', ''); // to force it to pause
	    player.prop('src', vidSrc);
	};

	$('.rose__playbtn').click(function(event) {
		event.preventDefault();
		$('.pop-up').fadeIn(400);
	});

	$('.close-btn').click(function() {
		$('.pop-up').fadeOut(400);
		stopVideo($('#qvideo'))
	});
	$('.pop-layout').click(function(){
		$('.pop-up').fadeOut(400);
		stopVideo($('#qvideo'))
	})


	//scrollTo

	$('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.attr('tabindex', '-1');
                        $target.focus();
                    };
                });
            }
        }
    });


    // faq accordion

    $('.faq__item').click(function(event) {
    	$(this)
    	.toggleClass('active')
		.find('.item__p')
		.slideToggle(400)
		.parent()
		.siblings()
		.removeClass('active')
		.find('.item__p')
		.slideUp(400);
    });
	
})