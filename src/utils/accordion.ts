export const accordion = () => {
  const accordionTrigger = document.querySelectorAll('.accordion_header');

  if (accordionTrigger) {
    accordionTrigger.forEach((item, index) => {
      /*
       ** Set accessibility
       */
      let accordionId = `accordion-${index}`;
      let accordionTargetId = `accordion-target-${index}`;

      // Trigger
      item.id = accordionId;
      item.setAttribute('aria-controls', accordionTargetId);

      // Target
      const target = item.nextElementSibling;
      if (target) {
        target.id = accordionTargetId;
        target.setAttribute('aria-labelledby', accordionId);
      }

      item.addEventListener('click', () => {
        toggleAccordion(item);
      });
    });
  }

  function toggleAccordion(item: any) {
    let ariaExpanded = item.getAttribute('aria-expanded');
    ariaExpanded = ariaExpanded === 'true' ? 'false' : 'true';
    item.setAttribute('aria-expanded', ariaExpanded);
    item.classList.toggle('is-active');
    const text = item.nextElementSibling;
    if (text) {
      text.classList.toggle('is-active');
    }
  }
};
