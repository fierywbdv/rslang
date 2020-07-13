import {
  addToUserWords, updateUserWords, updateMixUserWords, changeProgressBar,
} from '../../common/main.utils';
import getNotation from '../getNotation/getNotation';

const difficultyWordHandler = () => {
  const difficultyButtonsArr = Array.from(document.querySelectorAll('.main-difficulty-icon'));
  const lastSlide = Number(document.querySelector('#slides-count').textContent);
  const nextBTN = document.querySelector('#main-button-next');

  if (difficultyButtonsArr.length > 0) {
    difficultyButtonsArr.forEach((button) => {
      button.addEventListener('click', () => {
        const currentIterator = Number(button.getAttribute('id'));
        const card = document.querySelector(`#main-card-${currentIterator}`);
        const input = document.querySelector(`#to-write-${currentIterator}`);
        const typeOfGame = localStorage.getItem('typeOfGame');

        const dataWord = {
          wordId: input.getAttribute('data'),
          word: input.placeholder,
          wordDifficulty: "'true'",
          wordAudio: input.getAttribute('data-audio'),
          wordTranslate: card.getAttribute('data-translate'),
          wordImage: card.getAttribute('data-img'),
        };

        input.classList.add('deleted');
        if (typeOfGame === 'new') {
          addToUserWords(dataWord, 'true');
        }
        if (typeOfGame === 'repeat') {
          updateUserWords(dataWord, 'true');
        }
        if (typeOfGame === 'mix') {
          updateMixUserWords(dataWord, 'true');
        }

        if (currentIterator + 1 === lastSlide) {
          setTimeout(() => {
            nextBTN.classList.add('main-btn-disable');
            getNotation();
          }, 1000);
        } else {
          setTimeout(() => {
            nextBTN.click();
            changeProgressBar(currentIterator, lastSlide);
          }, 1000);
        }
      });
    });
  }
};
export default difficultyWordHandler;
