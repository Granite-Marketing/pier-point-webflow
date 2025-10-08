import { accordion } from '$utils/accordion';
import { dualImage } from '$utils/dualImage';
import { floatingMenu } from '$utils/floatingMenu';
import { gsapBasicAnimations } from '$utils/gsapBasicAnimations';
import { gsapSmoothScroll } from '$utils/gsapSmoothScroll';
import { heroImageAnimations } from '$utils/HeroImageScale';
import { horizontalScroll } from '$utils/horizontalScroll';
import { imageNarrow } from '$utils/ImageNarrow';
import { imagesScroll } from '$utils/imagesScroll';
import { initMap } from '$utils/map';
import { mapNeeds } from '$utils/mapNeeds';
import { modals } from '$utils/modals';
import { sortItems } from '$utils/sortItems';
import { swiperSliders } from '$utils/swiperSliders';

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('test');
  mapNeeds();
  sortItems();
  floatingMenu();
  gsapSmoothScroll();
  accordion();
  gsapBasicAnimations();
  swiperSliders();
  modals();
  heroImageAnimations();
  dualImage();
  horizontalScroll();
  imagesScroll();
  imageNarrow();
  setTimeout(() => {
    initMap();
  }, 1000);
});
