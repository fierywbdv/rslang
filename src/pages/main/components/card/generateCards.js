import { getUserSettings, setWordsForCards, getNewRandomWord } from '../../common/main.utils';

import getSlide from './getSlide';

const generateCards = async () => {
  const buttonNext = document.querySelector('.swiper-button-next')
  const mainSwiper = document.querySelector('.main-swiper .swiper-wrapper');

  const wordsArr = await setWordsForCards();

  const userSettings = getUserSettings();
  const userCardCount = userSettings.userCardsCount;

  mainSwiper.style = 'visibility: hidden';
  buttonNext.style = 'visibility: hidden';
  document.getElementById('root').insertAdjacentHTML("afterbegin", 
  `<div class="cssload-thecube">
	<div class="cssload-cube cssload-c1"></div>
	<div class="cssload-cube cssload-c2"></div>
	<div class="cssload-cube cssload-c4"></div>
	<div class="cssload-cube cssload-c3"></div>
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

  document.querySelector('.cssload-thecube').remove();
  mainSwiper.removeAttribute('style');
  buttonNext.removeAttribute('style');
};
export default generateCards;
