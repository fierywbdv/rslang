import { CLASS_NAMES } from '../../common/common.constants';
import { SPEAKIT_CLASS_NAMES, SPEAKIT_GREETINGS } from './common/audiocall.constants';

import './scss/audiocall.styles.scss';

class Audiocall {
  constructor() {
    this.logo = null;
  }

  sayHello() {
    console.log(this.logo);

    const speakitLogo = document.createElement('h2');
    speakitLogo.className = SPEAKIT_CLASS_NAMES.LOGO;
    speakitLogo.textContent = this.logo;

    document.querySelector(`.${CLASS_NAMES.MAIN.LOGO}`).after(speakitLogo);
  }

  init() {
    this.logo = SPEAKIT_GREETINGS;
  }
}

export default new Audiocall();
