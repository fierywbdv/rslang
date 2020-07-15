import { getDOMElement } from '../../common/main.helper';

const getSwiper = () => {
  const container = getDOMElement('div', 'main-swiper-container');
  const swiperContainer = getDOMElement('div', 'main-swiper swiper-container');
  const swiperWrapper = getDOMElement('div', 'main-swiper swiper-wrapper');
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
  swiperSlidesCount.textContent = '1';

  swiperProgressValue.append(swiperCurrentSlide, ' / ', swiperSlidesCount);

  swiperProgressBar.append(swiperProgressValue);
  swiperProgress.append(swiperProgressBar);

  swiperContainer.append(swiperWrapper,
    swiperButtonPrev,
    swiperButtonNext,
    swiperProgress);

  container.append(swiperContainer);

  return new Promise((resolve) => {
    (resolve(container));
  });
};

export default getSwiper;
