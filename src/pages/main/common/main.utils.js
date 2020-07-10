// import Router from '../../../router/Router';
import { learnWordsAPIService } from '../../../services/learnWordsAPIService';
import getNotation from '../components/getNotation/getNotation';

const baseUrl = 'https://raw.githubusercontent.com/irinainina/rslang-data/master/';

export const setSidebarItem = () => {
  const sideMenuItems = document.querySelectorAll('.side-navbar ul li a');
  const url = window.location.hash;

  sideMenuItems.forEach((el) => {
    el.parentElement.classList.remove('active');
    if (el.getAttribute('href') === url) {
      el.parentElement.classList.add('active');
    }
  });
};

export const getUserSettings = () => ({
  wordsPerDay: localStorage.getItem('wordsPerDay'),
  userCardsCount: localStorage.getItem('userCardsCount'),
  userSetExample: localStorage.getItem('userSetExample'),
  userSetExplanation: localStorage.getItem('userSetExplanation'),
  userSetImage: localStorage.getItem('userSetImage'),
  userSetTranscription: localStorage.getItem('userSetTranscription'),
  userSetTranslate: localStorage.getItem('userSetTranslate'),
});

export const getPhrase = (iterator, size, word, wordId, text, audioExample) => {
  const inputLength = (word.match(/[lijft]/g)) ? size - 1 : size;
  const input = `<input id = "to-write-${iterator}" class="to-write"size = ${inputLength}
   placeholder = ${word} spellcheck = "false" data = ${wordId} data-audio-example = ${audioExample}>`;

  const regExp = /<b.*?>.*?<\/b.*?>/si;
  const phrase = text.replace(regExp, input);
  return phrase;
};

const moveToRight = () => {
  const prevBTN = document.querySelector('#main-button-prev');
  const slidesArr = Array.from(document.querySelectorAll('.main-swiper .swiper-slide'));
  prevBTN.classList.remove('main-btn-disable');

  slidesArr.forEach((el) => {
    const slide = el;
    const current = (slide.style.right).slice(0, -1) || 0;
    slide.style.right = `${+current + 100}%`;
  });
};

const moveToLeft = () => {
  const slidesArr = Array.from(document.querySelectorAll('.main-swiper .swiper-slide'));
  slidesArr.forEach((el) => {
    const slide = el;
    const current = (slide.style.right).slice(0, -1) || 0;
    slide.style.right = `${+current - 100}%`;
  });
};

const speakerHandler = () => {
  const speakersArr = Array.from(document.querySelectorAll('.main-speaker'));

  speakersArr.forEach((speaker) => {
    const current = speaker.getAttribute('id');
    const currentInput = document.querySelector(`#to-write-${current}`);
    const urlAudio = speaker.getAttribute('data-audio');

    speaker.addEventListener('click', () => {
      currentInput.value = '';
      currentInput.classList.add('show');
      new Audio(`${baseUrl}${urlAudio}`).play();
    });
  });
};

export const inputHandler = (iterator) => {
  const currentInput = document.querySelector(`#to-write-${iterator}`);
  const currentCard = document.querySelector(`#main-card-${iterator}`);
  const nextBTN = document.querySelector('#main-button-next');
  currentInput.focus();
  let wordDifficulty = 'false';

  if (currentCard.getAttribute('guessed') === 'false') {
    nextBTN.classList.add('main-btn-disable');
  }

  currentInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      if (currentInput.value === currentInput.placeholder) {
        nextBTN.classList.remove('main-btn-disable');
        const urlAudio = currentInput.getAttribute('data-audio-example');
        const audio = new Audio(`${baseUrl}${urlAudio}`);
        audio.play();
        currentInput.style.color = '#34c716';
        currentInput.blur();
        currentCard.setAttribute('guessed', 'true');
        addToUserWords(currentInput.getAttribute('data'), currentInput.placeholder, wordDifficulty);

        audio.addEventListener('ended', () => {
          const nextBtnIsDisable = nextBTN.classList.contains('main-btn-disable');
          if (!nextBtnIsDisable) {
            nextBTN.click();
          } else { getNotation(); }
        });
      } else {
        wordDifficulty = 'true';
        console.log('dif', wordDifficulty);
        currentInput.classList.add('incorrect');
        new Audio('../../../assets/audio/error.mp3').play();
        setTimeout(() => {
          currentInput.value = '';
          currentInput.classList.remove('incorrect');
        }, 1500);
      }
    }
  });
};

export const moveCardHandler = () => {
  const prevBTN = document.querySelector('#main-button-prev');
  const nextBTN = document.querySelector('#main-button-next');
  const slidesArr = Array.from(document.querySelectorAll('.main-swiper .swiper-slide'));
  let currentSlide = 0;

  speakerHandler();
  inputHandler(currentSlide);

  nextBTN.addEventListener('click', () => {
    const isNotLastSlide = currentSlide < slidesArr.length - 1;

    if (isNotLastSlide) {
      nextBTN.classList.remove('main-btn-disable');
      moveToRight();
      currentSlide += 1;
      inputHandler(currentSlide);
      if (currentSlide === slidesArr.length - 1) {
        nextBTN.classList.add('main-btn-disable');
      }
    }
  });

  prevBTN.addEventListener('click', () => {
    const isNotFirstSlide = currentSlide > 0;
    nextBTN.classList.remove('main-btn-disable');

    if (isNotFirstSlide) {
      prevBTN.classList.remove('main-btn-disable');
      moveToLeft();
      currentSlide -= 1;
      inputHandler(currentSlide);
    }
    if (currentSlide === 0) { prevBTN.classList.add('main-btn-disable'); }
  });
};

export async function greeting() {
  const greetingForUser = document.querySelector('.greeting-for-user');
  greetingForUser.innerHTML = `Привет, ${localStorage.getItem('userName')}!`;
}

export const setSidebarHeight = () => {
  const rootHeight = Math.max(
    document.querySelector('#root').scrollHeight,
    document.querySelector('#root').offsetHeight,
    document.querySelector('#root').clientHeight,
  );
  console.log('rootHeight', rootHeight);
  const sidebar = document.querySelector('nav.side-navbar');
  sidebar.style.height = `${rootHeight}px`;
  console.log('sidebar', sidebar.style.height);
};

const addToUserWords = (wordId, word, wordDifficulty) => {
  learnWordsAPIService.createUserWord(localStorage.getItem('userId'), wordId, localStorage.getItem('token'), wordDifficulty, { word });
};

const getRandomPage = () => {
  const rand = Math.random() * (29 + 1);
  return Math.floor(rand);
};

const getWord = async () => {
  const page = getRandomPage();
  const words = await learnWordsAPIService.getWordsByPageAndGroup(page, localStorage.getItem('userLangLevel'));
  return words;
};

export const setWordsForCards = async () => {
  const userWords = await learnWordsAPIService.getAllUserWords(localStorage.getItem('userId'), localStorage.getItem('token'));
  console.log(userWords);
  const newWords = await getWord();
  const wordsForCards = newWords.filter((newWord) => userWords.every((userWord) => userWord.wordId !== newWord.id));
  return wordsForCards;
};
