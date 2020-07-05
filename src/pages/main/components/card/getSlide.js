import { getDOMElement } from '../../common/main.helper';
import getCard from './getCard';

const slide = (obj, i) => {
  const swiperSlide = getDOMElement('div', 'main-swiper swiper-slide');
  const swiperContainer = getDOMElement('div', 'main-swiper container-fluid');
  const swiperRow = getDOMElement('div', 'main-swiper row justify-content-center');
  const swiperCol = getDOMElement('div', 'col-9');

  const card = getCard({}, i);

  swiperCol.append(card);

  swiperRow.append(swiperCol);
  swiperContainer.append(swiperRow);
  swiperSlide.append(swiperContainer);

  return swiperSlide;
};

export default slide;
