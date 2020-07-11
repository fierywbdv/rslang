import { CLASS_NAMES } from '../../common/common.constants';
import { SPEAKIT_CLASS_NAMES, SPEAKIT_GREETINGS } from './common/savanna.constants';

import './scss/savanna.styles.scss';

function Savanna() {

}

export default new Savanna();

function drawPage() {
  const page = document.querySelector('#root');
  page.innerHTML += `
      <div class="savanna-body">

        <div class="main-page-wrapper">
          <h2 class="savanna-name">Саванна</h2>
          <p class="about">Выберите правильный перевод слова</p>
          <button class="start__button">Начать игру</button>
          <div class="difficulties-lvl">
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

          <div class="hearts-wrapper">
            <img class="one-heart" src='./assets/img/heart.svg'/>
            <img class="one-heart" src='./assets/img/heart.svg'/>
            <img class="one-heart" src='./assets/img/heart.svg'/>
            <img class="one-heart" src='./assets/img/heart.svg'/>
            <img class="one-heart" src='./assets/img/heart.svg'/>
          </div>

          <div class="top-word">
            <span class="lvl__text savanna-current-word">words</span>
          </div>

          <div class="word-wrapper">
            <button class="word-button answer-1">первое</button>
            <button class="word-button answer-2">второе</button>
            <button class="word-button answer-3">третье</button>
            <button class="word-button answer-4">четвертое</button>
          </div>

          <div class="spinner-diamond">
            <img class="gif-diamond" src='./assets/img/diamond.gif'/>
          </div>
        </div>
    
        <div class="savanna-results hidden">
          <div class="savanna-results-correct">
              <span class="savanna-name right-answers">Правильно:
              </span>
          </div>
          <div class="savanna-results-errors">
              <span class="savanna-name wrong-answers">Ошибок:
              </span>
          </div>
          <button class="main-menu-button">Главное меню</button>
          <button class="new-game-button">Новая игра</button>
        </div>
      </div>
    `;
}

if ((window.location.href.split('#'))[1] === 'savanna') {
  drawPage();
}