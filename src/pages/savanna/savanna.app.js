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
    speakitLogo.textContent = this.logo;

    document.querySelector(`.${CLASS_NAMES.MAIN.LOGO}`).after(speakitLogo);
  }

  init() {
    this.logo = SPEAKIT_GREETINGS;
  }
}



export default new Savanna();

function drawPage() {
  const page = document.querySelector('#root');
  page.innerHTML += `
      <div class="body-savanna">

        <div class="page-wrapper hidden">
          <h2 class="name">Саванна</h2>
          <p class="about">Выберите правильный перевод слова</p>
          <button class="start__button">Начать игру</button>
          <div class="difficulties">
            <span class="lvl__text">Уровень:</span>
            <button class="lvl_button lvl-1 active-lvl">1</button>
            <button class="lvl_button lvl-2">2</button>
            <button class="lvl_button lvl-3">3</button>
            <button class="lvl_button lvl-4">4</button>
            <button class="lvl_button lvl-5">5</button>
            <button class="lvl_button lvl-6">6</button>
          </div> 
        </div>

        <div class="second-page hidden">

          <div class="hearts">
            <img class="one-heart" src='http://localhost:3000/assets/img/09d92e7dd7871d709007195574eaf1a3.svg'/>
            <img class="one-heart" src='http://localhost:3000/assets/img/09d92e7dd7871d709007195574eaf1a3.svg'/>
            <img class="one-heart" src='http://localhost:3000/assets/img/09d92e7dd7871d709007195574eaf1a3.svg'/>
            <img class="one-heart" src='http://localhost:3000/assets/img/09d92e7dd7871d709007195574eaf1a3.svg'/>
            <img class="one-heart" src='http://localhost:3000/assets/img/09d92e7dd7871d709007195574eaf1a3.svg'/>
          </div>

          <div class="top-word">
            <span class="lvl__text current-word">words</span>
          </div>

          <div class="word-wrapper">
            <button class="word-button answer-1">первое</button>
            <button class="word-button answer-2">второе</button>
            <button class="word-button answer-3">третье</button>
            <button class="word-button answer-4">четвертое</button>
          </div>

          <div class="spinner-diamond">
            <img class="diamond" src='http://localhost:3000/assets/img/17999a2403a9b1ebde0704b69f521392.gif'/>
          </div>
        </div>
    
        <div class="results hidden">
          <div class="results__correct">
              <span class="correct__lead">Правильно:
              </span>
          </div>
          <div class="results__errors">
              <span class="errors__lead">Ошибок:
              </span>
          </div>
        </div>
      </div>
    `;
}

if ((window.location.href.split('#'))[1] === 'savanna') {
  drawPage();
}