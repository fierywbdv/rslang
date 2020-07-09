import { getUserSettings, getWord } from '../../common/main.utils';
import getSlide from './getSlide';

const generateCards = async () => {
  const mainSwiper = document.querySelector('.main-swiper .swiper-wrapper');

  const wordsArr = await getWord();

  const userSettings = getUserSettings();
  const userCardCount = userSettings.userCardsCount;

  for (let i = 0; i < userCardCount; i += 1) {
    const slide = getSlide(wordsArr[i], i);
    mainSwiper.append(slide);
  }
};
export default generateCards;
