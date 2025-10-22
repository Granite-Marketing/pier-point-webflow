declare const gsap: any;
declare const ScrollTrigger: any;
declare const SplitText: any;

export const dualImage = () => {
  const sections = document.querySelectorAll('[data-animation-general]');

  if (sections.length > 0) {
    sections.forEach((section) => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          defaults: {
            duration: 1,
            ease: 'power2.inOut',
          },
        });
        //from: polygon(0 0, 100% 0, 100% 0, 0 0);
        //to: polygon(0 0, 100% 0, 100% 100%, 0 100%);

        const figures = section.querySelectorAll('figure');
        const headerTitle = section.querySelector('header > *:first-child');
        const paragraphs = section.querySelectorAll('p');
        const links = section.querySelectorAll('a.button.is-link');
        const liItems = section.querySelectorAll('li');
        const otherLinks = section.querySelectorAll('a.sticky-details_link');

        if (figures.length > 0) {
          figures.forEach((figure) => {
            gsap.set(figure, {
              clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            });
            const animationOrder = figure.getAttribute('data-animation-order');

            tl.to(
              figure,
              {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                duration: 1,
              },
              animationOrder ?? 0
            );
          });
        }

        if (headerTitle) {
          const titleSplit = new SplitText(headerTitle, {
            type: 'chars,lines',
          });
          const parent = headerTitle.parentElement;
          const isRotated = parent?.hasAttribute('data-90deg-text');

          const animationOrder = headerTitle.getAttribute('data-animation-order');

          gsap.set(titleSplit.lines, {
            overflow: 'hidden',
          });
          if (isRotated) {
            tl.fromTo(
              titleSplit.chars,
              {
                xPercent: 100,
              },
              {
                xPercent: 0,
                duration: 1,
                stagger: 0.05,
              },
              animationOrder ?? 0
            );
          } else {
            tl.fromTo(
              titleSplit.chars,
              {
                yPercent: 100,
              },
              {
                yPercent: 0,
                duration: 1,
                stagger: 0.05,
              },
              animationOrder ?? 0
            );
          }
        }

        if (paragraphs.length > 0) {
          paragraphs.forEach((paragraph) => {
            const paragraphSplit = new SplitText(paragraph, {
              type: 'words,lines',
            });
            // const animationOrder = paragraph.getAttribute('data-animation-order');

            gsap.set(paragraphSplit.lines, {
              overflow: 'hidden',
            });
            gsap.set(paragraphSplit.words, {
              yPercent: 100,
            });
            tl.to(
              paragraphSplit.words,
              {
                yPercent: 0,
                duration: 1,
                stagger: 0.05,
              },
              '-=1'
              // animationOrder ?? 0
            );
          });
        }

        if (links.length > 0) {
          links.forEach((link) => {
            const linkSplit = new SplitText(link.querySelector('div'), {
              type: 'chars,lines',
            });
            // const animationOrder = link.getAttribute('data-animation-order');
            const icon = link.querySelector('svg');
            gsap.set(link, {
              overflow: 'hidden',
            });
            gsap.set(linkSplit.lines, {
              overflow: 'hidden',
            });
            // gsap.set(icon, {
            //   yPercent: 140,
            // });
            // gsap.set(linkSplit.chars, {
            //   yPercent: 100,
            // });
            tl.fromTo(
              linkSplit.chars,
              {
                yPercent: 100,
              },
              {
                yPercent: 0,
                // duration: 1,
                stagger: 0.05,
              },
              '-=1'
            ).fromTo(
              icon,
              {
                yPercent: 140,
              },
              {
                yPercent: 0,
                // duration: 1,
                stagger: 0.1,
              },
              '-=1'
            );
          });
        }

        if (liItems.length > 0) {
          liItems.forEach((li) => {
            const liSplit = new SplitText(li, {
              type: 'chars,lines',
            });
            gsap.set(liSplit.lines, {
              overflow: 'hidden',
            });
            tl.fromTo(
              liSplit.chars,
              {
                yPercent: 120,
              },
              {
                yPercent: 0,
                stagger: 0.01,
              },
              '-=1'
            );
          });
        }

        if (otherLinks.length > 0) {
          otherLinks.forEach((otherLink) => {
            const otherLinkSplit = new SplitText(otherLink.querySelector('div'), {
              type: 'chars,lines',
            });
            gsap.set(otherLink, {
              overflow: 'hidden',
            });
            gsap.set(otherLinkSplit.lines, {
              overflow: 'hidden',
            });
            tl.fromTo(
              otherLink.querySelector('svg'),
              {
                yPercent: 140,
              },
              {
                yPercent: 0,
              },
              '-=1'
            ).fromTo(
              otherLinkSplit.lines,
              {
                yPercent: 100,
              },
              {
                yPercent: 0,
              },
              '-=.75'
            );
          });
        }

        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          markers: false,
          animation: tl,
        });
      });

      mm.add('(max-width: 767px)', () => {
        const figures = section.querySelectorAll('figure');
        const headerTitle = section.querySelector('header > *:first-child');
        const paragraphs = section.querySelectorAll('p');
        const links = section.querySelectorAll('a.button.is-link');
        const liItems = section.querySelectorAll('li');
        const otherLinks = section.querySelectorAll('a.sticky-details_link');

        if (figures.length > 0) {
          figures.forEach((figure) => {
            const tl = gsap.timeline({
              defaults: {
                duration: 1,
                ease: 'power2.inOut',
              },
            });
            gsap.set(figure, {
              clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            });

            tl.to(figure, {
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              duration: 1,
            });
            ScrollTrigger.create({
              trigger: figure,
              start: 'top 50%',
              markers: false,
              animation: tl,
            });
          });
        }

        if (headerTitle) {
          const tl = gsap.timeline({
            defaults: {
              duration: 1,
              ease: 'power2.inOut',
            },
          });
          const titleSplit = new SplitText(headerTitle, {
            type: 'chars,lines',
          });
          const parent = headerTitle.parentElement;
          const isRotated = parent?.hasAttribute('data-90deg-text');

          gsap.set(titleSplit.lines, {
            overflow: 'hidden',
          });
          if (isRotated) {
            tl.fromTo(
              titleSplit.chars,
              {
                xPercent: 100,
              },
              {
                xPercent: 0,
                duration: 1,
                stagger: 0.05,
              }
            );
          } else {
            tl.fromTo(
              titleSplit.chars,
              {
                yPercent: 100,
              },
              {
                yPercent: 0,
                duration: 1,
                stagger: 0.05,
              }
            );
          }
          ScrollTrigger.create({
            trigger: headerTitle,
            start: 'top 50%',
            markers: false,
            animation: tl,
          });
        }

        if (paragraphs.length > 0) {
          paragraphs.forEach((paragraph) => {
            const tl = gsap.timeline({
              defaults: {
                duration: 1,
                ease: 'power2.inOut',
              },
            });
            const paragraphSplit = new SplitText(paragraph, {
              type: 'words,lines',
            });
            // const animationOrder = paragraph.getAttribute('data-animation-order');

            gsap.set(paragraphSplit.lines, {
              overflow: 'hidden',
            });
            gsap.set(paragraphSplit.words, {
              yPercent: 100,
            });
            tl.to(paragraphSplit.words, {
              yPercent: 0,
              duration: 1,
              stagger: 0.05,
            });
            ScrollTrigger.create({
              trigger: paragraph,
              start: 'top 50%',
              markers: false,
              animation: tl,
            });
          });
        }

        if (links.length > 0) {
          links.forEach((link) => {
            const tl = gsap.timeline({
              defaults: {
                duration: 1,
                ease: 'power2.inOut',
              },
            });
            const linkSplit = new SplitText(link.querySelector('div'), {
              type: 'chars,lines',
            });
            // const animationOrder = link.getAttribute('data-animation-order');
            const icon = link.querySelector('svg');
            gsap.set(link, {
              overflow: 'hidden',
            });
            gsap.set(linkSplit.lines, {
              overflow: 'hidden',
            });
            tl.fromTo(
              linkSplit.chars,
              {
                yPercent: 100,
              },
              {
                yPercent: 0,
                // duration: 1,
                stagger: 0.05,
              }
            ).fromTo(
              icon,
              {
                yPercent: 140,
              },
              {
                yPercent: 0,
                // duration: 1,
                stagger: 0.1,
              },
              '-=1'
            );
            ScrollTrigger.create({
              trigger: link,
              start: 'top 50%',
              markers: false,
              animation: tl,
            });
          });
        }

        if (liItems.length > 0) {
          const tl = gsap.timeline({
            defaults: {
              duration: 1,
              ease: 'power2.inOut',
            },
          });
          liItems.forEach((li) => {
            const liSplit = new SplitText(li, {
              type: 'chars,lines',
            });
            gsap.set(liSplit.lines, {
              overflow: 'hidden',
            });
            tl.fromTo(
              liSplit.chars,
              {
                yPercent: 120,
              },
              {
                yPercent: 0,
                stagger: 0.01,
              }
            );
            ScrollTrigger.create({
              trigger: li.parentElement,
              start: 'top 50%',
              markers: false,
              animation: tl,
            });
          });
        }

        if (otherLinks.length > 0) {
          otherLinks.forEach((otherLink) => {
            const tl = gsap.timeline({
              defaults: {
                duration: 1,
                ease: 'power2.inOut',
              },
            });
            const otherLinkSplit = new SplitText(otherLink.querySelector('div'), {
              type: 'chars,lines',
            });
            gsap.set(otherLink, {
              overflow: 'hidden',
            });
            gsap.set(otherLinkSplit.lines, {
              overflow: 'hidden',
            });
            tl.fromTo(
              otherLink.querySelector('svg'),
              {
                yPercent: 140,
              },
              {
                yPercent: 0,
              }
            ).fromTo(
              otherLinkSplit.lines,
              {
                yPercent: 100,
              },
              {
                yPercent: 0,
              },
              '-=.75'
            );
            ScrollTrigger.create({
              trigger: otherLink,
              start: 'top 50%',
              markers: false,
              animation: tl,
            });
          });
        }
      });
    });
  }
};
