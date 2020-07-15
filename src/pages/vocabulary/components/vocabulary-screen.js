import '../scss/vocabulary.styles.scss';
import { learnWordsAPIService } from '../../../services/learnWordsAPIService';

const vocabularyComponent = () => {

  const template = `<div class = "main-div-vocabulary"><table class="table vocabulary-table table-hover">
  <thead class = "thead-dark">
    <tr>
      <th scope="col">Изучаемые слова</th>
      <th scope="col">Сложные слова</th>
      <th scope="col">Удаленные слова</th>
    </tr>
  </thead>
  <tbody class = "table-body">
  </tbody>
</table></div>`;
  const startScreen = document.createElement('div');
  startScreen.setAttribute('id', 'vocabulary-screen');
  startScreen.innerHTML = template;
  startScreen.className = 'vocabulary-screen';
  return startScreen;
};

export const addWordsToVocabulary = async () => {
  const words = await learnWordsAPIService.getAllUserWords(localStorage.getItem('userId'), localStorage.getItem('token'));

  const learnedWords = words;
  const complexWords = words.filter((el) => el.difficulty === 'true');
  const deletedWords = words.filter((el) => el.optional.isDeleted === 'true');


  const tableBody = document.querySelector('.table-body');
  const numberOfTr = Math.max(learnedWords.length, complexWords.length, deletedWords.length);

  let fullTrs = ``;

  for(let i = 0; i< numberOfTr; i++) {

    let tr = `<tr>`;
    
    if(learnedWords[i] !== undefined) {
      tr += `<td class = "learned-words" style = "color: green">${learnedWords[i].optional.word.word} | ${learnedWords[i].optional.word.transcription}<button style = "visibility: hidden" type="button" class="btn btn-outline-warning learned-button" wordId = "${learnedWords[i].optional.word.id}">Удалить из изученных</button></td>`;
    } else {
      tr += `<td></td>`
    }
  
    if(complexWords[i] !== undefined) {
      tr += `<td class = "hard-words" style = "color: orange">${complexWords[i].optional.word.word} | ${complexWords[i].optional.word.transcription}<button style = "visibility: hidden" type="button" class="btn btn-outline-success easy-button" wordId = "${complexWords[i].optional.word.id}">Перевести в легкие</button></td>`;
    } else {
      tr += `<td></td>`
    }
    
    if(deletedWords[i] !== undefined) {
      tr += `<td class = "deleted-words" style = "color: red">${deletedWords[i].optional.word.word} | ${deletedWords[i].optional.word.transcription}<button style = "visibility: hidden" type="button" class="btn btn-outline-danger delete-button" wordId = "${deletedWords[i].optional.word.id}">Восстановить</button></td>`
    } else {
      tr += `<td></td>`
    }
    tr += `</tr>`;
    fullTrs += tr;
  }
  tableBody.innerHTML = fullTrs;

  document.querySelectorAll('.deleted-words').forEach((el) => {
    el.addEventListener('mouseover', () => {
      el.querySelector('.delete-button').removeAttribute('style');
    })
  })

  document.querySelectorAll('.deleted-words').forEach((el) => {
    el.addEventListener('mouseout', () => {
      el.querySelector('.delete-button').setAttribute('style', 'visibility: hidden');
    })
  })

  document.querySelectorAll('.hard-words').forEach((el) => {
    el.addEventListener('mouseover', () => {
      el.querySelector('.easy-button').removeAttribute('style');
    })
  })

  document.querySelectorAll('.hard-words').forEach((el) => {
    el.addEventListener('mouseout', () => {
      el.querySelector('.easy-button').setAttribute('style', 'visibility: hidden');
    })
  })

  document.querySelectorAll('.learned-words').forEach((el) => {
    el.addEventListener('mouseover', () => {
      el.querySelector('.learned-button').removeAttribute('style');
    })
  })

  document.querySelectorAll('.learned-words').forEach((el) => {
    el.addEventListener('mouseout', () => {
      el.querySelector('.learned-button').setAttribute('style', 'visibility: hidden');
    })
  })

  document.querySelectorAll('.delete-button').forEach((el) => {
    el.addEventListener('click', async () => {
      const wordId = el.getAttribute('wordid');
      const word = await learnWordsAPIService.getUserWordById(localStorage.getItem('userId'), `${wordId}`, localStorage.getItem('token'));
      word.optional.isDeleted = 'false';
      await learnWordsAPIService.updateUserWord(localStorage.getItem('userId'), `${wordId}`, localStorage.getItem('token'), 'false', word.optional);
      addWordsToVocabulary();
    })
  })

  document.querySelectorAll('.learned-button').forEach((el) => {
    el.addEventListener('click', async () => {
      const wordId = el.getAttribute('wordid');
      await learnWordsAPIService.deleteUserWord(localStorage.getItem('userId'), `${wordId}`, localStorage.getItem('token'));
      addWordsToVocabulary();
    })
  })

  document.querySelectorAll('.easy-button').forEach((el) => {
    el.addEventListener('click', async () => {
      const wordId = el.getAttribute('wordid');
      const word = await learnWordsAPIService.getUserWordById(localStorage.getItem('userId'), `${wordId}`, localStorage.getItem('token'));
      await learnWordsAPIService.updateUserWord(localStorage.getItem('userId'), `${wordId}`, localStorage.getItem('token'), 'false', word.optional);
      addWordsToVocabulary();
    })
  })
}

export default vocabularyComponent;