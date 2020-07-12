import { CLASS_NAMES } from '../../common/common.constants';
import { SPEAKIT_CLASS_NAMES, SPEAKIT_GREETINGS } from './common/savanna.constants';

import './scss/savanna.styles.scss';

class Savanna {
  init() {

  }
  
  sayHello() {

  }
}

export default new Savanna() ;

function drawPage() {
  const page = document.querySelector('#root');
  page.innerHTML += `
      <div class="savanna-body">

        <div class="savanna-main-page-wrapper">
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

        <div class="savanna-second-page hidden">

          <div class="savanna-hearts-wrapper">
            <img class="savanna-one-heart" src='assets/savanna/img/heart.svg'/>
            <img class="savanna-one-heart" src='assets/savanna/img/heart.svg'/>
            <img class="savanna-one-heart" src='assets/savanna/img/heart.svg'/>
            <img class="savanna-one-heart" src='assets/savanna/img/heart.svg'/>
            <img class="savanna-one-heart" src='assets/savanna/img/heart.svg'/>
          </div>

          <div class="savanna-top-word">
            <span class="savanna-lvl__text savanna-current-word" id="savanna-falling-word">words</span>
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

const savannaDifficulties = document.querySelectorAll('.savanna-lvl_button');

function startNextAnimation() {
  const savannaFallingWord = document.getElementById('savanna-falling-word');
  
  savannaFallingWord.classList.remove('savanna-animated');
  savannaFallingWord.className.replace(" active", " hidden");
  savannaFallingWord.classList.add('savanna-animated');
  savannaFallingWord.addEventListener("transitionend", animationReset, false);
}

function animationReset() {
  const savannaFallingWord = document.getElementById('savanna-falling-word');
  const savannaHearts = document.querySelectorAll('.savanna-one-heart');

  savannaFallingWord.classList.remove('savanna-animated');
  for (let i=0; i < savannaHearts.length && !savannaHearts[i].classList.contains("savanna-grey-heart"); i++) {
    savannaHearts[i].classList.add('savanna-grey-heart');
    break;
  }
  startNextAnimation();
}

if ((window.location.href.split('#'))[1] === 'savanna') {
  drawPage();

  const savannaStartButton = document.querySelector('.savanna-start__button');
  const savannaSecondPage = document.querySelector('.savanna-second-page');
  const savannaDifficulties = document.querySelectorAll('.savanna-lvl_button');

  for (let i=0; i < savannaDifficulties.length; i++) {
    savannaDifficulties[i].addEventListener("click", function() {
      const current = document.getElementsByClassName("active-lvl");
      current[0].className = current[0].className.replace(" active-lvl", "");
      this.className += " active-lvl";
    });
  }

  savannaStartButton.onclick = function(event) {

    const savannaFallingWord = document.getElementById('savanna-falling-word');
    let target = event.target;
    
    target.parentNode.classList.add('hidden');
    savannaSecondPage.classList.remove('hidden');
    setTimeout(() =>{
      savannaFallingWord.classList.add('savanna-animated');
    },300);
    savannaFallingWord.addEventListener("transitionend", animationReset, false);
  }
}



