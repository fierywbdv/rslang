// import Router from '../../../router/Router';
import { learnWordsAPIService } from '../../../services/learnWordsAPIService';
import getNotation from '../components/getNotation/getNotation';

export const setSidebarItem = () => {
  const sideMenuItems = document.querySelectorAll('.side-navbar ul li a');
  const url = window.location.hash;

  sideMenuItems.forEach((el) => {
    el.parentElement.classList.remove('active');
    if (el.getAttribute('href') === url) {
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

export const getPhrase = (iterator, size, word) => `Don't forget to take
a little <input id = "to-write-${iterator}" class="to-write"size = ${size}
autofocus placeholder = ${word} spellcheck = "false"></input>
after your long journey!`;

const speakerHandler = (iterator) => {
  const speaker = document.querySelector(`#main-speaker-${iterator}`);
  const currentInput = document.querySelector(`#to-write-${iterator}`);

  speaker.addEventListener('click', () => {
    currentInput.classList.add('show');
  });
};

export const inputHandler = (iterator) => {
  // const speaker = document.querySelector(`#main-speaker-${iterator}`);
  const currentInput = document.querySelector(`#to-write-${iterator}`);

  currentInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      console.log(currentInput.value);
      if (currentInput.value === currentInput.placeholder) {
        currentInput.style.color = '#34c716';
        currentInput.blur();
      } else {
        currentInput.classList.add('incorrect');
        setTimeout(() => {
          currentInput.value = '';
          currentInput.classList.remove('incorrect');
        }, 1500);
      }
    }
  });
};

export const moveCardHandler = () => {
  const prevBTN = document.querySelector('#main-button-prev');
  const nextBTN = document.querySelector('#main-button-next');
  const slidesArr = Array.from(document.querySelectorAll('.main-swiper .swiper-slide'));
  let currentSlide = 0;

  speakerHandler(currentSlide);
  inputHandler(currentSlide);

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
    } else {
      nextBTN.classList.add('main-btn-disable');
      getNotation();
    }
    speakerHandler(currentSlide);
    inputHandler(currentSlide);
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
    speakerHandler(currentSlide);
    inputHandler(currentSlide);
  });
};

export async function greeting() {
  const response = await learnWordsAPIService.getUser(localStorage.getItem('userId'), localStorage.getItem('token'));

  const greetingForUser = document.querySelector('.greeting-for-user');
  greetingForUser.innerHTML = `Привет, ${response.name}`;
}

export const setSidebarHeight = () => {
  const rootHeight = Math.max(
    document.querySelector('#root').scrollHeight,
    document.querySelector('#root').offsetHeight,
    document.querySelector('#root').clientHeight,
  );
  console.log('rootHeight', rootHeight);
  const sidebar = document.querySelector('nav.side-navbar');
  sidebar.style.height = `${rootHeight}px`;
  console.log('sidebar', sidebar.style.height);
};

export const checkAnswer = () => {
  const inputsArr = Array.from(document.querySelectorAll('.main-screen-card .to-write'));
};
