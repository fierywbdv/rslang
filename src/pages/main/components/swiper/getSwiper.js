import swiper from './swiper';
import { getDOMElement } from '../../common/main.helper';
import getSlide from '../card/getSlide';

const getSwiper = () => {
  const swiperContainer = getDOMElement('div', 'main-swiper swiper-container');
  const swiperWrapper = getDOMElement('div', 'main-swiper swiper-wrapper');
  // const swiperPagination = getDOMElement('div', 'main-swiper swiper-pagination');
  const swiperButtonPrev = getDOMElement('div', 'main-swiper swiper-button-prev main-btn-disable');
  swiperButtonPrev.setAttribute('id', 'main-button-prev');
  const swiperButtonNext = getDOMElement('div', 'main-swiper swiper-button-next');
  swiperButtonNext.setAttribute('id', 'main-button-next');

  const swiperProgress = getDOMElement('div', 'main-swiper main-progress progress');
  swiperProgress.setAttribute('id', 'main-progres');
  const swiperProgressBar = getDOMElement('div', 'main-swiper progress-bar');
  swiperProgressBar.setAttribute('id', 'main-progressbar');
  swiperProgressBar.setAttribute('role', 'progressbar');
  swiperProgressBar.setAttribute('aria-valuenow', '25');
  swiperProgressBar.setAttribute('aria-valuemin', '0');
  swiperProgressBar.setAttribute('aria-valuemax', '100');
  swiperProgressBar.style.width = '0%';

  const swiperProgressValue = getDOMElement('div', 'main-progress-area');

  const swiperCurrentSlide = getDOMElement('span', '');
  swiperCurrentSlide.setAttribute('id', 'current-slide');
  swiperCurrentSlide.textContent = '1';

  const swiperSlidesCount = getDOMElement('span', '');
  swiperSlidesCount.setAttribute('id', 'slides-count');
  swiperSlidesCount.textContent = '100';

  swiperProgressValue.append(swiperCurrentSlide, ' / ', swiperSlidesCount);

  swiperProgressBar.append(swiperProgressValue);
  swiperProgress.append(swiperProgressBar);

  // const slide = getSlide();
  // const slide2 = getSlide();

  // swiperWrapper.append(slide, slide2);

  swiperContainer.append(swiperWrapper,
    // swiperPagination,
    swiperButtonPrev,
    swiperButtonNext,
    swiperProgress);

  // return swiperContainer;
  return new Promise((resolve) => {
    (resolve(swiperContainer));
  });
};

export default getSwiper;
