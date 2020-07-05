import Router from '../../../router/Router';

export const setSidebarItem = () => {
  const sideMenuItems = document.querySelectorAll('.side-navbar ul li a');
  const url = Router.getUrl();

  sideMenuItems.forEach((el) => {
    el.parentElement.classList.remove('active');
    if (el.getAttribute('href') === `#${url}`) {
      el.parentElement.classList.add('active');
    }
  });
};

export const getUserSettings = () => ({
  userWordsCount: 10,
  userCardsCount: 10,
  userSetTranslate: true,
  userSetExplanation: true,
  userSetExample: true,
  userSetTranscription: true,
  userSetImage: true,
});

export const getPhrase = (size) => `Don't forget to take
a little <input class="to-write"size = ${size} autofocus></input>
after your long journey!`;

export const moveCardHandler = () => {
  const prevBTN = document.querySelector('#main-button-prev');
  const nextBTN = document.querySelector('#main-button-next');
  const slidesArr = Array.from(document.querySelectorAll('.main-swiper .swiper-slide'));
  let currentSlide = 0;

  nextBTN.addEventListener('click', () => {
    const isNotLastSlide = currentSlide < slidesArr.length - 1;
    prevBTN.classList.remove('main-btn-disable');

    if (isNotLastSlide) {
      nextBTN.classList.remove('main-btn-disable');
      currentSlide += 1;
      slidesArr.forEach((el) => {
        const slide = el;
        const current = (slide.style.right).slice(0, -1) || 0;
        slide.style.right = `${+current + 100}%`;
      });
    } else { nextBTN.classList.add('main-btn-disable'); }
  });

  prevBTN.addEventListener('click', () => {
    const isNotFirstSlide = currentSlide > 0;
    nextBTN.classList.remove('main-btn-disable');

    if (isNotFirstSlide) {
      prevBTN.classList.remove('main-btn-disable');
      currentSlide -= 1;
      slidesArr.forEach((el) => {
        const slide = el;
        const current = (slide.style.right).slice(0, -1) || 0;
        slide.style.right = `${+current - 100}%`;
      });
    }
    if (currentSlide === 0) { prevBTN.classList.add('main-btn-disable'); }
  });
};
