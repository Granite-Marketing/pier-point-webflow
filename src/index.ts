import { accordion } from '$utils/accordion';
import { gsapBasicAnimations } from '$utils/gsapBasicAnimations';
import { gsapSmoothScroll } from '$utils/gsapSmoothScroll';
import { swiperSliders } from '$utils/swiperSliders';

window.Webflow ||= [];
window.Webflow.push(() => {
  gsapSmoothScroll();
  accordion();
  gsapBasicAnimations();
  swiperSliders();
});
