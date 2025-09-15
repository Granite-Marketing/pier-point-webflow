import { accordion } from '$utils/accordion';
import { gsapBasicAnimations } from '$utils/gsapBasicAnimations';
import { gsapSmoothScroll } from '$utils/gsapSmoothScroll';
import { swiperSliders } from '$utils/swiperSliders';
import { gsap } from 'gsap';

window.Webflow ||= [];
window.Webflow.push(() => {
  gsapSmoothScroll();
  accordion();
  gsapBasicAnimations(gsap, ScrollTrigger);
  swiperSliders();
});
