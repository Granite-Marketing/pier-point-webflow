declare const Swiper: any;

export const swiperSliders = () => {
  const sliderWrapper = document.querySelectorAll('[swiper_slider]');

  if (sliderWrapper) {
    sliderWrapper.forEach((slider) => {
      const defaultSlider = slider.querySelector('[swiper][swiper-default]');
      const swiperWrapper = slider.querySelector('[swiper-wrapper]');
      const swiperSlides = slider.querySelectorAll('[swiper-slide]');
      const nextEl = slider.querySelector('[swiper-button-next]');
      const prevEl = slider.querySelector('[swiper-button-prev]');

      if (defaultSlider) {
        defaultSlider.classList.add('swiper');
        swiperWrapper?.classList.add('swiper-wrapper');
        swiperSlides.forEach((s) => s.classList.add('swiper-slide'));

        const swiper = new Swiper(defaultSlider as HTMLElement, {
          loop: true,
          speed: 1000,
          slidesPerView: 'auto',
          grabCursor: true,
          watchSlidesProgress: true,
          navigation: {
            prevEl: prevEl,
            nextEl: nextEl,
          },
        });
      }
    });
  }
};
