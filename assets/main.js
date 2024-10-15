window.onscroll = () => {
  document.querySelector(".mountain").style.marginTop = scrollY + "px";

  document.querySelector(".trees").style.marginTop = scrollY / 1.5 + "px";

  document.querySelector(".stars").style.marginTop = scrollY * 2 + "px";

  document.querySelector(".stars").style.marginRight = scrollY / 2 + "px";

  document.querySelector(".moon").style.transform =
    "rotate(-" + scrollY / 5.5 + "deg)";
};

let initialSlide = 0;

if (window.matchMedia("(min-width: 1024px)").matches) {
  initialSlide = 2; 
}

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  initialSlide: initialSlide, 
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  keyboard: {
    enabled: true,
  },
  mousewheel: {
    thresholdDelta: 70,
  },
  spaceBetween: 30,
  loop: false,
  touchRatio: 1, 
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Optional: Add event listener to update the active class
swiper.on("slideChange", function () {
  // Perform any actions when the slide changes
});
