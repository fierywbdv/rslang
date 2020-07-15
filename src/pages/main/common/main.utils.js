import { learnWordsAPIService } from '../../../services/learnWordsAPIService';
import getNotation from '../components/getNotation/getNotation';
import { mass } from '../components/card/generateCards';

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

export const sidebarListener = () => {
  const sidebar = document.querySelector('.side-navbar');
  const toggleBTN = document.querySelector('.menu-btn');
  const containerMain = document.querySelector('.main-swiper.swiper-container');
  const containerUser = document.querySelector('.container-fluid.user-container');
  const containerSelect = document.querySelector('.select-screen-card.container-fluid');

  if (sidebar.classList.contains('shrinked')) {
    if (containerMain) { containerMain.classList.add('container-shrinked'); }
    if (containerUser) { containerUser.classList.add('container-shrinked'); }
    if (containerSelect) { containerSelect.classList.add('container-shrinked'); }
  }

  toggleBTN.addEventListener('click', () => {
    const containerMainDiv = document.querySelector('.main-swiper.swiper-container');
    const containerUserDiv = document.querySelector('.container-fluid.user-container');
    const containerSelectDiv = document.querySelector('.select-screen-card.container-fluid');
    const url = window.location.hash;

    if (url === '#main') {
      if (sidebar.classList.contains('shrinked')) {
        containerMainDiv.classList.add('container-shrinked');
      } else {
        containerMainDiv.classList.remove('container-shrinked');
      }
    }
    if (url === '#user') {
      if (sidebar.classList.contains('shrinked')) {
        containerUserDiv.classList.add('container-shrinked');
      } else {
        containerUserDiv.classList.remove('container-shrinked');
      }
    }
    if (url === '') {
      if (sidebar.classList.contains('shrinked')) {
        containerSelectDiv.classList.add('container-shrinked');
      } else {
        containerSelectDiv.classList.remove('container-shrinked');
      }
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

export const getPhraseMeaning = (wordObj, needInput = 'true') => {
  const {
    iterator, word, id, audioExample, audio, audioMeaning, textMeaning,
  } = wordObj;
  const wordSize = word.length;

  const input = `<input id = "to-write-${iterator}" class="to-write" size = ${wordSize}
   placeholder = ${word} spellcheck = "false" data = ${id} data-audio-example = ${audioExample}
   data-audio = ${audio} data-audio-explanation = ${audioMeaning}>`;

  const regExp = /<i.*?>.*?<\/i.*?>/si;

  const dasher = `<span class = "underlined"><span class = "underlined_word"
  id = "underlined_word-${iterator}">${word}</span></span>`;

  let phraseMeaning = textMeaning;

  if (needInput === 'true') {
    phraseMeaning = textMeaning.replace(regExp, input);
  } else {
    phraseMeaning = textMeaning.replace(regExp, dasher);
  }
  return phraseMeaning;
};

export const getPhraseExample = (wordObj, needInput = 'false') => {
  const {
    id, iterator, word, audioExample, textExample, audio,
  } = wordObj;
  const wordSize = word.length;

  const input = `<input id = "to-write-example-${iterator}" data = ${id} class="to-write" size = ${wordSize}
   placeholder = ${word} spellcheck = "false" data-audio = ${audio} data-audio-explanation = ${audioExample}>`;

  const regExp = /<b.*?>.*?<\/b.*?>/si;

  const dasher = `<span class = "underlined"><span class = "underlined_word"
  id = "underlined_word-${iterator}">${word}</span></span>`;

  let phraseExplanation = textExample;

  if (needInput === 'true') {
    phraseExplanation = textExample.replace(regExp, input);
  } else {
    phraseExplanation = textExample.replace(regExp, dasher);
  }

  return phraseExplanation;
};

export const getWordInput = (wordObj) => {
  const {
    iterator, word, id, audioExample, audio, audioMeaning,
  } = wordObj;
  const wordSize = word.length;

  const input = `<input id = "to-write-word-${iterator}" class="to-write" size = ${wordSize}
   placeholder = ${word} spellcheck = "false" data = ${id} data-audio-example = ${audioExample}
   data-audio = ${audio} data-audio-explanation = ${audioMeaning}>`;

  return input;
};

const moveToRight = () => {
  const prevBTN = document.querySelector('#main-button-prev');
  const slidesArr = Array.from(document.querySelectorAll('.main-swiper .swiper-slide'));

  if (prevBTN) {
    prevBTN.classList.remove('main-btn-disable');

    slidesArr.forEach((el) => {
      const slide = el;
      const current = (slide.style.right).slice(0, -1) || 0;
      slide.style.right = `${+current + 100}%`;
    });
  }
};

const moveToLeft = () => {
  const slidesArr = Array.from(document.querySelectorAll('.main-swiper .swiper-slide'));
  slidesArr.forEach((el) => {
    const slide = el;
    const current = (slide.style.right).slice(0, -1) || 0;
    slide.style.right = `${+current - 100}%`;
  });
};

export const changeProgressBar = (index, slidesCount) => {
  const currentCardLabel = document.querySelector('#current-slide');
  const progressBar = document.querySelector('.main-swiper .progress-bar');
  const lastCardNumber = slidesCount;
  const currentCardNumber = index + 2;

  currentCardLabel.innerText = currentCardNumber;
  const currentProgress = Math.floor((currentCardNumber / lastCardNumber) * 100);
  progressBar.style.width = `${currentProgress}%`;
};

const soundHandler = () => {
  localStorage.setItem('soundOn', 'true');
  const soundHandlersArr = Array.from(document.querySelectorAll('.main-speaker'));

  if (soundHandlersArr.length > 0) {
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
  }
};

const eyeSpeakerHandler = () => {
  const speakersArr = Array.from(document.querySelectorAll('.main-eye'));
  const nextBTN = document.querySelector('#main-button-next');
  const lastSlide = Number(document.querySelector('#slides-count').textContent);

  if (speakersArr.length > 0) {
    speakersArr.forEach((speaker) => {
      const current = speaker.getAttribute('data_id');
      const currentCard = document.querySelector(`#main-card-${current}`);
      const nextArrow = document.querySelector(`#main-arrow-${current}`);
      const explanationTranslate = document.querySelector(`#explanation-translate-${current}`);
      const exampleTranslate = document.querySelector(`#example-translate-${current}`);
      const footerTranslate = document.querySelector(`#footer-translate-${current}`);

      let currentInput;
      let exampleInput;

      const userSetExplanation = localStorage.getItem('userSetExplanation') === 'true';
      const userSetExample = localStorage.getItem('userSetExample') === 'true';

      if (userSetExplanation) {
        currentInput = document.querySelector(`#to-write-${current}`);
      } else if (userSetExample) {
        currentInput = document.querySelector(`#to-write-example-${current}`);
      } else {
        currentInput = document.querySelector(`#to-write-word-${current}`);
      }

      if (userSetExample && userSetExplanation) {
        exampleInput = document.querySelector(`#underlined_word-${current}`);
      }

      const urlAudio = speaker.getAttribute('data-audio');

      const mainDailyStatistic = JSON.parse(localStorage.getItem('mainDailyStatistic')) || {};
      let learnedCards = Number(mainDailyStatistic.learnedWords) || 0;

      speaker.addEventListener('click', () => {
        if (!speaker.classList.contains('eye-disabled')) {
          learnedCards += 1;
          mainDailyStatistic.learnedCards = learnedCards;
          localStorage.setItem('mainDailyStatistic', JSON.stringify(mainDailyStatistic));

          speaker.classList.add('eye-disabled');
          nextArrow.classList.add('main-arrow-disabled');
          const currentID = Number(speaker.getAttribute('data_id'));
          const soundIcon = document.querySelector(`#main-speaker-${currentID}`);
          const currentSlide = currentID + 1;
          currentInput.value = '';
          currentInput.classList.add('show');
          if (exampleInput) { exampleInput.classList.add('show'); }
          if (explanationTranslate) { explanationTranslate.classList.add('show'); }
          if (exampleTranslate) { exampleTranslate.classList.add('show'); }
          if (footerTranslate) { footerTranslate.classList.add('show'); }
          currentCard.setAttribute('guessed', 'true');

          if (!soundIcon.classList.contains('sound-off')) {
            new Audio(`${baseUrl}${urlAudio}`).play();
          }
          setTimeout(() => {
            nextBTN.classList.remove('main-btn-disable');

            if (currentSlide === lastSlide) {
              nextBTN.classList.add('main-btn-disable');
              getNotation();
            } else {
              currentInput.readOnly = true;
              nextBTN.click();
              speaker.classList.add('end');
              nextArrow.classList.add('end');
              changeProgressBar(currentID, lastSlide);
            }
          }, 3000);
        }
      });
    });
  }
};

const getUserWord = async (wordID) => {
  const newWord = await learnWordsAPIService.getUserWordById(localStorage.getItem('userId'), wordID, localStorage.getItem('token'));
  if (newWord === undefined) {
    return 'false';
  }
  return 'true';
};

export const addToUserWords = async (dataWord, isDeleted) => {
  const data = [
    localStorage.getItem('userId'),
    dataWord.wordId,
    localStorage.getItem('token'),
    dataWord.wordDifficulty,
    {
      isDeleted,
      word: mass[0],
    },
  ];

  mass.shift();
  learnWordsAPIService.createUserWord(...data);
};

export const updateUserWords = async (dataWord, isDeleted) => {
  const data = [
    localStorage.getItem('userId'),
    dataWord.wordId,
    localStorage.getItem('token'),
    dataWord.wordDifficulty,
    {
      isDeleted,
      word: mass[0],
    },
  ];

  mass.shift();

  const wordIsStudied = await getUserWord(dataWord.wordId);

  if (wordIsStudied === 'true') {
    learnWordsAPIService.updateUserWord(...data);
  }
  if (wordIsStudied === 'false') {
    learnWordsAPIService.createUserWord(...data);
  }
};

export const updateMixUserWords = async (dataWord, isDeleted) => {
  const data = [
    localStorage.getItem('userId'),
    dataWord.wordId,
    localStorage.getItem('token'),
    dataWord.wordDifficulty,
    {
      isDeleted,
      word: mass[0],
    },
  ];

  mass.shift();

  const wordIsStudied = await getUserWord(dataWord.wordId);
  if (wordIsStudied === 'true') {
    learnWordsAPIService.updateUserWord(...data);
  }
  if (wordIsStudied === 'false') {
    learnWordsAPIService.createUserWord(...data);
  }
};

const validateAnswer = (event, iterator, slidesCount) => {
  const lastCardNumber = slidesCount;
  const lastCardLabel = document.querySelector('#slides-count');

  lastCardLabel.innerText = lastCardNumber;
  let currentInput;
  const lastSlide = slidesCount - 1;

  const userSetExplanation = localStorage.getItem('userSetExplanation') === 'true';
  const userSetExample = localStorage.getItem('userSetExample') === 'true';

  if (userSetExplanation) {
    currentInput = document.querySelector(`#to-write-${iterator}`);
  } else if (userSetExample) {
    currentInput = document.querySelector(`#to-write-example-${iterator}`);
  } else {
    currentInput = document.querySelector(`#to-write-word-${iterator}`);
  }

  const currentCard = document.querySelector(`#main-card-${iterator}`);
  const nextBTN = document.querySelector('#main-button-next');
  const explanationTranslate = document.querySelector(`#explanation-translate-${iterator}`);
  const exampleTranslate = document.querySelector(`#example-translate-${iterator}`);
  const wordTranslate = document.querySelector(`#footer-translate-${iterator}`);
  const exampleInput = document.querySelector(`#underlined_word-${iterator}`);
  const nextArrow = document.querySelector(`#main-arrow-${iterator}`);
  const speaker = document.querySelector(`#main-eye-${iterator}`);

  currentInput.focus();

  if (event.keyCode === 13 || event.type === 'enterClick') {
    const mainDailyStatistic = JSON.parse(localStorage.getItem('mainDailyStatistic')) || {};
    let learnedWords = Number(mainDailyStatistic.learnedWords) || 0;
    learnedWords += 1;
    mainDailyStatistic.learnedWords = learnedWords;
    let learnedCards = Number(mainDailyStatistic.learnedWords) || 0;
    learnedCards += 1;
    mainDailyStatistic.learnedCards = learnedCards;

    localStorage.setItem('mainDailyStatistic', JSON.stringify(mainDailyStatistic));

    if (currentInput.value === currentInput.placeholder) {
      if (speaker) { speaker.classList.add('eye-disabled'); }
      nextArrow.classList.add('main-arrow-disabled');
      if (explanationTranslate) { explanationTranslate.classList.add('show'); }
      if (exampleTranslate) { exampleTranslate.classList.add('show'); }
      if (wordTranslate) { wordTranslate.classList.add('show'); }

      let guessedWords = Number(mainDailyStatistic.guessedWords) || 0;
      guessedWords += 1;
      mainDailyStatistic.guessedWords = guessedWords;
      let currentGuessedRow = Number(mainDailyStatistic.currentGuessedRow) || 0;
      currentGuessedRow += 1;
      mainDailyStatistic.currentGuessedRow = currentGuessedRow;
      let maxGuessedRow = Number(mainDailyStatistic.maxGuessedRow) || 0;
      maxGuessedRow = currentGuessedRow > maxGuessedRow ? currentGuessedRow : maxGuessedRow;
      mainDailyStatistic.maxGuessedRow = maxGuessedRow;
      localStorage.setItem('mainDailyStatistic', JSON.stringify(mainDailyStatistic));

      currentInput.style.color = '#34c716';
      currentInput.blur();
      currentCard.setAttribute('guessed', 'true');
      currentInput.readOnly = true;
      if (exampleInput) { exampleInput.classList.add('show'); }

      const dataWord = {
        wordId: currentInput.getAttribute('data'),
        word: currentInput.placeholder,
        wordDifficulty: localStorage.getItem('wordDifficulty'),
        wordAudio: currentInput.getAttribute('data-audio'),
        wordTranslate: currentCard.getAttribute('data-translate'),
        wordImage: currentCard.getAttribute('data-img'),
      };

      if (localStorage.getItem('typeOfGame') === 'new') {
        addToUserWords(dataWord, 'false');
      }
      if (localStorage.getItem('typeOfGame') === 'repeat') {
        updateUserWords(dataWord, 'false');
      }
      if (localStorage.getItem('typeOfGame') === 'mix') {
        updateMixUserWords(dataWord, 'false');
      }

      const urlAudio = currentInput.getAttribute('data-audio');
      const audioWord = new Audio(`${baseUrl}${urlAudio}`);

      let urlAudioExample;
      let urlAudioExplanation;

      if (localStorage.getItem('userSetExplanation') === 'true') {
        urlAudioExplanation = currentInput.getAttribute('data-audio-explanation');
      }
      if (localStorage.getItem('userSetExample') === 'true') {
        urlAudioExample = currentInput.getAttribute('data-audio-example');
      }

      const audioExplanation = new Audio(`${baseUrl}${urlAudioExplanation}`);
      const audioExample = new Audio(`${baseUrl}${urlAudioExample}`);

      const soundIcon = document.querySelector(`#main-speaker-${iterator}`);

      if (!soundIcon.classList.contains('sound-off')) {
        audioWord.play();

        if (localStorage.getItem('userSetExplanation') === 'true') {
          audioWord.addEventListener('ended', () => {
            setTimeout(() => {
              audioExplanation.play();
            }, 500);
          });
          if (localStorage.getItem('userSetExample') === 'true') {
            audioExplanation.addEventListener('ended', () => {
              setTimeout(() => {
                audioExample.play();
              }, 500);
            });
          }
        } else if (localStorage.getItem('userSetExample') === 'true') {
          audioWord.addEventListener('ended', () => {
            setTimeout(() => {
              audioExample.play();
            }, 500);
          });
        }

        audioWord.addEventListener('ended', () => {
          if (localStorage.getItem('userSetExplanation') === 'true') {
            audioExplanation.addEventListener('ended', () => {
              if (localStorage.getItem('userSetExample') === 'true') {
                audioExample.addEventListener('ended', () => {
                  nextBTN.classList.remove('main-btn-disable');
                  if (iterator === lastSlide) {
                    nextBTN.classList.add('main-btn-disable');
                    getNotation();
                  } else {
                    nextBTN.click();
                    changeProgressBar(iterator, slidesCount);
                    if (speaker) {
                      speaker.classList.add('eye-disabled');
                      speaker.classList.add('end');
                    }
                    nextArrow.classList.add('main-arrow-disabled');
                    nextArrow.classList.add('end');
                  }
                });
              } else {
                nextBTN.classList.remove('main-btn-disable');
                if (iterator === lastSlide) {
                  nextBTN.classList.add('main-btn-disable');
                  getNotation();
                } else {
                  nextBTN.click();
                  changeProgressBar(iterator, slidesCount);
                  if (speaker) {
                    speaker.classList.add('eye-disabled');
                    speaker.classList.add('end');
                  }
                  nextArrow.classList.add('main-arrow-disabled');
                  nextArrow.classList.add('end');
                }
              }
            });
          } else if (localStorage.getItem('userSetExample') === 'true') {
            audioExample.addEventListener('ended', () => {
              nextBTN.classList.remove('main-btn-disable');
              if (iterator === lastSlide) {
                nextBTN.classList.add('main-btn-disable');
                getNotation();
              } else {
                nextBTN.click();
                changeProgressBar(iterator, slidesCount);
                if (speaker) {
                  speaker.classList.add('eye-disabled');
                  speaker.classList.add('end');
                }
                nextArrow.classList.add('main-arrow-disabled');
                nextArrow.classList.add('end');
              }
            });
          } else {
            nextBTN.classList.remove('main-btn-disable');
            if (iterator === lastSlide) {
              nextBTN.classList.add('main-btn-disable');
              getNotation();
            } else {
              nextBTN.click();
              changeProgressBar(iterator, slidesCount);
              if (speaker) {
                speaker.classList.add('eye-disabled');
                speaker.classList.add('end');
              }
              nextArrow.classList.add('main-arrow-disabled');
              nextArrow.classList.add('end');
            }
          }
        });
      } else if (iterator === lastSlide) {
        nextBTN.classList.add('main-btn-disable');
        setTimeout(() => {
          getNotation();
        }, 1500);
      } else {
        setTimeout(() => {
          nextBTN.click();
          changeProgressBar(iterator, slidesCount);
          if (speaker) {
            speaker.classList.add('eye-disabled');
            speaker.classList.add('end');
          }
          nextArrow.classList.add('main-arrow-disabled');
          nextArrow.classList.add('end');
        }, 1500);
      }
    } else {
      const soundIcon = document.querySelector(`#main-speaker-${iterator}`);
      localStorage.setItem('wordDifficulty', 'true');
      currentInput.classList.add('incorrect');

      let wrongWords = Number(mainDailyStatistic.wrongWords) || 0;
      wrongWords += 1;
      mainDailyStatistic.wrongWords = wrongWords;
      let currentGuessedRow = Number(mainDailyStatistic.currentGuessedRow) || 0;
      currentGuessedRow = 0;
      mainDailyStatistic.currentGuessedRow = currentGuessedRow;
      localStorage.setItem('mainDailyStatistic', JSON.stringify(mainDailyStatistic));

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
  const inputExplanation = document.querySelector(`#to-write-${iterator}`);
  const inputExample = document.querySelector(`#to-write-example-${iterator}`);
  const inputOnlyWord = document.querySelector(`#to-write-word-${iterator}`);

  if (inputExplanation || inputExample || inputOnlyWord) {
    let currentInput;
    if (localStorage.getItem('userSetExplanation') === 'true') {
      currentInput = inputExplanation;
    } else if (localStorage.getItem('userSetExample') === 'true') {
      currentInput = inputExample;
    } else {
      currentInput = inputOnlyWord;
    }

    const currentArrowBTN = document.querySelector(`#main-arrow-${iterator}`);
    const currentCard = document.querySelector(`#main-card-${iterator}`);
    const nextBTN = document.querySelector('#main-button-next');
    currentInput.focus();

    if (currentCard.getAttribute('guessed') === 'false') {
      nextBTN.classList.add('main-btn-disable');
    }

    currentArrowBTN.addEventListener('click', (e) => {
      if (!document.querySelector(`#main-arrow-${iterator}`).classList.contains('main-arrow-disabled')) {
        if (currentCard.getAttribute('guessed') === 'false') {
          const emulateEnter = new CustomEvent('enterClick', { detail: { action: 'keydown' } });
          currentInput.dispatchEvent(emulateEnter);
        } else {
          document.querySelector('#main-button-next').click();
        }
      }
    });

    localStorage.setItem('wordDifficulty', 'false');
    currentInput.addEventListener('keydown', (e) => validateAnswer(e, iterator, slidesCount));
    currentInput.addEventListener('enterClick', (e) => validateAnswer(e, iterator, slidesCount));
  }
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
      changeProgressBar(currentSlide - 1, slidesCount);
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
    changeProgressBar(currentSlide - 1, slidesCount);
  });
};

export async function greeting() {
  const greetingForUser = document.querySelector('.greeting-for-user');
  greetingForUser.innerHTML = `Привет, ${localStorage.getItem('userName')}!`;
}

const getRandomPage = (max) => {
  const rand = Math.random() * (max);
  return Math.floor(rand);
};

const getWords = async () => {
  const page = getRandomPage(30);
  const group = Number(localStorage.getItem('userLevel'));
  const words = await learnWordsAPIService.getWordsByPageAndGroup(page, group);
  return words;
};

const shuffleArr = (arr) => {
  let j;
  let temp;
  const resultArr = arr;
  for (let i = resultArr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    resultArr[j] = arr[i];
    resultArr[i] = temp;
  }
  return resultArr;
};

export const setWordsForCards = async () => {
  const userWords = await learnWordsAPIService.getAllUserWords(localStorage.getItem('userId'), localStorage.getItem('token'));
  const newWords = await getWords();
  const typeOfGame = localStorage.getItem('typeOfGame');

  const onlyNewWords = newWords.filter((newWord) => userWords.every((userWord) => userWord.wordId !== newWord.id));
  const notDeletedWords = userWords.filter((word) => word.optional.isDeleted !== 'true');
  const onlyRepeatWords = notDeletedWords.map((word) => word.optional.word);

  const mixWords = shuffleArr([...onlyRepeatWords, ...onlyNewWords]);

  let wordsForCards = shuffleArr(onlyNewWords);

  switch (typeOfGame) {
    case 'new':
      wordsForCards = shuffleArr(onlyNewWords);
      break;
    case 'repeat':
      wordsForCards = shuffleArr(onlyRepeatWords);
      break;
    case 'mix':
      wordsForCards = mixWords;
      break;
    default:
      break;
  }

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
