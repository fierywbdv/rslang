import { CLASS_NAMES } from '../../common/common.constants';
import { SPEAKIT_CLASS_NAMES, SPEAKIT_GREETINGS } from './common/savanna.constants';

import './scss/savanna.styles.scss';

class Savanna {
  init() {

  }
  
  sayHello() {

  }
}

export default new Savanna();

function drawPage() {
  const page = document.querySelector('#root');
  page.innerHTML += `
      <div class="savanna-body">

        <div class="savanna-main-page-wrapper hidden">
          <h2 class="savanna-name">Саванна</h2>
          <p class="savanna-about">Выберите правильный перевод слова</p>
          <button class="savanna-start__button">Начать игру</button>
          <div class="savanna-difficulties-lvl">
            <span class="savanna-lvl__text">Уровень:</span>
            <button class="savanna-lvl_button savanna-lvl-1 active-lvl">1</button>
            <button class="savanna-lvl_button savanna-lvl-2">2</button>
            <button class="savanna-lvl_button savanna-lvl-3">3</button>
            <button class="savanna-lvl_button savanna-lvl-4">4</button>
            <button class="savanna-lvl_button savanna-lvl-5">5</button>
            <button class="savanna-lvl_button savanna-lvl-6">6</button>
          </div> 
        </div>

        <div class="savanna-second-page">

          <div class="savanna-hearts-wrapper">
            <img class="savanna-one-heart" src='assets/savanna/img/heart.svg'/>
            <img class="savanna-one-heart" src='assets/savanna/img/heart.svg'/>
            <img class="savanna-one-heart" src='assets/savanna/img/heart.svg'/>
            <img class="savanna-one-heart" src='assets/savanna/img/heart.svg'/>
            <img class="savanna-one-heart" src='assets/savanna/img/heart.svg'/>
          </div>

          <div class="savanna-top-word">
            <span class="savanna-lvl__text savanna-current-word">words</span>
          </div>

          <div class="savanna-word-wrapper">
            <button class="savanna-word-button savanna-answer-1">первое</button>
            <button class="savanna-word-button savanna-answer-2">второе</button>
            <button class="savanna-word-button savanna-answer-3">третье</button>
            <button class="savanna-word-button savanna-answer-4">четвертое</button>
          </div>

          <div class="savanna-spinner-diamond">
            <img class="savanna-gif-diamond" src='assets/savanna/img/diamond.gif'/>
          </div>
        </div>
    
        <div class="savanna-results hidden">
          <div class="savanna-results-correct">
              <span class="savanna-name savanna-right-answers">Правильно:
              </span>
          </div>
          <div class="savanna-results-errors">
              <span class="savanna-name savanna-wrong-answers">Ошибок:
              </span>
          </div>
          <button class="savanna-main-menu-button">Главное меню</button>
          <button class="savanna-new-game-button">Новая игра</button>
        </div>
      </div>
    `;
}

if ((window.location.href.split('#'))[1] === 'savanna') {
  drawPage();
}
