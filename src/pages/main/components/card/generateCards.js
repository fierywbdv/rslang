import { getUserSettings } from '../../common/main.utils';
import getSlide from './getSlide';

const generateCards = () => {
  const mainSwiper = document.querySelector('.main-swiper .swiper-wrapper');

  const userSettings = getUserSettings();
  const userCardCount = userSettings.userCardsCount;

  for (let i = 0; i < userCardCount; i += 1) {
    const slide = getSlide({}, i);
    mainSwiper.append(slide);
  }
};
export default generateCards;
