import { getUserSettings, setWordsForCards, getNewRandomWord } from '../../common/main.utils';

import getSlide from './getSlide';

export let mass = [];

const generateCards = async () => {
  const buttonNext = document.querySelector('.swiper-button-next');
  const mainSwiper = document.querySelector('.main-swiper .swiper-wrapper');

  const wordsArr = await setWordsForCards();

  const userSettings = getUserSettings();
  const userCardCount = userSettings.userCardsCount;

  mainSwiper.style = 'visibility: hidden';
  buttonNext.style = 'visibility: hidden';
  document.getElementById('root').insertAdjacentHTML('afterbegin',
    `<div class="cssload-thecube">
	<div class="cssload-cube cssload-c1"></div>
	<div class="cssload-cube cssload-c2"></div>
	<div class="cssload-cube cssload-c4"></div>
	<div class="cssload-cube cssload-c3"></div>
</div>`);
  mass = [];

  for (let i = 0; i < userCardCount; i += 1) {
    if (wordsArr[i] === undefined) {
      const word = await getNewRandomWord();
      mass.push(word);
      const slide = getSlide(word, i);
      mainSwiper.append(slide);
    } else {
      mass.push(wordsArr[i]);
      const slide = getSlide(wordsArr[i], i);
      mainSwiper.append(slide);
    }
  }

  if (localStorage.getItem('userSetImage') === 'false') {
    document.querySelectorAll('.main-screen-image').forEach((el) => {
      el.style = 'display: none;';
    });
  }

  // if (localStorage.getItem('userSetExample') === 'false') {
  //   document.querySelectorAll('.phrase').forEach((el) => {
  //     const start = el.innerHTML.indexOf('<');
  //     const end = el.innerHTML.indexOf('>');
  //     const res = el.innerHTML.slice(start, end + 1);
  //     el.innerHTML = res;
  //   });
  // }

  // if (localStorage.getItem('userSetExplanation') === 'false') {
  //   document.querySelectorAll('.translate-example').forEach((el) => {
  //     el.style = 'visibility: hidden;';
  //   });
  // }

  document.querySelector('.cssload-thecube').remove();
  mainSwiper.removeAttribute('style');
  buttonNext.removeAttribute('style');
};
export default generateCards;
