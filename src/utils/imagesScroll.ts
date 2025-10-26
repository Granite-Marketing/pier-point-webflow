declare const gsap: any;
declare const ScrollTrigger: any;
// declare const SplitText: any;

export const imagesScroll = () => {
  const sections = document.querySelectorAll('.section_flashy-gallery .flashy-gallery_component');
  if (sections.length > 0) {
    sections.forEach((section) => {
      // const imageWrappers = section.querySelectorAll('.flashy-gallery_fig-2-wrap');
      const images = section.querySelectorAll('.flashy-gallery_fig-2');
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline();
        tl
          // .fromTo(section, { scaleX: 0.95 }, { scaleX: 1 }, '0')
          // .to(
          //   imageWrappers,
          //   {
          //     yPercent: -100,
          //   },
          //   '0'
          // )
          .to(
            images,
            {
              y: `-${images.length * 100}%`,
              ease: 'none',
            },
            '0'
          );
        ScrollTrigger.create({
          trigger: section,
          markers: false,
          pin: true,
          scrub: true,
          start: 'top top',
          end: `+=${images.length * 75}%`,
          animation: tl,
        });
      });
      mm.add('(max-width: 767px)', () => {
        const tl = gsap.timeline();
        tl.to(section, {
          width: '100%',
          height: '100%',
        });
        ScrollTrigger.create({
          trigger: section,
          markers: false,
          pin: true,
          start: 'top top',
          animation: tl,
        });
      });
    });
  }
};
