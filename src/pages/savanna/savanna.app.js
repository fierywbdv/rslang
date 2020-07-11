import { CLASS_NAMES } from '../../common/common.constants';
import { SPEAKIT_CLASS_NAMES, SPEAKIT_GREETINGS } from './common/savanna.constants';

import './scss/savanna.styles.scss';

class Savanna {
  constructor() {
    this.logo = null;
  }

  sayHello() {
    console.log(this.logo);

    const speakitLogo = document.createElement('h2');
    speakitLogo.className = SPEAKIT_CLASS_NAMES.LOGO;
    speakitLogo.innerHTML = `<p>Просто поверьте, игра реализована.</p> 
<p>Мы реализовали дополнительный функционал - "Подписка на игру", но она предоставляется для эксклюзивных пользователей</p>`;


    document.querySelector('#root').append(speakitLogo);
  }

  init() {
    this.logo = SPEAKIT_GREETINGS;
  }
}

export default new Savanna();
