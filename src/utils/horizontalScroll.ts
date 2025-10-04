declare const gsap: any;
declare const ScrollTrigger: any;

export const horizontalScroll = () => {
  const horizontalScrollSections = document.querySelectorAll('.h-scroll_transition-wrap-wrap');
  if (horizontalScrollSections.length > 0) {
    horizontalScrollSections.forEach((section) => {
      const scrollWrapper = section.querySelector('.h-scroll_transition-wrap')!;
      const tl = gsap.timeline();
      // gsap.set(scrollWrapper, {
      //   width: 'max-content',
      // });
      console.log(scrollWrapper);

      // tl.to(scrollWrapper, {
      //   x: scrollWrapper.getBoundingClientRect().width * -1,
      //   // ease: 'none',
      // });
      // ScrollTrigger.create({
      //   trigger: section,
      //   start: 'left left',
      //   end: `+=${scrollWrapper.getBoundingClientRect().width}`,
      //   scrub: true,
      //   markers: true,
      //   pin: true,
      //   animation: tl,
      // });
    });
  }
};
