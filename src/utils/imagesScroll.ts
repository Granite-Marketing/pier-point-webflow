declare const gsap: any;
declare const ScrollTrigger: any;

export const imagesScroll = () => {
  const sections = document.querySelectorAll('.section_flashy-gallery .flashy-gallery_component');
  if (sections.length > 0) {
    sections.forEach((section) => {
      const images = section.querySelectorAll('.flashy-gallery_fig');
      const tl = gsap.timeline();
      tl.to(images, {
        y: `-${images.length * 50}%`,
        ease: 'none',
        stagger: 'top',
      });
      ScrollTrigger.create({
        trigger: section,
        markers: true,
        pin: true,
        scrub: true,
        start: 'top top',
        end: '+=200%',
        animation: tl,
      });
    });
  }
};
