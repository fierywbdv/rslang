import {
  CLASS_NAMES,
  ELEMENTS,
  EVENTS,
} from './helper';

export const createCard = ({
  word,
  image,
  audio,
  transcription,
}) => `
  <a class="card__link link" href="#" data-word="${word}" data-audio="${audio.slice(6)}" data-image="${image.slice(6)}">
    <p class="card__word">${word}</p>
    <p class="card__transcription">${transcription}</p>
  </a>
`;

export const createCardWithTranslation = ({
  word,
  image,
  audio,
  transcription,
}, translationsMap) => `
  <a class="card__link link" href="#" data-word="${word}" data-audio="${audio.slice(6)}" data-image="${image.slice(6)}">
    <p class="card__word">${word}</p>
    <p class="card__transcription">${transcription}</p>
    <p class="card__translation">${translationsMap.get(word)}</p>
  </a>
`;

export const setActiveState = (target) => {
  target.classList.add(CLASS_NAMES.ACTIVE);
};

export const togglePageState = (className) => document.body.classList.toggle(className);

export const getClosestLink = ({ target }) => target.closest(`.${CLASS_NAMES.LINK}`);

export const isButtonClicked = ({ target }) => target.closest(`.${CLASS_NAMES.BUTTON_ROUNDED}`);

export const toggleDocumentScroll = () => document.body
  .classList.toggle(CLASS_NAMES.OVERFLOW_HIDDEN);

export const initIntroButton = (onIntroButtonClick) => ELEMENTS.BUTTONS.INTRODUCTION
  .addEventListener(EVENTS.CLICK, onIntroButtonClick);

export const shuffleArray = (array) => {
  const result = array.slice();

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const fetchData = async (url, callBack) => {
  const response = await fetch(url);
  const json = await response.json();
  callBack(json);
};

const CARDS_API_URL = 'https://afternoon-falls-25894.herokuapp.com/words?group=';
export const loadCardsJSON = (difficult, addPageList) => {
  const randomPage = Math.floor(Math.random() * 30);
  const url = `${CARDS_API_URL}${difficult}&page=${randomPage}`;
  fetchData(url, addPageList);
};

const TRANSLATION_API = {
  KEY: 'trnsl.1.1.20200501T172144Z.c784356c3f286594.5cbbf7226bde620d92ce5f3996d05cc59c7d6a7a',
  URL: 'https://translate.yandex.net/api/v1.5/tr.json/translate?&lang=en-ru&text=',
};

export const translateWord = (word, callBack) => {
  fetchData(`${TRANSLATION_API.URL}${word}&key=${TRANSLATION_API.KEY}`, callBack);
};

export const createStar = (starSrc) => {
  const starImg = document.createElement('img');
  starImg.alt = CLASS_NAMES.STAR;
  starImg.classList.add(CLASS_NAMES.STAR);
  starImg.src = starSrc;
  return starImg;
};

export const hideSpinner = () => ELEMENTS.SPINNER.classList.add(CLASS_NAMES.HIDDEN);

export const showSpinner = () => ELEMENTS.SPINNER.classList.remove(CLASS_NAMES.HIDDEN);
