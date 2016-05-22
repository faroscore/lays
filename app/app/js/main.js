(function() {
    var scroll = $(document).scrollTop();
    var screenHeight = $(window).height();


    var screenWidth = $(window).width();

    if (screenWidth <= 640) {
        $('.summer--photo').insertAfter($('.summer--map'));
    }

    $(window).resize(function() {
        var screenWidth = $(window).width();

        if (screenWidth <= 640) {
            $('.summer--photo').insertAfter($('.summer--map'));
        } else {
            $('.summer--map').insertAfter($('.summer--photo'));
        }
    })

    $('.nav--burger').on('click', toggleMobileMenu);
    $('.nav--mobile-close').on('click',toggleMobileMenu);


    checkOffset(scroll, screenHeight);

    setTimeout(function() {
        $('.header--promo-item-title').eq(0).removeClass('faded');
        $('.header--promo-item-logo__photo').removeClass('faded');
    }, 1000)
    setTimeout(function() {
        $('.header--promo-item-title').eq(1).removeClass('faded');
        $('.header--promo-item-logo__like').removeClass('faded');
    }, 1500);
    setTimeout(function() {
        $('.header--promo-item-title').eq(2).removeClass('faded');
        $('.header--promo-item-logo__prize').removeClass('faded');
    }, 2000);
    $(document).scroll(function() {
        scroll = $(this).scrollTop();
        screenHeight = $(window).height();
        checkOffset(scroll, screenHeight);
    });

    $('.nav--item').on('click', function() {
        if ($(this).hasClass('nav--item__selected')) {
            return;
        }
        $('.nav--item__selected').removeClass('nav--item__selected');

        var previousContent = $('.content').find('.current-content');
        previousContent.animate({ 'opacity': 0 }, 400);
        var newContent = $('.' + $(this).data('content'));
        console.log($(this).data('content'))
        $(this).addClass('nav--item__selected');
    })

    function checkOffset(scroll, screenHeight) {
        if (scroll > $('.about').offset().top - screenHeight / 1.1) {
            $('.about').find('.left-moved').removeClass('left-moved');
            $('.about').find('.right-moved').removeClass('right-moved');
        }
        if (scroll > $('.summer').offset().top - screenHeight / 1.1) {
            $('.summer').find('.left-moved').removeClass('left-moved');
            $('.summer').find('.right-moved').removeClass('right-moved');
        }
    }

    function toggleMobileMenu() {
        $('.nav--mobile-item').eq(0)
            .toggleClass('nav--mobile-item__left-moved');

        $('.nav--mobile-item').eq(1)
            .toggleClass('nav--mobile-item__right-moved');

        $('.nav--mobile-item').eq(2)
            .toggleClass('nav--mobile-item__left-moved');

        $('.nav--mobile-close')
            .toggleClass('nav--mobile-item__right-moved');

        if ($('.nav--mobile').hasClass('nav--mobile__activated')) {
            setTimeout(function() {
                $('.nav--mobile').toggleClass('nav--mobile__activated');
            }, 400)
        } else {

            $('.nav--mobile').toggleClass('nav--mobile__activated');
        }
    }
}())
