import Router from '../router/Router';

export const setSidebarItem = () => {
  const sideMenuItems = document.querySelectorAll('.side-navbar ul li a');
  const url = Router.getUrl();

  sideMenuItems.forEach((el) => {
    el.parentElement.classList.remove('active');
    if (el.getAttribute('href') === `#${url}`) {
      el.parentElement.classList.add('active');
    }
  });
};
