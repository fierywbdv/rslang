import {
  setSidebarItem, greeting,
} from './common/main.utils';
// import notationActionHandler from './components/getNotation/notationHandler';
import renderMainScreen from './components/main-screen/main.screen';
import { clearRoot } from '../user/common/user.utils';

import './scss/main.styles.scss';
import 'swiper/swiper-bundle.css';
import { store } from '../../redux/store';
import { learnWordsAPIService } from '../../services/learnWordsAPIService';

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
    // this.notationActionHandler = notationActionHandler;
  }

  async init() {
    this.clearRoot();
    this.toggleBtnHandler();
    this.menuHandler();
    await this.renderMainScreen();
    // checkAnswer();
    // this.notationActionHandler();
    // getUserSettings();
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

// const getUserSettings = async () => {
//   const userSettings = await learnWordsAPIService.getUserSettings(localStorage.getItem('userId'), localStorage.getItem('token'));
//   console.log('userSettings', userSettings);
//   return userSettings;
// };

export default new Main();
