var shouldPause = false;
document.addEventListener(
  "wheel",
  function(e) {
    // get the old value of the translation (there has to be an easier way than this)
    var oldVal = parseInt(
      document
        .getElementById("body")
        .style.transform.replace("translateY(", "")
        .replace("px)", "")
    );

    // to make it work on IE or Chrome
    var variation = parseInt(e.deltaY);

    // update the body translation to simulate a scroll
    document.getElementById("body").style.transform =
      "translateY(" + (oldVal - variation) + "px)";

      // next sectoion
    if (e.deltaY > 2) {
          
        if(shouldPause) return;
        shouldPause = true;

        console.log('next section');

        var currSection = $('section.active');
        var nextSection = currSection.next('section');

        if (nextSection.length) {
            currSection.removeClass('active');
            nextSection.addClass("active");
            
            // set active menu
            setActiveClass(nextSection);

        }

        setTimeout(function(){
            shouldPause = false;

        }, 2000);

    }

      if (e.deltaY < -2) {

          if (shouldPause) return;
          shouldPause = true;

          console.log('previous section');

          var currSection = $('section.active');
          var prevSection = currSection.prev('section');
          console.log(prevSection)

          if(prevSection.length) {
              currSection.removeClass('active');
              prevSection.addClass("active");

            // set active menu
            setActiveClass(prevSection);

          } else {
              
          }

          if(!prevSection.prev('section').length) {
              $canvas = $("canvas");
              $canvas.animate({ opacity: 0, filter: "blur(0)", "-webkit-filter": "blur(0px)", filter: "blur(0px)" }, 1000);
          }

          setTimeout(function () {
              shouldPause = false;

          }, 2000);

      }

    return false;
  },
  true
);

function setActiveClass($currentSection) {
    $(".page-title").text($currentSection.attr('data-title'));
}

// swiper
var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 0,
        modifier: 0,
        slideShadows: false,
    },
    pagination: {
        el: '.swiper-pagination',
    },
});

$('.js-team-carousel').owlCarousel({
    autoplay: true,
    loop: false,
    margin: 20,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
        },
        768: {
            items: 2,
        },
        1299: {
            items: 3,
        }
    }
})

$('.js-brands').owlCarousel({
    autoplay: true,
    loop: true,
    dots: true,
    // nav: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
        0: {
            items: 2,
        },
        320: {
            items: 2
        },
        480: {
            items: 2
        },
        552: {
            items: 4
        },
        768: {
            items: 5,
            margin: 20
        },
        1000: {
            items: 6,
            margin: 20
        },
    }
});
// swiper.slideTo(1);

$('.js-hamburger').on('click', function(e) {
    e.preventDefault();

    $('.side-nav').toggleClass('open');
});

// init
$('#career-form').hide();
$(".contact-tab").on('click', '.nav-link', function (e) {
    e.preventDefault();
    $(".contact-tab")
        .find(".nav-link")
        .removeClass("active");

    $(this).addClass('active');

    var formId = $(this).attr('data-form');

    $(".active-form").removeClass('active-form').hide();
    $("#" + formId).addClass('active-form').show();
});

$(".side-nav").on('click', 'a', function(e) {
    e.preventDefault();

    $('section.active').removeClass('active');
    var moveTo = $(this).attr("href");

    if ($(window).width() >= 768) {
        $(moveTo).addClass('active');

    } else {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(moveTo).offset().top
        }, 2000);
    }


    $(".side-nav").removeClass('open');
});