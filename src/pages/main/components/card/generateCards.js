import { getUserSettings, setWordsForCards, getNewRandomWord } from '../../common/main.utils';

import getSlide from './getSlide';

const generateCards = async () => {
  const buttonNext = document.querySelector('.swiper-button-next')
  const mainSwiper = document.querySelector('.main-swiper .swiper-wrapper');

  const wordsArr = await setWordsForCards();

  const userSettings = getUserSettings();
  const userCardCount = userSettings.userCardsCount;

  console.log('start');
  mainSwiper.style = 'visibility: hidden';
  buttonNext.style = 'visibility: hidden';
  document.getElementById('root').insertAdjacentHTML("afterbegin", 
  `<div class="overlay-loader">
	  <div class="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
	  </div>
  </div>`);

  for (let i = 0; i < userCardCount; i += 1) {
    if(wordsArr[i] === undefined) {
      const word = await getNewRandomWord();
      const slide = getSlide(word, i);
      mainSwiper.append(slide);
    } else {
      const slide = getSlide(wordsArr[i], i);
      mainSwiper.append(slide);
    }
  }

  document.querySelector('.overlay-loader').remove();
  mainSwiper.removeAttribute('style');
  buttonNext.removeAttribute('style');
  console.log('end');
};
export default generateCards;
