export const accordion = () => {
  const accordionTrigger = document.querySelectorAll('.accordion_header');

  if (accordionTrigger) {
    accordionTrigger.forEach((item, index) => {
      const contentWrapper = item.nextElementSibling;
      contentWrapper.style.maxHeight = '0px';

      /*
       ** Set accessibility
       */
      let accordionId = `accordion-${index}`;
      let accordionTargetId = `accordion-target-${index}`;

      // Trigger
      item.id = accordionId;
      item.setAttribute('aria-controls', accordionTargetId);

      // Target
      item.nextSibling.id = accordionTargetId;
      item.nextSibling.setAttribute('labelledby', accordionId);

      item.addEventListener('click', (e) => {
        e.preventDefault();
        const contentWrapperHeight =
          contentWrapper.querySelector('.accordion_content').offsetHeight;
        toggleAccordion(item, contentWrapperHeight);
      });
    });
  }

  function toggleAccordion(item, height) {
    // Close all other accordion items first
    accordionTrigger.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.setAttribute('aria-expanded', 'false');
        otherItem.classList.remove('is-active');
        const otherContent = otherItem.nextElementSibling;
        if (otherContent) {
          otherContent.style.maxHeight = '0px';
        }
      }
    });

    // Toggle the clicked item
    let ariaExpanded = item.getAttribute('aria-expanded');
    ariaExpanded = ariaExpanded === 'true' ? 'false' : 'true';
    item.setAttribute('aria-expanded', ariaExpanded);
    item.classList.toggle('is-active');
    const text = item.nextElementSibling;
    if (text) {
      text.style.maxHeight = text.style.maxHeight === '0px' ? `${height + 9 * 14}px` : '0px';
    }
  }
};
