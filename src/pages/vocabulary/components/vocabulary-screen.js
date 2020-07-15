import '../scss/vocabulary.styles.scss';
import { learnWordsAPIService } from '../../../services/learnWordsAPIService';

const vocabularyComponent = () => {

  const template = `<div class = "main-div-vocabulary"><h2 class = "vocabulary-heading">Словарь</h2><table class="table vocabulary-table table-hover">
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
      tr += `<td style = "color: green">${learnedWords[i].optional.word.word}</td>`;
    } else {
      tr += `<td></td>`
    }
  
    if(complexWords[i] !== undefined) {
      debugger
      tr += `<td style = "color: orange">${complexWords[i].optional.word.word}</td>`
    } else {
      tr += `<td></td>`
    }
    
    if(deletedWords[i] !== undefined) {
      tr += `<td style = "color: red">${deletedWords[i].optional.word.word}</td>`
    } else {
      tr += `<td></td>`
    }
    tr += `</tr>`;
    fullTrs += tr;
  }
  tableBody.innerHTML = fullTrs;

}

export default vocabularyComponent;