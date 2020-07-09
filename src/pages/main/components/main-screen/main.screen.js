// import swiper from 'swiper/bundle';
import swiper from '../swiper/swiper';
import getSwiper from '../swiper/getSwiper';
import generateCards from '../card/generateCards';
import { moveCardHandler } from '../../common/main.utils';

const renderMainScreen = async () => {
  const root = document.querySelector('#root');
  const mainSwiper = await getSwiper();
  root.append(mainSwiper);
  await generateCards();
  await moveCardHandler();
};
export default renderMainScreen;
