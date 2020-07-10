import { getUserSettings, setWordsForCards, getNewRandomWord } from '../../common/main.utils';

import getSlide from './getSlide';

const generateCards = async () => {
  const mainSwiper = document.querySelector('.main-swiper .swiper-wrapper');

  const wordsArr = await setWordsForCards();

  const userSettings = getUserSettings();
  const userCardCount = userSettings.userCardsCount;

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
};
export default generateCards;
