declare const gsap: any;
declare const SplitText: any;
declare const ScrollTrigger: any;

const animateCard = (card: Element) => {
  const title = card.querySelector('h3');
  const figure = card.querySelector('.img-mosaic_fig');

  const tl = gsap.timeline();

  tl.fromTo(
    figure,
    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'power2.out', duration: 0.5 }
  ).fromTo(
    title?.querySelectorAll('.word'),
    { yPercent: 100 },
    { yPercent: 0, ease: 'power2.out', stagger: 0.1, duration: 0.5 }
  );
};

export const horizontalScroll = () => {
  if (matchMedia('(min-width: 992px)').matches === false) return;

  const horizontalScrollSections = document.querySelectorAll('.h-scroll_transition-wrap-wrap');

  if (horizontalScrollSections.length === 0) return;

  horizontalScrollSections.forEach((section) => {
    const scrollWrapper = section.querySelector('.h-scroll_transition-wrap');
    const blueSectionHeaderTitle = section.querySelector('.img-mosaic_header h2');
    const blueSectionCards = Array.from(section.querySelectorAll('.img-mosaic_item'));

    if (!scrollWrapper) return;

    const titleSplit = new SplitText(blueSectionHeaderTitle, {
      type: 'words',
      mask: 'words',
      reduceWhiteSpace: true,
    });

    gsap.set(titleSplit.words, { yPercent: 100 });
    gsap.set(scrollWrapper, { position: 'relative' });

    // ✅ Hide all cards before the section is entered
    blueSectionCards.forEach((card) => {
      const figure = card.querySelector('.img-mosaic_fig');
      const title = card.querySelector('h3');

      gsap.set(figure, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      });

      if (title) {
        const split = new SplitText(title, { type: 'words', mask: 'words', wordsClass: 'word' });
        gsap.set(split.words, { yPercent: 100 });
      }
    });

    const animatedCards = new Set<number>();
    const cardThresholds = blueSectionCards.map((_, i) => i / blueSectionCards.length);

    const tl = gsap.timeline();

    tl.to(scrollWrapper, {
      x: '100vw',
      xPercent: -100,
      ease: 'none',
    });

    tl.to('.section_img-mosaic .img-mosaic_component', {
      yPercent: -90,
      ease: 'none',
      onUpdate: function () {
        const progress = this.progress();

        cardThresholds.forEach((threshold, i) => {
          if (progress >= threshold && !animatedCards.has(i)) {
            animatedCards.add(i);
            animateCard(blueSectionCards[i]);
          }
        });
      },
    });

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${scrollWrapper.getBoundingClientRect().width}`,
      scrub: true,
      pin: true,
      animation: tl,
    });
  });
};
