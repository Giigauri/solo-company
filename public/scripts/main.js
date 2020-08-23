$(window).on('load', function () {
    $('#status').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
})

$(function() {
    $("#team-members").owlCarousel({
        items: 2,
        autoplay: true,
        smartSpeed: 700,
        loop: true,
        autoplayHoverPause: true,
        nav: true,
        dots: false,
        navText: ['<i class="fas fa-chevron-circle-left"></i>', '<i class="fas fa-chevron-circle-right"></i>']
    });
});

/* Progress Bar Animation */

$(function() {
    $(".progress-bar").each(function() {

        $(this).animate({
            width: $(this).attr("aria-valuenow") + "%"
        }, 9000);

    });
});

/* Portfolio */

$(window).on('load', function() {
    $("#isotope-filters").on('click', 'button', function() {
        var filterValue = $(this).attr('data-filter');

        $(".isotope").isotope({
            filter: filterValue
        });

        $("#isotope-filters").find('.active').removeClass('active');
        $(this).addClass('active');
    });
});

/* Magnific Picture */

$(function() {
    $("#portfolio-wrapper").magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });
})

/* Testimonial Slider */

$(function() {
    $("#testimonial-slider").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 700,
        loop: true,
        autoplayHoverPause: true,
        nav: true,
        dots: false,
        navText: ['<i class="fas fa-chevron-circle-left"></i>', '<i class="fas fa-chevron-circle-right"></i>']
    });

    $("#main-carousel").owlCarousel({
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        autoplay: true,
        smartSpeed: 700,
        loop: true,
        autoplayHoverPause: true,
        nav: false,
        dots: false
    });

});

/* Back to Top */

$(function() {

    $(window).scroll(function() {

        if( $(window).scrollTop() > 50) {

            $("#back-to-top").fadeIn();

        } else{

            $("#back-to-top").fadeOut();            

        }

    });

    $(window).on('load',function() {

            if( $(window).scrollTop() > 50) {

                $("#back-to-top").fadeIn();
    
            } else{
    
                $("#back-to-top").fadeOut();            
    
            }

    });

});

/* Counter UP */

$(function () {

    $(".counter").counterUp({
        delay: 10,
        time: 2000
    });

});

/* Smooth scroll */

$(function () {

    $("a.smooth-scroll").click(function (event) {

        event.preventDefault();

        var section_id = $(this).attr("href");

        $("html, body").animate({
            scrollTop: $(section_id).offset().top -64
        }, 1250);

    });

});


// animate on scroll
$(function () {
    new WOW().init();
});

/* =========================================
                Open Confirm Modal
============================================ */
$(function () {
    $('.edit-btn').on('click', function() {
        const userId = $(this).data('id')
        const firstName = $(this).data('firstName')
        const lastName = $(this).data('lastName')
        const status = $(this).data('status')
        const gender = $(this).data('gender')
        
        $('[name="id"]').val(userId)
        $('[name="first_name"]').val(firstName)
        $('[name="last_name"]').val(lastName)
        $('[name="gender"]').find(`[data-title=${gender}]`).attr('selected', true)
        $('[name="status"]').find(`[data-title=${status}]`).attr('selected', true)
        $('#EditConfirm').modal('show')

    })

    $('.delete-btn').on('click', function() {
        const id = $(this).data('id')
        const url = `/delete/${id}`
        $('#confirmUrl').attr('href', url)
        $('#DeleteConfirm').modal('show')
    })
});


/* =========================================
                Pagination Js Scripts
============================================ */
/* Pagination script writte in footer.ejs */





/* =========================================
            Reset Email Ajax - Fetch
============================================ */
$('#resetEmail').on('blur', function() {
    const email = $(this).val()
    const csrf = $(this).data(`csrf`)
    fetch(`/auth/checkemail/${email}`, {
        method: 'POST',
        headers: {
            'X-CSRF-Token': csrf,
            'Content-Type': `application/json`
        }
    })
    .then((data) =>{
        return data.json()
    })
    .then((data) => {
        console.log(data)
        if (data.find == "no") {
            $("#psw-btn").attr("disabled", true)
        } else {
            $("#psw-btn").attr("disabled", false)
        }
    })
});