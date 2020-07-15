import getSwiper from '../swiper/getSwiper';
import generateCards from '../card/generateCards';
import deleteWordHandler from '../card/deleteWordHandler';
import difficultyWordHandler from '../card/difficultyWordHandler';
import { moveCardHandler, sidebarListener } from '../../common/main.utils';

const renderMainScreen = async () => {
  const root = document.querySelector('#root');
  const mainSwiper = await getSwiper();
  root.append(mainSwiper);
  await generateCards();
  await moveCardHandler();
  await deleteWordHandler();
  await difficultyWordHandler();
  sidebarListener();
};
export default renderMainScreen;
