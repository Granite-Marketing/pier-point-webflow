export const fsCmsFilter = () => {
  const clears = document.querySelectorAll('.filter_radio-wrap.is-clear');

  clears.forEach((c) => {
    c.classList.add('fs-cmsfilter_active');
    c.addEventListener('click', () => {
      c.classList.add('fs-cmsfilter_active');
    });

    const form = c.closest('form');
    form.addEventListener('change', () => {
      const inputs = form.querySelectorAll('input[type="radio"]');
      let anyChecked = false;
      inputs.forEach((input) => {
        if (input.checked) anyChecked = true;
      });
      if (!anyChecked) {
        c.classList.add('fs-cmsfilter_active');
      } else {
        c.classList.remove('fs-cmsfilter_active');
      }
    });
  });
};
