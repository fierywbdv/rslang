import { setSidebarItem, speakerHandler, checkAnswer } from './common/main.utils';
import renderMainScreen from './components/main-screen/main.screen';

import './scss/main.styles.scss';
import { store } from '../../redux/store';
import { learnWordsAPIService } from '../../services/learnWordsAPIService';

if (store.getState().promoReducer.authorized === 'false') {
  document.location.href = '/';
}

// greeting();

class Main {
  constructor() {
    this.logoContent = null;
    this.logoElement = null;
    this.setSidebarItem = setSidebarItem;
    this.renderMainScreen = renderMainScreen;
    this.speakerHandler = speakerHandler;
  }

  async init() {
    this.toggleBtnHandler();
    this.menuHandler();
    await this.renderMainScreen();
    // this.speakerHandler();
    checkAnswer();
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
