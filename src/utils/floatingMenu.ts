export const floatingMenu = () => {
  // temporary
  const floatingMenuButton = document.querySelector('.floating-menu-button');
  
  // Guard: Exit if element doesn't exist
  if (!floatingMenuButton) return;
  
  floatingMenuButton.addEventListener('click', () => {
    floatingMenuButton.classList.toggle('is-active');
    const headerMenuButton = document.querySelector('.header_menu-button');
    if (headerMenuButton) {
      headerMenuButton.click();
    }
  });
};
