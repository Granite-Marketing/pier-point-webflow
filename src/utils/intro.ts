declare const gsap: any;

export const intro = () => {
  return new Promise<void>(async (resolve) => {
    // @ts-ignore
    const links = document.querySelector('[data-lottie]').getAttribute('data-lottie').split(',');
    // get random link from the links array
    const randomLink = links[Math.floor(Math.random() * links.length)];

    console.log(randomLink);
    const { DotLottie } = await import(
      // @ts-ignore
      'https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@latest/+esm'
    );

    const target = document.querySelector('#intro');

    const canvas = document.createElement('canvas');
    canvas.id = 'lottie-animation';
    target?.appendChild(canvas);

    const dotLottie = new DotLottie({
      canvas,
      src: randomLink,
      autoplay: true,
    });

    dotLottie.addEventListener('complete', () => {
      gsap.to('#intro', {
        autoAlpha: 0,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          target?.remove();
          resolve();
        },
      });
    });
  });
};
