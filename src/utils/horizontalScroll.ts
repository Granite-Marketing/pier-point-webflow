declare const gsap: any;
declare const ScrollTrigger: any;

export const horizontalScroll = () => {
  const horizontalScrollSections = document.querySelectorAll('.section_h-scroll');
  if (horizontalScrollSections.length > 0) {
    horizontalScrollSections.forEach((section) => {
      const scrollWrapper = section.querySelector('.h-scroll_collection')!;
      const tl = gsap.timeline();

      tl.to(section.querySelector('.h-scroll_component'), {
        x: scrollWrapper.getBoundingClientRect().width * -1,
        // ease: 'none',
      });
      ScrollTrigger.create({
        trigger: section,
        start: 'left left',
        end: `+=${scrollWrapper.getBoundingClientRect().width}`,
        scrub: true,
        markers: false,
        pin: true,
        animation: tl,
      });
    });
  }
};
