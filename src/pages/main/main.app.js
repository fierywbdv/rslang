import { setSidebarItem } from './common/main.utils';

import { CLASS_NAMES } from '../../common/common.constants';
import MAIN_GREETINGS from './common/main.constants';

import './scss/main.styles.scss';

class Main {
  constructor() {
    this.logoContent = null;
    this.logoElement = null;
    this.setSidebarItem = setSidebarItem;
  }

  sayHello() {}

  init() {}

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
    window.addEventListener('hashchange', () => {
      this.setSidebarItem();
    });
  }
}

export default new Main();
