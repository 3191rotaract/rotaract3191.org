(function ($) {
  "use strict";

  /* 1. Proloder */
  $(window).on("load", function () {
    $("#preloader-active").delay(450).fadeOut("slow");
    $("body").delay(450).css({
      overflow: "visible",
    });
  });

  /* 2. sticky And Scroll UP */
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 400) {
      $(".header-sticky").removeClass("sticky-bar");
      $("#back-top").fadeOut(500);
    } else {
      $(".header-sticky").addClass("sticky-bar");
      $("#back-top").fadeIn(500);
    }
  });

  // Scroll Up
  $("#back-top a").on("click", function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      800
    );
    return false;
  });

  /* 3. slick Nav */
  // mobile_menu
  var menu = $("ul#navigation");
  if (menu.length) {
    menu.slicknav({
      prependTo: ".mobile_menu",
      closedSymbol: "+",
      openedSymbol: "-",
    });
  }

  /* 4. MainSlider-1 */
  // h1-hero-active
  function mainSlider() {
    var BasicSlider = $(".slider-active");
    BasicSlider.on("init", function (e, slick) {
      var $firstAnimatingElements = $(".single-slider:first-child").find(
        "[data-animation]"
      );
      doAnimations($firstAnimatingElements);
    });
    BasicSlider.on(
      "beforeChange",
      function (e, slick, currentSlide, nextSlide) {
        var $animatingElements = $(
          '.single-slider[data-slick-index="' + nextSlide + '"]'
        ).find("[data-animation]");
        doAnimations($animatingElements);
      }
    );
    BasicSlider.slick({
      autoplay: false,
      autoplaySpeed: 4000,
      dots: false,
      fade: true,
      arrows: false,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    });

    function doAnimations(elements) {
      var animationEndEvents =
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
      elements.each(function () {
        var $this = $(this);
        var $animationDelay = $this.data("delay");
        var $animationType = "animated " + $this.data("animation");
        $this.css({
          "animation-delay": $animationDelay,
          "-webkit-animation-delay": $animationDelay,
        });
        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }
  }
  mainSlider();

  /* 5. Testimonial Active*/
  var testimonial = $(".h1-testimonial-active");
  if (testimonial.length) {
    testimonial.slick({
      dots: true,
      infinite: true,
      speed: 1000,
      autoplay: false,
      arrows: false,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            arrow: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrow: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrow: true,
          },
        },
      ],
    });
  }

  /* 6. Nice Selectorp  */
  var nice_Select = $("select");
  if (nice_Select.length) {
    nice_Select.niceSelect();
  }

  /* 7. data-background */
  $("[data-background]").each(function () {
    $(this).css(
      "background-image",
      "url(" + $(this).attr("data-background") + ")"
    );
  });

  /* 10. WOW active */
  new WOW().init();

  // 11. ---- Mailchimp js --------//
  function mailChimp() {
    $("#mc_embed_signup").find("form").ajaxChimp();
  }
  mailChimp();

  // 12 Pop Up Img
  var popUp = $(".single_gallery_part, .img-pop-up");
  if (popUp.length) {
    popUp.magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });
  }
  // 12 Pop Up Video
  var popUp = $(".popup-video");
  if (popUp.length) {
    popUp.magnificPopup({
      type: "iframe",
    });
  }

  /* 13. counterUp*/
  $(".counter").counterUp({
    delay: 10,
    time: 3000,
  });

  /* 14. Datepicker */
  $("#datepicker1").datepicker();

  // 15. Time Picker
  $("#timepicker").timepicker();

  //16. Overlay
  $(".snake").snakeify({
    speed: 200,
  });

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  window.addEventListener("load", () => {
    const glightbox = GLightbox({
      selector: ".glightbox",
    });
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Initiate portfolio details lightbox
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: ".portfolio-details-lightbox",
    width: "90%",
    height: "90vh",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators");
  let heroCarouselItems = select("#heroCarousel .carousel-item", true);

  heroCarouselItems.forEach((item, index) => {
    index === 0 ?
      (heroCarouselIndicators.innerHTML +=
        "<li data-bs-target='#heroCarousel' data-bs-slide-to='" +
        index +
        "' class='active'></li>") :
      (heroCarouselIndicators.innerHTML +=
        "<li data-bs-target='#heroCarousel' data-bs-slide-to='" +
        index +
        "'></li>");
  });

  document.addEventListener('DOMContentLoaded', function () {
    var heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
      heroCarousel.addEventListener('slid.bs.carousel', function () {
        // You can add custom JavaScript here for further effects on slide change.
      });
    }
  });
  

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  const pdfItems = document.getElementsByClassName('pdf-item');

function openPdf(pdfPath) {
  if (isMobile()) {
    window.open(pdfPath, '_blank');
  } else {
    document.querySelector('.pdf-popup').classList.add('active');
    const pdfIframe = document.getElementById('pdf-iframe');
    pdfIframe.src = pdfPath;
    pdfIframe.onload = function () {
      document.querySelector('.pdf-preloader').style.display = 'none';
    };
  }
}

function closePdf() {
  document.querySelector('.pdf-popup').classList.remove('active');
  document.getElementById('pdf-iframe').src = '';
  document.querySelector('.pdf-preloader').style.display = 'flex';
}

function downloadPdf(pdfPath) {
  const link = document.createElement('a');
  link.href = pdfPath;
  link.download = pdfPath.split('/').pop();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function filterPDFs() {
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();

  for (let i = 0; i < pdfItems.length; i++) {
    const pdfName = pdfItems[i].querySelector('.pdf-name').innerText.toLowerCase();
    if (pdfName.includes(searchTerm)) {
      pdfItems[i].style.display = 'flex';
    } else {
      pdfItems[i].style.display = 'none';
    }
  }
}


  //17.  Progress barfiller

  $("#bar1").barfiller();
  $("#bar2").barfiller();
  $("#bar3").barfiller();
  $("#bar4").barfiller();
  $("#bar5").barfiller();
  $("#bar6").barfiller();
})(jQuery);
