declare const gsap: any;
declare const ScrollTrigger: any;
declare const Flip: any;
declare const SplitText: any;

const mouseMoveAnimation = () => {
  const heroMask = document.querySelector('.section_hero-mask') as HTMLElement;
  const heroImages = document.querySelectorAll(
    '[hero-image-masker] .hero-mask_fig'
  ) as NodeListOf<HTMLElement>;
  const newHeroImageHolder = document.querySelector(
    '.section_hero-home .hero-home_bg'
  ) as HTMLElement;

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

  function animateImages() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;
    currentHolderX += (targetHolderX - currentHolderX) * 0.1;
    currentHolderY += (targetHolderY - currentHolderY) * 0.1;

    heroImages.forEach((img, index) => {
      const i = index + 1;
      const distanceX = (currentX / (window.innerWidth / 2)) * (i * 7);
      const distanceY = (currentY / (window.innerHeight / 2)) * (i * 7);
      gsap.to(img, {
        duration: 0,
        ease: 'power2.inOut',
        transform: `translate(${-distanceX}%, ${-distanceY}%)`,
      });
    });

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
};

const flipVideoAnimation = () => {
  const newHeroImageHolder = document.querySelector(
    '.section_hero-home .hero-home_bg'
  ) as HTMLElement;
  const heroImage = document.querySelector('.hero-mask_fig:has(video)');
  const sectionTitle = document.querySelector('.section_hero-home .hero-home_title');
  const sectionDes = document.querySelector('.section_hero-home .hero-home_content p');

  const state = Flip.getState(heroImage);
  newHeroImageHolder.appendChild(heroImage!);
  const mm = gsap.matchMedia();

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
      heroImage?.querySelector('.u-overlay'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
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
      '-=.5'
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
  mm.add('(min-width: 768px)', () => {
    ScrollTrigger.create({
      trigger: newHeroImageHolder,
      start: 'top 20%',
      markers: false,
      animation: textTl,
      toggleActions: 'play none play reverse',
    });
  });
  mm.add('(max-width: 767px)', () => {
    ScrollTrigger.create({
      trigger: newHeroImageHolder,
      start: 'top 40%',
      markers: false,
      animation: textTl,
      toggleActions: 'play none play reverse',
    });
  });
};

const introAnimation = () => {
  const svg = document.querySelector('.hero-mask_logo');
  const mobSvg = document.querySelector('.header_logo.mob');
  const images = document.querySelectorAll('.hero-mask_fig-wrap .hero-mask_fig');
  const scrollTexts = document.querySelectorAll('.hero-mask_footer');

  const tl = gsap.timeline();
  // if (!svg || !images) return;

  const scrollTextLines = Array.from(scrollTexts).map(
    (scrollText) =>
      new SplitText(scrollText, {
        type: 'lines',
        mask: 'lines',
      }).lines
  );

  const mm = gsap.matchMedia();

  gsap.set([svg, mobSvg], {
    overflow: 'hidden',
  });

  mm.add('(min-width: 768px)', () => {
    tl.fromTo(
      svg?.querySelectorAll('path'),
      {
        yPercent: 100,
      },
      {
        yPercent: 0,
        delay: 0.5,
        duration: 1,
        ease: 'expo.out',
      }
    );
  });
  mm.add('(max-width: 767px)', () => {
    tl.fromTo(
      mobSvg?.querySelectorAll('path'),
      {
        yPercent: 250,
      },
      {
        yPercent: 0,
        delay: 0.5,
        // duration: 1,
        stagger: 0.05,
        ease: 'expo.out',
      }
    );
  });
  tl.fromTo(
    images,
    {
      clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
    },
    {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1,
      stagger: 0.05,
      ease: 'expo.out',
    },
    '-=.5'
  ).fromTo(
    scrollTextLines,
    {
      yPercent: 100,
    },
    {
      yPercent: 0,
    },
    '-=.5'
  );
};

const headerAnimation = () => {
  const header = document.querySelector('.header_bar');
  const cta = document.querySelector('.floating-cta');
  const triggerSection = document.querySelector('.section_hero-home');

  const tl = gsap.timeline();
  const mm = gsap.matchMedia();

  mm.add('(min-width: 768px)', () => {
    tl.fromTo(
      header,
      {
        yPercent: -100,
      },
      {
        yPercent: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      },
      '0'
    );
  });
  tl.fromTo(
    cta,
    {
      yPercent: 200,
    },
    {
      yPercent: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    },
    '0'
  );
  ScrollTrigger.create({
    trigger: triggerSection,
    start: 'top top',
    end: 'bottom bottom',
    animation: tl,
    toggleActions: 'play none none reverse',
    markers: false,
  });
};

export const setupHeroIntro = () => {
  const svg = document.querySelector('.hero-mask_logo');
  const mobSvg = document.querySelector('.header_logo.mob');
  const images = document.querySelectorAll('.hero-mask_fig-wrap .hero-mask_fig');
  const scrollTexts = document.querySelectorAll('.hero-mask_footer');

  const header = document.querySelector('.header_component');
  const headerBar = document.querySelector('.header_bar');

  const cta = document.querySelector('.floating-cta');

  const mm = gsap.matchMedia();

  const scrollTextLines = Array.from(scrollTexts).map(
    (scrollText) =>
      new SplitText(scrollText, {
        type: 'lines',
        mask: 'lines',
      }).lines
  );

  gsap.set([svg, mobSvg], {
    overflow: 'hidden',
  });

  mm.add('(min-width: 768px)', () => {
    gsap.set(svg?.querySelectorAll('path'), {
      yPercent: 100,
    });
    gsap.set(headerBar, {
      yPercent: -100,
    });
  });
  mm.add('(max-width: 767px)', () => {
    gsap.set(mobSvg?.querySelectorAll('path'), {
      yPercent: 250,
    });
  });

  gsap.set(images, {
    clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
  });
  gsap.set(scrollTextLines, {
    yPercent: 100,
  });

  gsap.set(cta, {
    yPercent: 200,
  });
};

export const heroImageAnimations = () => {
  const heroImage = document.querySelector('.hero-mask_fig:has(video)');

  const newHeroImageHolder = document.querySelector(
    '.section_hero-home .hero-home_bg'
  ) as HTMLElement;

  if (heroImage && newHeroImageHolder) {
    introAnimation();
    flipVideoAnimation();
    mouseMoveAnimation();
    headerAnimation();
  }
};
