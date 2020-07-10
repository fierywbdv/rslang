import swiper from './swiper';
import { getDOMElement } from '../../common/main.helper';
import getSlide from '../card/getSlide';

const getSwiper = () => {
  const swiperContainer = getDOMElement('div', 'main-swiper swiper-container');
  const swiperWrapper = getDOMElement('div', 'main-swiper swiper-wrapper');
  const swiperPagination = getDOMElement('div', 'main-swiper swiper-pagination');
  const swiperButtonPrev = getDOMElement('div', 'main-swiper swiper-button-prev main-btn-disable');
  swiperButtonPrev.setAttribute('id', 'main-button-prev');
  const swiperButtonNext = getDOMElement('div', 'main-swiper swiper-button-next');
  swiperButtonNext.setAttribute('id', 'main-button-next');
  const swiperScroll = getDOMElement('div', 'main-swiper swiper-scrollbar');

  // const slide = getSlide();
  // const slide2 = getSlide();

  // swiperWrapper.append(slide, slide2);

  swiperContainer.append(swiperWrapper,
    swiperPagination,
    swiperButtonPrev,
    swiperButtonNext,
    swiperScroll);

  // return swiperContainer;
  return new Promise((resolve) => {
    (resolve(swiperContainer));
  });
};

export default getSwiper;
