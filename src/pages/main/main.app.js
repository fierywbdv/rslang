import { setSidebarItem, setSidebarHeight } from './common/main.utils';
import './scss/main.styles.scss';

class Main {
  constructor() {
    this.logoContent = null;
    this.logoElement = null;
    this.setSidebarItem = setSidebarItem;
    this.setSidebarHeight = setSidebarHeight;
  }

  sayHello() {

  }

  init() {
  }

  toggleBtnHandler() {
    this.toggleBTN = document.querySelector('#toggle-btn');
    this.sidebar = document.querySelector('.side-navbar');

    this.toggleBTN.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleBTN.classList.toggle('active');
      this.sidebar.classList.toggle('shrinked');
    });
  }

  menuHandler() {
    this.setSidebarItem();
    setSidebarHeight();
    window.addEventListener('hashchange', () => {
      this.setSidebarItem();
      setSidebarHeight();
    });
  }

  setSidebarHeight() {
    this.setSidebarHeight();
  }
}

export default new Main();
