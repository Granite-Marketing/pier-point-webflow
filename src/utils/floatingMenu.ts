export const floatingMenu = () => {
  // temporary
  const floatingMenuButton = document.querySelector('.floating-menu-button');
  floatingMenuButton.addEventListener('click', () => {
    const headerMenuButton = document.querySelector('.header_menu-button');
    headerMenuButton.click();
  });
};
