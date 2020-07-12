import { setSidebarItem, greeting } from './common/main.utils';
import renderMainScreen from './components/main-screen/main.screen';
import renderSelectScreen from './components/selectScreen/renderSelectScreen';
import { clearRoot } from '../user/common/user.utils';

import './scss/main.styles.scss';
import 'swiper/swiper-bundle.css';
import { store } from '../../redux/store';

if (store.getState().promoReducer.authorized === 'false') {
  document.location.href = '/';
}

greeting();

class Main {
  constructor() {
    this.logoContent = null;
    this.logoElement = null;
    this.setSidebarItem = setSidebarItem;
    this.renderMainScreen = renderMainScreen;
    this.clearRoot = clearRoot;
    this.renderSelectScreen = renderSelectScreen;
  }

  async init() {
    this.clearRoot();
    await this.renderMainScreen();
  }

  select() {
    this.renderSelectScreen();
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
    window.addEventListener('hashchange', () => {
      this.setSidebarItem();
    });
  }
}

export default new Main();
