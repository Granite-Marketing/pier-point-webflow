declare const gsap: any;
declare const ScrollTrigger: any;
declare const Flip: any;
declare const SplitText: any;

export const heroImageAnimations = () => {
  //   const heroImage = document.querySelector('[hero-image-masker]:nth-child(3)'); // in general take random one
  const heroMask = document.querySelector('.section_hero-mask') as HTMLElement;
  const heroImage = document.querySelector('.hero-mask_fig:has(video)');

  const newHeroImageHolder = document.querySelector(
    '.section_hero-home .hero-home_bg'
  ) as HTMLElement;
  const sectionTitle = document.querySelector('.section_hero-home .hero-home_title');
  const sectionDes = document.querySelector('.section_hero-home .hero-home_content p');

  if (heroImage && newHeroImageHolder) {
    // heroImage.style.cssText = 'position: relative; z-index: 100;';
    const state = Flip.getState(heroImage);
    newHeroImageHolder.appendChild(heroImage);
    const mm = gsap.matchMedia();

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

    const textTl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: (i) => 1 - Math.pow(1 - i, 4),
      },
    });

    mm.add('(min-width:768px)', () => {
      gsap.set(sectionTitle, {
        textWrap: 'nowrap',
      });
    });
    mm.add('(max-width:768px)', () => {
      gsap.set(sectionTitle, {
        textWrap: 'wrap',
      });
    });

    const titleSplit = new SplitText(sectionTitle, {
      type: 'words,lines',
      mask: 'lines',
    });
    const desSplit = new SplitText(sectionDes, {
      type: 'words,lines',
      mask: 'lines',
    });

    textTl
      .fromTo(
        newHeroImageHolder.querySelector('.u-overlay'),
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
        }
      )
      .fromTo(
        titleSplit.lines,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
        },
        '-=.25'
      )
      .fromTo(
        desSplit.lines,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
        },
        '-=.75'
      );

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
    ScrollTrigger.create({
      trigger: newHeroImageHolder,
      start: 'top center',
      end: 'bottom bottom',
      scrub: true,
      markers: false,
      animation: gsap.to(heroImage, {
        border: '0',
      }),
    });
    ScrollTrigger.create({
      trigger: newHeroImageHolder,
      start: 'top top',
      // end: 'bottom bottom',
      // scrub: true,
      markers: true,
      animation: textTl,
      toggleActions: 'play none play reverse',
    });
    // .fromTo(
    //   titleSplit.lines,
    //   {
    //     yPercent: 100,
    //   },
    //   {
    //     yPercent: 0,
    //   }
    // )
    // .fromTo(
    //   desSplit.lines,
    //   {
    //     yPercent: 100,
    //   },
    //   {
    //     yPercent: 0,
    //     stagger: 0.05,
    //   }
    // ),
  }
};
