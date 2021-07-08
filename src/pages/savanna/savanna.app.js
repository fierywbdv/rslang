import { learnWordsAPIService } from '../../services/learnWordsAPIService';
import './scss/savanna.styles.scss';

export default function Savanna() {}

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
          <button class="savanna-new-game-button" id="savanna-reset-button">Новая игра</button>
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
let buttonPressed = false;

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
  if (savannaHeartsCounter == 5 || savannaWordCounter == 10) {
    gameOver();
  }
  const savannaFallingWord = document.getElementById('savanna-falling-word');
  const savannaAnswers = document.querySelectorAll('.savanna-word-button');

  savannaFallingWord.innerText = `${words[savannaWordCounter].word}`;
  let translations = words.slice().filter((word) => word.id !== words[savannaWordCounter].id);
  translations = shuffleArr(translations);
  translations = translations.slice(0, 3);
  translations.push(words[savannaWordCounter]);
  translations = shuffleArr(translations);
  savannaAnswers.forEach((element, i) => (element.innerText = translations[i].wordTranslate));

  setTimeout(() => {
    savannaFallingWord.classList.add('savanna-animated');
  }, 100);

  savannaFallingWord.className.replace(' active', ' hidden');
}

function savannaReset() {
  const savannaStartButton = document.querySelector('.savanna-start__button');
  const savannaResults = document.getElementById('savanna-results-page');
  const savannaFallingWord = document.getElementById('savanna-falling-word');
  const savannaHearts = document.querySelectorAll('.savanna-one-heart');

  for (let i = 0; i < savannaHearts.length; i++) {
    savannaHearts[i].classList.remove('savanna-grey-heart');
    savannaHeartsCounter = 0;
    continue;
  }
  savannaFallingWord.classList.remove('savanna-animated');
  savannaResults.classList.add('hidden');
  savannaStartButton.parentNode.classList.remove('hidden');
  savannaDifficulty = 1;
  savannaWrongAnswers = 0;
  savannaRightAnswers = 0;
  savannaWordCounter = 0;
  words = [];
  buttonPressed = false;
}

function gameOver() {
  const savannaStartButton = document.querySelector('.savanna-start__button');
  const savannaSecondPage = document.querySelector('.savanna-second-page');
  const savannaResults = document.getElementById('savanna-results-page');
  const savannaResetButton = document.getElementById('savanna-reset-button');
  const savannaWrongAnswersString = document.querySelector('.savanna-wrong-answers');
  const savannaRightAnswersString = document.querySelector('.savanna-right-answers');

  savannaStartButton.parentNode.classList.add('hidden');
  savannaSecondPage.classList.add('hidden');
  savannaResults.classList.remove('hidden');

  savannaWrongAnswersString.textContent = 'Ошибок:' + ' ' + `${savannaHeartsCounter}`;
  savannaRightAnswersString.textContent = 'Правильно:' + ' ' + `${savannaRightAnswers}`;

  savannaResetButton.addEventListener('click', savannaReset, false);
}

function minusLife() {
  if (buttonPressed == true) {
    buttonPressed = false;
    return;
  }

  const savannaFallingWord = document.getElementById('savanna-falling-word');
  const savannaHearts = document.querySelectorAll('.savanna-one-heart');

  savannaFallingWord.classList.remove('savanna-animated');
  if (savannaHeartsCounter == 5 || savannaWordCounter == 10) {
    gameOver();
  }

  for (
    let i = savannaHeartsCounter;
    i < savannaHearts.length && !savannaHearts[i].classList.contains('savanna-grey-heart');
    i++
  ) {
    savannaHearts[i].classList.add('savanna-grey-heart');
    savannaHeartsCounter += 1;
    break;
  }

  savannaFallingWord.classList.remove('savanna-animated');
  savannaWordCounter += 1;
  startNextAnimation();
}

function animationReset(event) {
  const savannaFallingWord = document.getElementById('savanna-falling-word');
  const savannaHearts = document.querySelectorAll('.savanna-one-heart');
  const { target } = event;

  buttonPressed = true;

  if (target.innerText == words[savannaWordCounter].wordTranslate) {
    savannaRightAnswers += 1;
  } else {
    if (savannaHeartsCounter == 5 || savannaWordCounter == 10) {
      gameOver();
    }

    for (
      let i = savannaHeartsCounter;
      i < savannaHearts.length && !savannaHearts[i].classList.contains('savanna-grey-heart');
      i++
    ) {
      savannaHearts[i].classList.add('savanna-grey-heart');
      savannaHeartsCounter += 1;
      break;
    }
    savannaWrongAnswers += 1;
  }

  savannaFallingWord.classList.remove('savanna-animated');
  savannaWordCounter += 1;
  startNextAnimation();
}

async function getWordsForPageAndGroup() {
  const response = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/words?page=${
      Math.floor(Math.random() * (25 - 1)) + 1
    }&group=${savannaDifficulty}`,
  );
  const words = await response.json();
  return shuffleArr(words);
}

async function addLernedWords() {
  const learnedWords = await learnWordsAPIService.getAllUserWords(
    localStorage.getItem('userId'),
    localStorage.getItem('token'),
  );
  const filteredWords = learnedWords.filter((word) => !!word.optional);
  const shuffledWords = shuffleArr(filteredWords);

  const words = shuffledWords.length < 10 ? await getWordsForPageAndGroup() : shuffledWords.map((i) => i.optional.word);

  return words;
}

if (window.location.href.split('#')[1] === 'savanna') {
  drawPage();

  const savannaStartButton = document.querySelector('.savanna-start__button');
  const savannaSecondPage = document.querySelector('.savanna-second-page');
  const savannaDifficulties = document.querySelectorAll('.savanna-lvl_button');

  for (let i = 0; i < savannaDifficulties.length; i++) {
    savannaDifficulties[i].addEventListener('click', function () {
      const current = document.getElementsByClassName('active-lvl');
      current[0].className = current[0].className.replace(' active-lvl', '');
      this.className += ' active-lvl';
      savannaDifficulty = Number(savannaDifficulties[i].innerText);
    });
  }

  savannaStartButton.onclick = async function (event) {
    const savannaFallingWord = document.getElementById('savanna-falling-word');
    const savannaAnswers = document.querySelectorAll('.savanna-word-button');
    const { target } = event;

    words = await addLernedWords();

    target.parentNode.classList.add('hidden');
    savannaSecondPage.classList.remove('hidden');
    setTimeout(() => {
      savannaFallingWord.classList.add('savanna-animated');
    }, 150);

    savannaFallingWord.innerText = `${words[savannaWordCounter].word}`;
    let translations = words.slice().filter((word) => word.id !== words[savannaWordCounter].id);
    translations = shuffleArr(translations);
    translations = translations.slice(0, 3);
    translations.push(words[savannaWordCounter]);
    translations = shuffleArr(translations);
    savannaAnswers.forEach((element, i) => (element.innerText = translations[i].wordTranslate));

    for (let i = 0; i < savannaAnswers.length; i++) {
      savannaAnswers[i].addEventListener('click', animationReset, false);
    }
    savannaFallingWord.addEventListener('transitionend', minusLife, false);
  };
}
