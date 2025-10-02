declare const gsap: any;
declare const ScrollTrigger: any;
declare const Lenis: any;

let lenis = null;

export const gsapSmoothScroll = () => {
  // Initialize a new Lenis instance for smooth scrolling
  lenis = new Lenis({
    prevent: (node) => node.getAttribute('data-prevent-lenis') === 'true',
  });

  // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  lenis.on('scroll', ScrollTrigger.update);

  // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  // This ensures Lenis's smooth scroll animation updates on each GSAP tick
  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
  });

  // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  gsap.ticker.lagSmoothing(0);
};

export const stopSmoothScroll = () => {
  lenis.stop();
};

export const startSmoothScroll = () => {
  lenis.start();
};
