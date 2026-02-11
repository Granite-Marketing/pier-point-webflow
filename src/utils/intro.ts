declare const gsap: any;

export const intro = () => {
  return new Promise<void>(async (resolve) => {
    const lottieElement = document.querySelector('[data-lottie]');

    // Guard: If no lottie element exists, just resolve immediately
    if (!lottieElement) {
      console.log('No lottie element found, skipping intro animation');
      resolve();
      return;
    }

    // @ts-ignore
    const links = lottieElement.getAttribute('data-lottie').split(',');
    // get random link from the links array
    const randomLink = links[Math.floor(Math.random() * links.length)];

    console.log({ randomNumber: Math.floor(Math.random() * links.length) });
    const { DotLottie } = await import(
      // @ts-ignore
      'https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@latest/+esm'
    );

    const target = document.querySelector('#intro');
    console.log(target);
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      width: 100%;
    `;

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
