import Router from '../../../router/Router';
import { learnWordsAPIService } from '../../../services/learnWordsAPIService';

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

export async function greeting() {
  const response = await learnWordsAPIService.getUser(localStorage.getItem('userId'), localStorage.getItem('token'));

  const greetingForUser = document.querySelector('.greeting-for-user');
  greetingForUser.innerHTML = `Привет, ${response.name}`;
}

export const setSidebarHeight = () => {
  const rootHeight = Math.max(
    document.querySelector('#root').scrollHeight,
    document.querySelector('#root').offsetHeight,
    document.querySelector('#root').clientHeight,
  );
  console.log('rootHeight', rootHeight);
  const sidebar = document.querySelector('nav.side-navbar');
  sidebar.style.height = `${rootHeight}px`;
  console.log('sidebar', sidebar.style.height);
};
