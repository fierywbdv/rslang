import { AUDIO_PATH, LAST_ROUND, LAST_LEVEL } from './sprint.constants';

export const shuffle = (array) => array.sort(() => Math.random() - 0.5);

export const createWordsArray = (wordsList) => wordsList.map((item) => item.word);

export const createTranslationsArray = (wordsList) => wordsList.map((item) => item.wordTranslate);

export const setLevelAndRound = () => {
  const storedLevel = +localStorage.getItem('level');
  const storedRound = +localStorage.getItem('round');

  let newLevel;
  let newRound;

  if (storedRound === LAST_ROUND + 1) {
    if (storedLevel === LAST_LEVEL + 1) {
      newLevel = 1;
      newRound = 1;
    } else {
      newLevel = storedLevel + 1;
      newRound = 1;
    }
  } else {
    newLevel = storedLevel;
    newRound = storedRound + 1;
  }

  document.getElementById('level').value = newLevel;
  document.getElementById('round').value = newRound;
};

export const toggleCirclesNumber = () => {
  document.querySelector('.card__circles').firstElementChild.classList.toggle('hidden');
  document.querySelector('.card__circles').lastElementChild.classList.toggle('hidden');
};

export const cleanCircles = () => {
  Array.from(document.querySelectorAll('.circle')).forEach((item) => {
    const circle = item;
    circle.innerHTML = '';
    circle.classList.remove('correct');
  });
};

export const renderBackground = () => {
  const path = './assets/sprint/img/bg-sprint.png';
  const bgImage = new Image();
  bgImage.onload = () => {
    document.querySelector('.sprint-wrapper').style.backgroundImage = `url(${path})`;
    bgImage.remove();
  };
  bgImage.onerror = () => {
    document.querySelector('.sprint-wrapper').style.backgroundColor = 'rgb(159, 59, 130)';
  };
  bgImage.src = path;
};

export const playAudio = (path, isActivated) => {
  if (isActivated) {
    const audio = new Audio(path);
    audio.play();
  }
};

export const playResultsAudio = () => {
  document.querySelector('.results__list').addEventListener('click', (event) => {
    if (event.target.tagName === 'I') {
      const path = event.target.getAttribute('data-audio');
      playAudio(`${AUDIO_PATH}${path}`, true);
    }
  });
};

export const saveStatistics = (points) => {
  const statistics = JSON.parse(localStorage.getItem('statistics')) || [];
  statistics.push({ date: new Date().toLocaleString(), points });
  localStorage.setItem('statistics', JSON.stringify(statistics));
};

export const searchBestResult = () => {
  const statistics = JSON.parse(localStorage.getItem('statistics')) || [];
  return Math.max(...statistics.map((data) => data.points));
};
