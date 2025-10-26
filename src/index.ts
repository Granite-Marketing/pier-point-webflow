import { accordion } from '$utils/accordion';
import { colorScroll } from '$utils/colorScroll';
import { diningSlider } from '$utils/diningSwiper';
import { dualImage } from '$utils/dualImage';
import { floatingMenu } from '$utils/floatingMenu';
import { fsCmsFilter } from '$utils/fsCmsFilter';
import { gsapBasicAnimations } from '$utils/gsapBasicAnimations';
import { gsapSmoothScroll } from '$utils/gsapSmoothScroll';
import { heroImageAnimations } from '$utils/HeroImageScale';
import { horizontalScroll } from '$utils/horizontalScroll';
import { imageNarrow } from '$utils/ImageNarrow';
import { imagesScroll } from '$utils/imagesScroll';
import { initMap } from '$utils/map';
import { mapNeeds } from '$utils/mapNeeds';
import { modals } from '$utils/modals';
import { removeOrphans } from '$utils/removeOrphans';
import { roomsCards } from '$utils/roomsCards';
import { sortItems } from '$utils/sortItems';
import { swiperSliders } from '$utils/swiperSliders';

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('test');
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
  heroImageAnimations();
  dualImage();
  roomsCards();
  horizontalScroll();
  imagesScroll();
  imageNarrow();
  colorScroll();

  setTimeout(() => {
    initMap();
  }, 1000);
});
