declare const gsap: any;
declare const ScrollTrigger: any;

export const colorScroll = () => {
  // attribute value checker
  function attr(defaultVal, attrVal) {
    const defaultValType = typeof defaultVal;
    if (typeof attrVal !== 'string' || attrVal.trim() === '') return defaultVal;
    if (attrVal === 'true' && defaultValType === 'boolean') return true;
    if (attrVal === 'false' && defaultValType === 'boolean') return false;
    if (isNaN(attrVal) && defaultValType === 'string') return attrVal;
    if (!isNaN(attrVal) && defaultValType === 'number') return +attrVal;
    return defaultVal;
  }
  const colorThemes = [];
  const htmlStyles = getComputedStyle(document.documentElement);
  const targetStylesheet = document.querySelector('#color-themes');
  const regex = /--([^:\s]+):\s*var\(--([^)]+)\);/g;

  if (targetStylesheet) {
    const rules = targetStylesheet.sheet.cssRules || targetStylesheet.sheet.rules;
    for (const rule of rules) {
      const styleObject = {};
      let match;
      while ((match = regex.exec(rule.cssText)) !== null) {
        const key = '--' + match[1];
        const value = htmlStyles.getPropertyValue('--' + match[2]);
        styleObject[key] = value;
      }
      colorThemes.push(styleObject);
    }

    const durationSetting = attr(0.4, targetStylesheet.getAttribute('speed')),
      easeSetting = attr('power1.out', targetStylesheet.getAttribute('ease')),
      offsetSetting = attr(50, targetStylesheet.getAttribute('percent-from-top')),
      breakpointSetting = attr(0, targetStylesheet.getAttribute('min-width'));
    gsap.registerPlugin(ScrollTrigger);

    const triggerElements = document.querySelectorAll('section, footer.footer, [color-mode]');
    triggerElements.forEach((element, index) => {
      if (element.hasAttribute('color-mode-ignore')) return;
      let modeIndex = 1;
      if (element.hasAttribute('color-mode')) {
        modeIndex = element?.getAttribute('color-mode') ?? '1';
        modeIndex = parseInt(modeIndex);
      } else {
        const bgColor = getComputedStyle(element).getPropertyValue('background-color');
        console.log(element.classList[0], bgColor);
        if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') modeIndex = 2;
      }

      let endSetting = `clamp(bottom ${offsetSetting}%)`;

      if (element.getBoundingClientRect().height <= window.innerHeight)
        endSetting = `clamp(bottom -${offsetSetting}%)`;

      if (index === triggerElements.length - 1) endSetting = `bottom ${offsetSetting}%`;
      gsap.matchMedia().add(`(min-width: ${breakpointSetting}px)`, () => {
        const colorScroll = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: `clamp(top ${offsetSetting}%)`,
            end: endSetting,
            toggleActions: 'play complete none reverse',
          },
        });
        colorScroll.to('body', {
          ...colorThemes[modeIndex - 1],
          duration: durationSetting,
          ease: easeSetting,
        });
      });
    });
  }

  // Handle different heading styles
  const mainWrapper = document.querySelector('.main-wrapper');
  const navColor = mainWrapper.dataset.navColor;
  console.log(navColor);
  if (navColor === 'light') {
    // Clear nav scroll styles on navigation
    setTimeout(() => {
      document.querySelector('body')?.setAttribute('style', '');
    }, 15);
  } else if (navColor === 'dark' || navColor === undefined) {
    // Clear nav scroll styles on navigation
    setTimeout(() => {
      document
        .querySelector('body')
        ?.setAttribute(
          'style',
          '--color--text: var(--text-color--text-primary); --color-button-background: #100b00; --color-background: #100b00;'
        );
    }, 15);
  }
};
