import { stopSmoothScroll, startSmoothScroll } from '$utils/gsapSmoothScroll';

export const modals = () => {
  const modalButtons = document.querySelectorAll('[button-function="modal-open"]');
  modalButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const type = button.getAttribute('button-function-arg1');
      const name = button.getAttribute('button-function-arg2');
      const modal = document.querySelector(`[modal][modal-type=${type}][modal-name=${name}]`);
      modal?.setAttribute('is-open', '');

      document.body.style.top = `-${window.scrollY}px`;
      document.body.classList.add('no-scroll');
      stopSmoothScroll();
    });
  });

  const modalCloseButtons = document.querySelectorAll('[modal-close]');
  modalCloseButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      let scrollY = document.body.style.top;
      scrollY = parseInt(scrollY || '0') * -1;

      button.closest('[modal]')?.removeAttribute('is-open');

      document.body.classList.remove('no-scroll');
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
      startSmoothScroll();
    });
  });
};
