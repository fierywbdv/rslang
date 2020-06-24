import someComponent from './components/some_component/some_component';

import { CLASS_NAMES } from '../../common/common.constants';
import MAIN_GREETINGS from './common/main.constants';

import './scss/main.styles.scss';

class Main {
  constructor() {
    this.logoContent = null;
    this.logoElement = null;
  }

  sayHello() {
    // console.log(this.logoContent);

    // this.logoElement.textContent = this.logoContent;
  }

  init() {
    // this.logoElement = document.querySelector(`.${CLASS_NAMES.MAIN.LOGO}`);
    // this.logoContent = MAIN_GREETINGS;
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
}

export default new Main();
