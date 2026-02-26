import { accordion } from '$utils/accordion';
import { colorScroll } from '$utils/colorScroll';
import { diningSlider } from '$utils/diningSwiper';
import { dualImage } from '$utils/dualImage';
import { floatingMenu } from '$utils/floatingMenu';
import { fsCmsFilter } from '$utils/fsCmsFilter';
import { gsapBasicAnimations } from '$utils/gsapBasicAnimations';
import { gsapSmoothScroll } from '$utils/gsapSmoothScroll';
import { heroImageAnimations, setupHeroIntro } from '$utils/HeroImageScale';
import { horizontalScroll } from '$utils/horizontalScroll';
import { imageNarrow } from '$utils/ImageNarrow';
import { imagesScroll } from '$utils/imagesScroll';
import { initMap } from '$utils/map';
import { mapNeeds } from '$utils/mapNeeds';
import { modals } from '$utils/modals';
import { removeOrphans } from '$utils/removeOrphans';
import { sortItems } from '$utils/sortItems';
import { roomsCards } from '$utils/roomsCards';
import { swiperSliders } from '$utils/swiperSliders';
import { colorScrollForHScroll } from '$utils/colorScrollForHScroll';
import { intro } from '$utils/intro';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Only run home page intro/hero animations if the elements exist
  const isHomePage = document.querySelector('[data-lottie]');
  window.TESTCOMMIT = 'testcommit';
  if (isHomePage) {
    setupHeroIntro();
    intro().then(() => {
      heroImageAnimations();
    });
  }

  mapNeeds();
  sortItems();
  removeOrphans();
  fsCmsFilter();
  floatingMenu();
  gsapSmoothScroll();
  accordion();
  gsapBasicAnimations();
  swiperSliders();
  diningSlider();
  modals();
  dualImage();
  roomsCards();
  horizontalScroll();
  imagesScroll();
  imageNarrow();
  colorScroll();
  colorScrollForHScroll();

  setTimeout(() => {
    initMap();
  }, 1000);
});
