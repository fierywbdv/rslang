export const setSidebarItem = () => {
  const sideMenuItems = document.querySelectorAll('.side-navbar ul li a');
  const url = window.location.hash;

  sideMenuItems.forEach((el) => {
    el.parentElement.classList.remove('active');
    if (el.getAttribute('href') === url) {
      el.parentElement.classList.add('active');
    }
  });
};

export const setSidebarHeight = () => {
  const rootHeight = Math.max(
    document.querySelector('#root').scrollHeight,
    document.querySelector('#root').offsetHeight,
    document.querySelector('#root').clientHeight,
  );
  const sidebar = document.querySelector('nav.side-navbar');
  sidebar.style.height = `${rootHeight}px`;
};
