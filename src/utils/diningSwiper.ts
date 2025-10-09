declare const Swiper: any;

export const diningSwiper = () => {
  const swiperEl = document.querySelector('.slider-2_collection-wrap.is-texts');
  if (!swiperEl) return;
  const swiperWrapper = swiperEl.querySelector('.slider-2_collection');
  const swiperSlides = swiperWrapper?.querySelectorAll('.slider-2_item');

  const nextEl = swiperEl.parentElement.querySelector('[swiper-button-next]') ?? null;
  const prevEl = swiperEl.parentElement.querySelector('[swiper-button-prev]') ?? null;

  swiperEl.classList.add('swiper');
  swiperWrapper?.classList.add('swiper-wrapper');
  swiperSlides?.forEach((s) => s.classList.add('swiper-slide'));

  const swiper = new Swiper(swiperEl as HTMLElement, {
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

  swiper.on('slideChange', () => {
    const activeIndex = swiper.realIndex;
    console.log('activeIndex', activeIndex);

    // TO DO BY ABDUL
  });

  const imagesCollectionWrap = document.querySelector('.slider-2_collection-wrap.is-images');
  const imageCards = imagesCollectionWrap.querySelectorAll('.slider-2_item');
  imageCards.forEach((card, index) => {
    // each card should correspond to the active slide from the swiper above
    // at the same time each card has its own carousel inside
    const carousel = card.querySelector('.slider-2_card-images-wrap');
    // TO DO BY ABDUL
  });
};
