import { learnWordsAPIService } from '../../services/learnWordsAPIService';
import './scss/savanna.styles.scss';

export default function Savanna() {

}

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
            <span class="savanna-lvl__text savanna-current-word" id="savanna-falling-word"></span>
          </div>

          <div class="savanna-word-wrapper">
            <button class="savanna-word-button savanna-answer-1"></button>
            <button class="savanna-word-button savanna-answer-2"></button>
            <button class="savanna-word-button savanna-answer-3"></button>
            <button class="savanna-word-button savanna-answer-4"></button>
          </div>

          <div class="savanna-spinner-diamond">
            <img class="savanna-gif-diamond" src='assets/savanna/img/diamond.gif'/>
          </div>
        </div>
    
        <div class="savanna-results hidden" id="savanna-results-page">
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

let savannaDifficulty = 1;
let savannaWrongAnswers = 0;
let savannaRightAnswers = 0;
let savannaWordCounter = 0;
let savannaHeartsCounter = 0;
let words = [];

const shuffleArr = (arr) => {
  let j;
  let temp;
  const resultArr = arr;
  for (let i = resultArr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    resultArr[j] = arr[i];
    resultArr[i] = temp;
  }
  return resultArr;
};

function startNextAnimation() {
  const savannaFallingWord = document.getElementById('savanna-falling-word');
  const savannaAnswers = document.querySelectorAll('.savanna-word-button');
  
  savannaFallingWord.innerText = `${words[savannaWordCounter].word}`;
  let translations = words.slice().filter((word) => word.id !== words[savannaWordCounter].id);
  translations = shuffleArr(translations);
  translations = translations.slice(0,3);
  translations.push(words[savannaWordCounter]);
  translations = shuffleArr(translations);
  savannaAnswers.forEach((element, i) => element.innerText = translations[i].wordTranslate);
  
  setTimeout(() =>{
    savannaFallingWord.classList.add('savanna-animated');
  },300);
  
  savannaFallingWord.className.replace(" active", " hidden");

}

function gameOver() {
  const savannaStartButton = document.querySelector('.savanna-start__button');
  const savannaSecondPage = document.querySelector('.savanna-second-page');
  const savannaResults = document.getElementById("savanna-results-page");

  savannaStartButton.parentNode.classList.add('hidden');
  savannaSecondPage.classList.add('hidden');
  savannaResults.classList.remove('hidden');
  console.log(savannaWordCounter);
}

function animationReset() {
  const savannaFallingWord = document.getElementById('savanna-falling-word');
  const savannaHearts = document.querySelectorAll('.savanna-one-heart');

  savannaFallingWord.classList.remove('savanna-animated');
  if (savannaHeartsCounter == 5 || savannaWordCounter == 10) {
      gameOver();
  }

  for (let i=0; i < savannaHearts.length && !savannaHearts[i].classList.contains("savanna-grey-heart"); i++) {
    savannaHearts[i].classList.add('savanna-grey-heart');
    savannaHeartsCounter = savannaHeartsCounter + 1;
    break;
  }

  savannaFallingWord.classList.remove('savanna-animated');

  savannaWordCounter = savannaWordCounter + 1;
  startNextAnimation();
}

async function getWordsForPageAndGroup() {
  const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${Math.floor(Math.random() * (25 - 1)) + 1}&group=${savannaDifficulty}`);
  const words = await response.json();
  return shuffleArr(words);
}

async function addLernedWords() {
  const learnedWords = await learnWordsAPIService.getAllUserWords(localStorage.getItem('userId'), localStorage.getItem('token'));
  const filteredWords = learnedWords.filter((word) => !!word.optional);
  let shuffledWords = shuffleArr(filteredWords);
  if (shuffledWords.length < 10) {
    shuffledWords = getWordsForPageAndGroup();
  }
  const words = shuffledWords.map((i) => i.optional.word);
  console.log(words);
  return words;
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
      savannaDifficulty = Number(savannaDifficulties[i].innerText);
    });
  }

  savannaStartButton.onclick = async function(event) {

    const savannaFallingWord = document.getElementById('savanna-falling-word');
    const savannaAnswers = document.querySelectorAll('.savanna-word-button');
    let target = event.target;
    
    words = await addLernedWords();

    target.parentNode.classList.add('hidden');
    savannaSecondPage.classList.remove('hidden');
    setTimeout(() =>{
      savannaFallingWord.classList.add('savanna-animated');
    },300);

    savannaFallingWord.innerText = `${words[savannaWordCounter].word}`;
    let translations = words.slice().filter((word) => word.id !== words[0].id);
    translations = shuffleArr(translations);
    translations = translations.slice(0,3);
    translations.push(words[0]);
    translations = shuffleArr(translations);
    savannaAnswers.forEach((element, i) => element.innerText = translations[i].wordTranslate);

    for (let i=0; i < savannaAnswers.length; i++) {
      savannaAnswers[i].addEventListener("click", animationReset, false);
    }
    savannaFallingWord.addEventListener("transitionend", animationReset, false);
  }
}



