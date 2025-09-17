import { accordion } from '$utils/accordion';
import { floatingMenu } from '$utils/floatingMenu';
import { gsapBasicAnimations } from '$utils/gsapBasicAnimations';
import { gsapSmoothScroll } from '$utils/gsapSmoothScroll';
import { swiperSliders } from '$utils/swiperSliders';

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('test');
  floatingMenu();
  gsapSmoothScroll();
  accordion();
  gsapBasicAnimations();
  swiperSliders();
});
