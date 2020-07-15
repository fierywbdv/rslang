import '../scss/statistic.styles.scss';
import { learnWordsAPIService } from '../../../services/learnWordsAPIService';

const statisticComponent = () => {

  const template = `<table class="table statistic-table table-hover">
  <thead class = "thead-dark">
    <tr>
      <th scope="col">Кол-во выученных слов</th>
      <th scope="col">% выученных слов</th>
      <th scope="col">Колличество сложных слов</th>
      <th scope="col">% сложных слов</th>
      <th scope="col">Колличество легких слов</th>
      <th scope="col">% легких слов</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th class = "learned-words"></th>
      <td class = "learned-words-percent"></td>
      <td class = "complex-words"></td>
      <td class = "complex-words-percent"></td>
      <td class = "lungs-words"></td>
      <td class = "lungs-words-percent"></td>
    </tr>
  </tbody>
</table>`;
  const startScreen = document.createElement('div');
  startScreen.setAttribute('id', 'statistic-screen');
  startScreen.innerHTML = template;
  startScreen.className = 'statistic-screen';
  return startScreen;
};

export const setStatisticToTable = async () => {
  const statistic = await learnWordsAPIService.getAllUserWords(localStorage.getItem('userId'), localStorage.getItem('token'));
  console.log(statistic);

  const learnedWords = document.querySelector('.learned-words');
  const learnedWordsPercent = document.querySelector('.learned-words-percent');
  const complexWords = document.querySelector('.complex-words');
  const complexWordsPercent = document.querySelector('.complex-words-percent');
  const lungsWords = document.querySelector('.lungs-words');
  const lungsWordsPercent = document.querySelector('.lungs-words-percent');

  learnedWords.innerHTML = statistic.length;

  const percentLearnedWords = statistic.length*100/3600;
  learnedWordsPercent.innerHTML = `${percentLearnedWords.toFixed(2)}%`;

  complexWords.innerHTML = `${statistic.filter((el) => el.difficulty === 'true').length}`;

  const percentComplexWords = statistic.filter((el) => el.difficulty === 'true').length * 100 / statistic.length;
  complexWordsPercent.innerHTML = `${percentComplexWords.toFixed(2)}%`

  lungsWords.innerHTML = `${statistic.filter((el) => el.difficulty === 'false').length}`;

  const percentLungsWords = statistic.filter((el) => el.difficulty === 'false').length * 100 / statistic.length;
  lungsWordsPercent.innerHTML = `${percentLungsWords.toFixed(2)}%`
}

export default statisticComponent;