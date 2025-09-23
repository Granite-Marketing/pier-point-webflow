import { accordion } from '$utils/accordion';
import { floatingMenu } from '$utils/floatingMenu';
import { gsapBasicAnimations } from '$utils/gsapBasicAnimations';
import { gsapSmoothScroll } from '$utils/gsapSmoothScroll';
import { heroImageAnimations } from '$utils/HeroImageScale';
import { modals } from '$utils/modals';
import { sortItems } from '$utils/sortItems';
import { swiperSliders } from '$utils/swiperSliders';

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('test');
  sortItems();
  floatingMenu();
  gsapSmoothScroll();
  accordion();
  gsapBasicAnimations();
  swiperSliders();
  modals();
  heroImageAnimations();
});
