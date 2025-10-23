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

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let targetHolderX = 0;
    let targetHolderY = 0;
    let currentHolderX = 0;
    let currentHolderY = 0;

    heroMask.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX - window.innerWidth / 2;
      const mouseY = e.clientY - window.innerHeight / 2;
      targetX = mouseX;
      targetY = mouseY;
      targetHolderX = mouseX;
      targetHolderY = mouseY;
    });

    // Animation loop for smooth movement with inertia
    function animateImages() {
      // Smooth interpolation towards target
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      currentHolderX += (targetHolderX - currentHolderX) * 0.1;
      currentHolderY += (targetHolderY - currentHolderY) * 0.1;

      heroImages.forEach((img, index) => {
        const i = index + 1;
        // const baseOffset = index * 5; // Add offset between images
        const distanceX = (currentX / (window.innerWidth / 2)) * (i * 7);
        const distanceY = (currentY / (window.innerHeight / 2)) * (i * 7);
        // img.style.transform = `translate(${-distanceX}%, ${-distanceY}%)`;
        gsap.to(img, {
          duration: 0,
          ease: 'power2.inOut',
          transform: `translate(${-distanceX}%, ${-distanceY}%)`,
        });
      });

      // Animate main hero image holder with velocity
      const distanceX = (currentHolderX / (window.innerWidth / 2)) * 100;
      const distanceY = (currentHolderY / (window.innerHeight / 2)) * 50;
      gsap.to(newHeroImageHolder, {
        duration: 0,
        ease: 'power2.inOut',
        xPercent: -distanceX / 100,
        yPercent: -distanceY / 100,
      });

      requestAnimationFrame(animateImages);
    }

    animateImages();

    const textTl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: (i: number) => 1 - Math.pow(1 - i, 4),
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
      markers: false,
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
