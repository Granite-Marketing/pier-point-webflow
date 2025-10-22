declare const gsap: any;
declare const ScrollTrigger: any;
// declare const SplitText: any;

export const imagesScroll = () => {
  const sections = document.querySelectorAll('.section_flashy-gallery .flashy-gallery_component');
  if (sections.length > 0) {
    sections.forEach((section) => {
      const images = section.querySelectorAll('.flashy-gallery_fig-2');
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline();
        // const titleSplit = new SplitText(section.querySelector('.flashy-gallery_title'), {
        //   type: 'chars,lines',
        // });
        // gsap.set(titleSplit.lines, {
        //   overflow: 'hidden',
        // });
        tl.to(images, {
          y: `-${images.length * 100}%`,
          ease: 'none',
        });
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
        // .to(images, {
        //   x: `-${images.length * 100}%`,
        //   // ease: 'none',
        //   scrub: true,
        // });
        ScrollTrigger.create({
          trigger: section,
          markers: false,
          pin: true,
          start: 'top top',
          // end: `+=${images.length * 100}%`,
          animation: tl,
        });
      });
    });
  }
};
