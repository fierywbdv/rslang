import {
  addToUserWords, updateUserWords, updateMixUserWords, changeProgressBar,
} from '../../common/main.utils';
import getNotation from '../getNotation/getNotation';

const difficultyWordHandler = () => {
  const difficultyButtonsArr = Array.from(document.querySelectorAll('.main-difficult-icon'));
  const lastSlide = Number(document.querySelector('#slides-count').textContent);
  const nextBTN = document.querySelector('#main-button-next');

  if (difficultyButtonsArr.length > 0) {
    difficultyButtonsArr.forEach((button) => {
      button.addEventListener('click', () => {
        const currentIterator = Number(button.getAttribute('id'));
        const card = document.querySelector(`#main-card-${currentIterator}`);
        const typeOfGame = localStorage.getItem('typeOfGame');
        card.setAttribute('guessed', 'true');

        if (!button.classList.contains('difficult-disabled')) {
          let input;

          if (localStorage.getItem('userSetExplanation') === 'true') {
            input = document.querySelector(`#to-write-${currentIterator}`);
          } else if (localStorage.getItem('userSetExample') === 'true') {
            input = document.querySelector(`#to-write-example-${currentIterator}`);
          } else {
            input = document.querySelector(`#to-write-word-${currentIterator}`);
          }

          const dataWord = {
            wordId: input.getAttribute('data'),
            word: input.placeholder,
            wordDifficulty: 'true',
            wordAudio: input.getAttribute('data-audio'),
            wordTranslate: card.getAttribute('data-translate'),
            wordImage: card.getAttribute('data-img'),
          };

          input.classList.add('difficulty');
          input.blur();
          input.readOnly = true;

          if (typeOfGame === 'new') {
            addToUserWords(dataWord, 'false');
          }
          if (typeOfGame === 'repeat') {
            updateUserWords(dataWord, 'false');
          }
          if (typeOfGame === 'mix') {
            updateMixUserWords(dataWord, 'false');
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
              button.classList.add('difficult-disabled');
            }, 1000);
          }
        }
      });
    });
  }
};

export default difficultyWordHandler;
