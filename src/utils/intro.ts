declare const gsap: any;

export const intro = () => {
  return new Promise<void>(async (resolve) => {
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
      src: 'https://cdn.prod.website-files.com/68c00dcc8c67464e31fe5b94/696f1daa714a6c90a5f7a618_27829337cde845d1aa0c75db678fcb5d.json',
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
