const selectH2ForAnimation = () => {
  const sections = document.querySelectorAll('.section_two-img-imba.is-2');
  sections.forEach((section) => {
    const headers = section.querySelectorAll('header');
    headers.forEach((header) => {
      if (!header.hasAttribute('mq')) return;
      if (matchMedia('(max-width: 767px)').matches) {
        if (header.getAttribute('mq') === 'desk') {
          header.setAttribute('dont-animate', 'true');
        }
      } else {
        if (header.getAttribute('mq') === 'mob') {
          header.setAttribute('dont-animate', 'true');
        }
      }
    });
  });
};

export { selectH2ForAnimation };
