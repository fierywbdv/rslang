import Router from '../../../router/Router';
import { learnWordsAPIService } from '../../../services/learnWordsAPIService';

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

export async function greeting() {
  const response = await learnWordsAPIService.getUserSettings(localStorage.getItem('userId'), localStorage.getItem('token'));

  const greetingForUser = document.querySelector('.greeting-for-user');
  greetingForUser.innerHTML = `Привет, ${response.optional.name}`;
}
