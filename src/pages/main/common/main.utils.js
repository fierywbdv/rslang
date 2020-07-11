// import Router from '../../../router/Router';
import { learnWordsAPIService } from '../../../services/learnWordsAPIService';
import getNotation from '../components/getNotation/getNotation';

const baseUrl = 'https://raw.githubusercontent.com/irinainina/rslang-data/master/';

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
  wordsPerDay: localStorage.getItem('wordsPerDay'),
  userCardsCount: localStorage.getItem('userCardsCount'),
  userSetExample: localStorage.getItem('userSetExample'),
  userSetExplanation: localStorage.getItem('userSetExplanation'),
  userSetImage: localStorage.getItem('userSetImage'),
  userSetTranscription: localStorage.getItem('userSetTranscription'),
  userSetTranslate: localStorage.getItem('userSetTranslate'),
  userLevel: localStorage.getItem('userLevel'),
});

export const getPhrase = (iterator, size, word, wordId, text, audioExample,
  audioWord, audioExplanation) => {
  let inputLength = (word.match(/[lijft]/g)) ? size - 1 : size;
  inputLength = (word.match(/[mw]/g)) ? inputLength + 1 : inputLength;
  const input = `<input id = "to-write-${iterator}" class="to-write"size = ${inputLength}
   placeholder = ${word} spellcheck = "false" data = ${wordId} data-audio-example = ${audioExample}
   data-audio = ${audioWord} data-audio-explanation = ${audioExplanation}>`;

  const regExp = /<b.*?>.*?<\/b.*?>/si;
  const phrase = text.replace(regExp, input);
  return phrase;
};

const moveToRight = () => {
  const prevBTN = document.querySelector('#main-button-prev');
  const slidesArr = Array.from(document.querySelectorAll('.main-swiper .swiper-slide'));
  prevBTN.classList.remove('main-btn-disable');

  slidesArr.forEach((el) => {
    const slide = el;
    const current = (slide.style.right).slice(0, -1) || 0;
    slide.style.right = `${+current + 100}%`;
  });
};

const moveToLeft = () => {
  const slidesArr = Array.from(document.querySelectorAll('.main-swiper .swiper-slide'));
  slidesArr.forEach((el) => {
    const slide = el;
    const current = (slide.style.right).slice(0, -1) || 0;
    slide.style.right = `${+current - 100}%`;
  });
};

const soundHandler = () => {
  localStorage.setItem('soundOn', 'true');
  const soundHandlersArr = Array.from(document.querySelectorAll('.main-speaker'));

  const soundToggle = () => {
    soundHandlersArr.forEach((soundHandlerIcon) => {
      soundHandlerIcon.classList.toggle('sound-off');
      if (soundHandlerIcon.classList.contains('fa-volume-up')) {
        soundHandlerIcon.classList.remove('fa-volume-up');
        soundHandlerIcon.classList.add('fa-volume-mute');
      } else if (soundHandlerIcon.classList.contains('fa-volume-mute')) {
        soundHandlerIcon.classList.remove('fa-volume-mute');
        soundHandlerIcon.classList.add('fa-volume-up');
      }
    });
  };

  soundHandlersArr.forEach((soundHandlerIcon) => {
    soundHandlerIcon.addEventListener('click', () => {
      soundToggle();
    });
  });
};

const eyeSpeakerHandler = () => {
  const speakersArr = Array.from(document.querySelectorAll('.main-eye'));

  speakersArr.forEach((speaker) => {
    const current = speaker.getAttribute('id');
    const currentInput = document.querySelector(`#to-write-${current}`);
    const urlAudio = speaker.getAttribute('data-audio');

    speaker.addEventListener('click', () => {
      const currentID = speaker.getAttribute('id');
      const soundIcon = document.querySelector(`#main-speaker-${currentID}`);
      currentInput.value = '';
      currentInput.classList.add('show');
      if (!soundIcon.classList.contains('sound-off')) {
        new Audio(`${baseUrl}${urlAudio}`).play();
      }
    });
  });
};

const addToUserWords = (dataWord) => {
  const data = [
    localStorage.getItem('userId'),
    dataWord.wordId,
    localStorage.getItem('token'),
    dataWord.wordDifficulty,
    {
      word: dataWord.word,
      wordAudio: dataWord.wordAudio,
      wordTranslate: dataWord.wordTranslate,
      wordImage: dataWord.wordImage,
    },
  ];

  console.log(...data);
  learnWordsAPIService.createUserWord(...data);
};

const validateAnswer = (event, iterator, slidesCount) => {
  // const currentCardNumber = iterator + 1;
  const lastCardNumber = slidesCount;

  const currentCardLabel = document.querySelector('#current-slide');
  const lastCardLabel = document.querySelector('#slides-count');
  const progressBar = document.querySelector('.main-swiper .progress-bar');

  // currentCardLabel.innerText = currentCardNumber;
  lastCardLabel.innerText = lastCardNumber;

  const changeProgressBar = (i) => {
    const currentCardNumber = i + 2;
    currentCardLabel.innerText = currentCardNumber;
    const currentProgress = Math.floor((currentCardNumber / lastCardNumber) * 100);
    progressBar.style.width = `${currentProgress}%`;
  };

  const lastSlide = slidesCount - 1;
  const currentInput = document.querySelector(`#to-write-${iterator}`);
  // const currentArrowBTN = document.querySelector(`#main-arrow-${iterator}`);
  const currentCard = document.querySelector(`#main-card-${iterator}`);
  const nextBTN = document.querySelector('#main-button-next');
  currentInput.focus();
  let wordDifficulty = 'false';

  if (event.keyCode === 13 || event.type === 'enterClick') {
    if (currentInput.value === currentInput.placeholder) {
      currentInput.style.color = '#34c716';
      currentInput.blur();
      currentCard.setAttribute('guessed', 'true');

      const dataWord = {
        wordId: currentInput.getAttribute('data'),
        word: currentInput.placeholder,
        wordDifficulty,
        wordAudio: currentInput.getAttribute('data-audio'),
        wordTranslate: currentCard.getAttribute('data-translate'),
        wordImage: currentCard.getAttribute('data-img'),
      };
      addToUserWords(dataWord);

      const urlAudio = currentInput.getAttribute('data-audio');
      const audioWord = new Audio(`${baseUrl}${urlAudio}`);
      const urlAudioExample = currentInput.getAttribute('data-audio-example');
      const audioExample = new Audio(`${baseUrl}${urlAudioExample}`);
      const urlAudioExplanation = currentInput.getAttribute('data-audio-explanation');
      const audioExplanation = new Audio(`${baseUrl}${urlAudioExplanation}`);

      const soundIcon = document.querySelector(`#main-speaker-${iterator}`);

      if (!soundIcon.classList.contains('sound-off')) {
        audioWord.play();

        if (localStorage.getItem('userSetExample') === 'true') {
          audioWord.addEventListener('ended', () => {
            setTimeout(() => {
              audioExample.play();
            }, 500);
          });
          if (localStorage.getItem('userSetExplanation') === 'true') {
            audioExample.addEventListener('ended', () => {
              setTimeout(() => {
                audioExplanation.play();
              }, 500);
            });
          }
        } else if (localStorage.getItem('userSetExplanation') === 'true') {
          audioWord.addEventListener('ended', () => {
            setTimeout(() => {
              audioExplanation.play();
            }, 500);
          });
        }
        audioWord.addEventListener('ended', () => {
          if (localStorage.getItem('userSetExample') === 'true') {
            audioExample.addEventListener('ended', () => {
              if (localStorage.getItem('userSetExplanation') === 'true') {
                audioExplanation.addEventListener('ended', () => {
                  nextBTN.classList.remove('main-btn-disable');
                  if (iterator === lastSlide) {
                    nextBTN.classList.add('main-btn-disable');
                    getNotation();
                  } else {
                    nextBTN.click();
                    changeProgressBar(iterator);
                  }
                });
              } else {
                nextBTN.classList.remove('main-btn-disable');
                if (iterator === lastSlide) {
                  nextBTN.classList.add('main-btn-disable');
                  getNotation();
                } else {
                  nextBTN.click();
                  changeProgressBar(iterator);
                }
              }
            });
          } else if (localStorage.getItem('userSetExplanation') === 'true') {
            audioExplanation.addEventListener('ended', () => {
              nextBTN.classList.remove('main-btn-disable');
              if (iterator === lastSlide) {
                nextBTN.classList.add('main-btn-disable');
                getNotation();
              } else {
                nextBTN.click();
                changeProgressBar(iterator);
              }
            });
          } else {
            nextBTN.classList.remove('main-btn-disable');
            if (iterator === lastSlide) {
              nextBTN.classList.add('main-btn-disable');
              getNotation();
            } else {
              nextBTN.click();
              changeProgressBar(iterator);
            }
          }
        });
      } else if (iterator === lastSlide) {
        nextBTN.classList.add('main-btn-disable');
        getNotation();
      } else {
        setTimeout(() => {
          nextBTN.click();
          changeProgressBar(iterator);
        }, 1500);
      }
    } else {
      const soundIcon = document.querySelector(`#main-speaker-${iterator}`);
      wordDifficulty = 'true';
      currentInput.classList.add('incorrect');
      if (!soundIcon.classList.contains('sound-off')) {
        new Audio('../../../assets/audio/error.mp3').play();
      }
      setTimeout(() => {
        currentInput.value = '';
        currentInput.classList.remove('incorrect');
      }, 1500);
    }
  }
};

export const inputHandler = (iterator, slidesCount) => {
  const currentInput = document.querySelector(`#to-write-${iterator}`);
  const currentArrowBTN = document.querySelector(`#main-arrow-${iterator}`);
  const currentCard = document.querySelector(`#main-card-${iterator}`);
  const nextBTN = document.querySelector('#main-button-next');
  currentInput.focus();

  if (currentCard.getAttribute('guessed') === 'false') {
    nextBTN.classList.add('main-btn-disable');
  }

  currentArrowBTN.addEventListener('click', () => {
    const emulateEnter = new CustomEvent('enterClick', { detail: { action: 'keydown' } });
    currentInput.dispatchEvent(emulateEnter);
  });

  currentInput.addEventListener('keydown', (e) => validateAnswer(e, iterator, slidesCount));
  currentInput.addEventListener('enterClick', (e) => validateAnswer(e, iterator, slidesCount));
};

export const moveCardHandler = () => {
  const prevBTN = document.querySelector('#main-button-prev');
  const nextBTN = document.querySelector('#main-button-next');
  const slidesArr = Array.from(document.querySelectorAll('.main-swiper .swiper-slide'));
  let currentSlide = 0;
  const slidesCount = slidesArr.length;

  const lastCardNumber = slidesCount;
  const lastCardLabel = document.querySelector('#slides-count');
  const progressBar = document.querySelector('.main-swiper .progress-bar');

  const currentProgress = Math.floor((1 / lastCardNumber) * 100);
  lastCardLabel.innerText = lastCardNumber;
  progressBar.style.width = `${currentProgress}%`;

  eyeSpeakerHandler();
  soundHandler();
  inputHandler(currentSlide, slidesCount);

  nextBTN.addEventListener('click', () => {
    const isNotLastSlide = currentSlide < slidesArr.length - 1;

    if (isNotLastSlide) {
      nextBTN.classList.remove('main-btn-disable');
      moveToRight();
      currentSlide += 1;
      inputHandler(currentSlide, slidesCount);
      if (currentSlide === slidesArr.length - 1) {
        nextBTN.classList.add('main-btn-disable');
      }
    }
  });

  prevBTN.addEventListener('click', () => {
    const isNotFirstSlide = currentSlide > 0;
    nextBTN.classList.remove('main-btn-disable');

    if (isNotFirstSlide) {
      prevBTN.classList.remove('main-btn-disable');
      moveToLeft();
      currentSlide -= 1;
      inputHandler(currentSlide, slidesCount);
    }
    if (currentSlide === 0) { prevBTN.classList.add('main-btn-disable'); }
  });
};

export async function greeting() {
  const greetingForUser = document.querySelector('.greeting-for-user');
  greetingForUser.innerHTML = `Привет, ${localStorage.getItem('userName')}!`;
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

const getRandomPage = (max) => {
  const rand = Math.random() * (max);
  return Math.floor(rand);
};

const getWords = async () => {
  const page = getRandomPage(30);
  const group = Number(localStorage.getItem('userLevel'));
  const words = await learnWordsAPIService.getWordsByPageAndGroup(page, group);
  console.log(words);
  return words;
};

export const setWordsForCards = async () => {
  const userWords = await learnWordsAPIService.getAllUserWords(localStorage.getItem('userId'), localStorage.getItem('token'));
  console.log(userWords);
  const newWords = await getWords();
  const wordsForCards = newWords.filter((newWord) => userWords.every((userWord) => userWord.wordId !== newWord.id));
  return wordsForCards;
};

export const getNewRandomWord = async () => {
  const userWords = await learnWordsAPIService.getAllUserWords(localStorage.getItem('userId'), localStorage.getItem('token'));
  const newWords = await getWords();
  const word = newWords[getRandomPage(20)];

  const mass = userWords.map(({ wordId }) => wordId);

  if (mass.indexOf(word.id) === -1) {
    return word;
  }

  getNewRandomWord();
};
