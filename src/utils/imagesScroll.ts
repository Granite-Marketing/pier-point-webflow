declare const gsap: any;
declare const ScrollTrigger: any;

export const imagesScroll = () => {
  const sections = document.querySelectorAll('.section_flashy-gallery .flashy-gallery_component');
  if (sections.length > 0) {
    sections.forEach((section) => {
      const images = section.querySelectorAll('.flashy-gallery_fig-2');

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
        end: '+=150%',
        animation: tl,
      });
    });
  }
};
