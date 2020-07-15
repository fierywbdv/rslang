import {
  addToUserWords, updateUserWords, updateMixUserWords, changeProgressBar,
} from '../../common/main.utils';
import getNotation from '../getNotation/getNotation';

const deleteWordHandler = () => {
  const deleteButtonsArr = Array.from(document.querySelectorAll('.main-delete-icon'));
  const lastSlide = Number(document.querySelector('#slides-count').textContent);
  const nextBTN = document.querySelector('#main-button-next');

  if (deleteButtonsArr.length > 0) {
    deleteButtonsArr.forEach((button) => {
      button.addEventListener('click', () => {
        const currentIterator = Number(button.getAttribute('id'));
        const card = document.querySelector(`#main-card-${currentIterator}`);
        const typeOfGame = localStorage.getItem('typeOfGame');
        card.setAttribute('guessed', 'true');

        if (!button.classList.contains('delete-disabled')) {
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
            wordDifficulty: 'false',
            wordAudio: input.getAttribute('data-audio'),
            wordTranslate: card.getAttribute('data-translate'),
            wordImage: card.getAttribute('data-img'),
          };

          input.classList.add('deleted');
          input.blur();
          input.readOnly = true;

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
              button.classList.add('delete-disabled');
            }, 1000);
          }
        }
      });
    });
  }
};
export default deleteWordHandler;
