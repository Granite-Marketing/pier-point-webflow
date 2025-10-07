declare const gsap: any;
declare const ScrollTrigger: any;

export const imageNarrow = () => {
  // Ask mico to add specific class for this
  const imageNarrow = document.querySelector('.hero_fig');
  const image = imageNarrow?.querySelector('img');
  const tl = gsap.timeline();
  gsap.set(imageNarrow, {
    overflow: 'hidden',
  });
  tl.to(
    imageNarrow,
    {
      scale: 0.9,
    },
    '0'
  );
  tl.to(
    image,
    {
      y: -100,
      scale: 1.2,
    },
    '0'
  );

  ScrollTrigger.create({
    trigger: imageNarrow,
    start: 'top 30%',
    end: 'center center',
    scrub: true,
    markers: false,
    animation: tl,
  });
};
