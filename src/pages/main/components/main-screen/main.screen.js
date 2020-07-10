import getSwiper from '../swiper/getSwiper';
import generateCards from '../card/generateCards';
import { moveCardHandler } from '../../common/main.utils';
// import { setWordsForCards } from '../../common/main.helper';

const renderMainScreen = async () => {
  const root = document.querySelector('#root');
  const mainSwiper = await getSwiper();
  root.append(mainSwiper);
  // await setWordsForCards();
  await generateCards();
  await moveCardHandler();
};
export default renderMainScreen;
