declare const ScrollTrigger: any;

const checkElementOverlap = () => {
  const header = document.querySelector('.header');
  const target = document.querySelector('.section_img-mosaic.is-transition');

  if (!header || !target) {
    console.warn('Required elements not found.');
    return;
  }

  function isIntersecting(rect1, rect2) {
    return !(
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom ||
      rect1.right < rect2.left ||
      rect1.left > rect2.right
    );
  }

  function applyCSSVariablesToBody(variables) {
    if (!variables || typeof variables !== 'object') {
      console.warn('Invalid input: expected an object of CSS variables.');
      return;
    }

    Object.entries(variables).forEach(([key, value]) => {
      document.body.style.setProperty(key, value);
    });
  }

  function updateIntersectionStatus() {
    const headerRect = header.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    if (isIntersecting(headerRect, targetRect)) {
      // console.log('.header is overlapping .section_img-mosaic.is-transition');
      applyCSSVariablesToBody(window.COLOR_THEMES[1]);
    } else {
      // console.log('.header is NOT overlapping .section_img-mosaic.is-transition');
      applyCSSVariablesToBody(window.COLOR_THEMES[0]);
    }
  }

  // Store listeners so we can remove them later
  window.__overlapListeners = () => {
    window.addEventListener('scroll', updateIntersectionStatus, { passive: true });
    window.addEventListener('resize', updateIntersectionStatus);
    updateIntersectionStatus(); // Initial check
  };

  window.__removeOverlapListeners = () => {
    window.removeEventListener('scroll', updateIntersectionStatus);
    window.removeEventListener('resize', updateIntersectionStatus);
  };

  window.__overlapListeners();
};

const colorScrollForHScroll = () => {
  if (!window.COLOR_THEMES) return;
  const scrollWrap = document.querySelector('.h-scroll_transition-wrap-wrap');

  if (!scrollWrap) {
    console.warn('.h-scroll_transition-wrap-wrap not found.');
    return;
  }

  const scrollWrapper = scrollWrap.querySelector('.h-scroll_transition-wrap');

  ScrollTrigger.create({
    trigger: scrollWrap,
    start: 'top top',
    end: `+=${scrollWrapper ? scrollWrapper.getBoundingClientRect().width : 0}`,
    onEnter: () => checkElementOverlap(),
    onEnterBack: () => checkElementOverlap(),
    onLeave: () => {
      if (typeof window.__removeOverlapListeners === 'function') {
        window.__removeOverlapListeners();
      }
    },
    onLeaveBack: () => {
      if (typeof window.__removeOverlapListeners === 'function') {
        window.__removeOverlapListeners();
      }
    },
  });
};

export { colorScrollForHScroll };
