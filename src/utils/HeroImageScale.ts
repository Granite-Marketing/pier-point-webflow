declare const gsap: any;
declare const ScrollTrigger: any;
declare const Flip: any;

export const heroImageAnimations = () => {
  //   const heroImage = document.querySelector('[hero-image-masker]:nth-child(3)'); // in general take random one
  const heroMask = document.querySelector('.section_hero-mask') as HTMLElement;
  const heroImage = document.querySelector('.hero-mask_fig:has(video)');

  const newHeroImageHolder = document.querySelector(
    '.section_hero-home .hero-home_bg'
  ) as HTMLElement;

  if (heroImage && newHeroImageHolder) {
    // heroImage.style.cssText = 'position: relative; z-index: 100;';
    const state = Flip.getState(heroImage);
    newHeroImageHolder.appendChild(heroImage);

    const heroImages = document.querySelectorAll(
      '[hero-image-masker] .hero-mask_fig'
    ) as NodeListOf<HTMLElement>;
    heroMask.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      heroImages.forEach((img, index) => {
        const i = index + 1;
        const distanceX = (mouseX / window.innerWidth) * (i * 2);
        const distanceY = (mouseY / window.innerHeight) * (i * 2);
        // img.style.transform = `translate(${-distanceX}%, ${-distanceY}%)`;
        gsap.to(img, {
          duration: 0,
          ease: 'power2.inOut',
          transform: `translate(${-distanceX}%, ${-distanceY}%)`,
        });
      });
      const distanceX = (mouseX / window.innerWidth) * 100;
      const distanceY = (mouseY / window.innerHeight) * 50;
      // newHeroImageHolder.style.cssText = `translateX(${-distanceX}px) translateY(${-distanceY}px)`;
      gsap.to(newHeroImageHolder, {
        duration: 0,
        ease: 'power2.inOut',
        xPercent: -distanceX / 100,
        yPercent: -distanceY / 100,
      });
    });

    ScrollTrigger.create({
      trigger: newHeroImageHolder,
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: true,
      markers: false,
      animation: Flip.from(state, {
        duration: 1,
        ease: 'power2.inOut',
        x: 0,
        y: 0,
        scale: false,
      }),
    });
  }
};
