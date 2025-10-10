declare const gsap: any;
declare const ScrollTrigger: any;

export const horizontalScroll = () => {
  if (matchMedia('(min-width: 992px)').matches === false) return;
  const horizontalScrollSections = document.querySelectorAll('.h-scroll_transition-wrap-wrap');
  if (horizontalScrollSections.length > 0) {
    horizontalScrollSections.forEach((section) => {
      const scrollWrapper = section.querySelector('.h-scroll_transition-wrap')!;
      const tl = gsap.timeline();

      gsap.set(scrollWrapper, {
        position: 'relative',
      });

      tl.to(scrollWrapper, {
        x: '100vw',
        xPercent: -100,
        ease: 'none',
      });
      tl.to('.section_img-mosaic .img-mosaic_component', {
        yPercent: -90,
        ease: 'none',
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${scrollWrapper.getBoundingClientRect().width}`,
        scrub: true,
        markers: false,
        pin: true,
        animation: tl,
      });
    });
  }
};
