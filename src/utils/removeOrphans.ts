function preventOrphans(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    if (element.hasAttribute('ignore-orphan')) return;
    if (!element.textContent) return;
    if (element.children.length) return; // console.log(element, 'has children, skipping');

    const textContent = element.textContent;
    const words = textContent.split(' ');

    if (words.length < 2) return;

    const lastTwoWords = words.slice(-2).join('\xA0'); // Use \xA0 for non-breaking space
    const remainingWords = words.slice(0, -2).join(' ');
    element.innerHTML = `${remainingWords} ${lastTwoWords}`;
  });
}

export const removeOrphans = () => {
  preventOrphans('p');
  preventOrphans('.orphan-free, [orphan-free]');
  preventOrphans('h1, h2, h3, h4, h5, h6');
};
