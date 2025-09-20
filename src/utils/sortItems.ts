export const sortItems = () => {
  const parents = document.querySelectorAll('[data-sort]');

  parents.forEach((parent) => {
    const children = parent.querySelectorAll('[data-sort-order]');
    children.forEach((child) => {
      const sort = child.getAttribute('data-sort-order');
      if (!sort) return;
      child.style.order = sort;
    });
  });
};
