declare const gsap: any;
declare const ScrollTrigger: any;

export const imagesScroll = () => {
  const sections = document.querySelectorAll('.section_flashy-gallery .flashy-gallery_component');
  if (sections.length > 0) {
    sections.forEach((section) => {
      const images = section.querySelectorAll('.flashy-gallery_fig-2');
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline();
        tl.to(images, {
          y: `-${images.length * 50}%`,
          ease: 'none',
        });
        ScrollTrigger.create({
          trigger: section,
          markers: false,
          pin: true,
          scrub: true,
          start: 'top top',
          end: `+=${images.length * 50}%`,
          animation: tl,
        });
      });
      mm.add('(max-width: 767px)', () => {
        const tl = gsap.timeline();
        tl.to(images, {
          x: `-${images.length * 50}%`,
          ease: 'none',
        });
        ScrollTrigger.create({
          trigger: section,
          markers: false,
          pin: true,
          scrub: true,
          start: 'top top',
          end: `+=${images.length * 50}%`,
          animation: tl,
        });
      });
    });
  }
};
