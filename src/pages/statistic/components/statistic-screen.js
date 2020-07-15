import '../scss/statistic.styles.scss';
import { learnWordsAPIService } from '../../../services/learnWordsAPIService';

const statisticComponent = () => {
  const firstTemplate = `<h2 class = "table-heading">Общая статистика</h2><table class="table statistic-table table-hover">
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
  const secondTemplate = `<h2 class = "table-heading">Дневная статистика</h2><table class="table statistic-table table-hover">
  <thead class = "thead-dark">
    <tr>
      <th scope="col">Кол-во выученных слов за день</th>
      <th scope="col">Кол-во пройденных карточек</th>
      <th scope="col">Неправильных ответов</th>
      <th scope="col">Правильных ответов</th>
      <th scope="col">Самая длинная серия правильных ответов</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th class = "daily-learned-words"></th>
      <td class = "daily-cards"></td>
      <td class = "daily-wrong-words"></td>
      <td class = "daily-correct-words"></td>
      <td class = "daily-max-correct-words-way"></td>
    </tr>
  </tbody>
</table>`;

  const thirdTemplate = `<h2 class = "table-heading">Кол-во сыгранных раз в мини-игры</h2><table class="table statistic-table table-hover">
  <thead class = "thead-dark">
    <tr>
      <th scope="col">SpeakIt</th>
      <th scope="col">Savanna</th>
      <th scope="col">AudioCall</th>
      <th scope="col">Sprint</th>
      <th scope="col">New Game</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th class = "game-speakit"></th>
      <td class = "game-savanna"></td>
      <td class = "game-audiocall"></td>
      <td class = "game-sprint"></td>
      <td class = "game-new-game"></td>
    </tr>
  </tbody>
</table>`;

  const startScreen = document.createElement('div');
  startScreen.setAttribute('id', 'statistic-screen');
  startScreen.innerHTML = firstTemplate + secondTemplate + thirdTemplate;
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

  const percentLearnedWords = statistic.length * 100 / 3600;
  learnedWordsPercent.innerHTML = isNaN(percentLearnedWords) ? '0%' : `${percentLearnedWords.toFixed(2)}%`;

  complexWords.innerHTML = `${statistic.filter((el) => el.difficulty === 'true').length}`;

  const percentComplexWords = statistic.filter((el) => el.difficulty === 'true').length * 100 / statistic.length;
  complexWordsPercent.innerHTML = isNaN(percentComplexWords) ? '0%' : `${percentComplexWords.toFixed(2)}%`;

  lungsWords.innerHTML = `${statistic.filter((el) => el.difficulty === 'false').length}`;

  const percentLungsWords = statistic.filter((el) => el.difficulty === 'false').length * 100 / statistic.length;
  lungsWordsPercent.innerHTML = isNaN(percentLungsWords) ? '0%' : `${percentLungsWords.toFixed(2)}%`;

  const dailyLearnedWords = document.querySelector('.daily-learned-words');
  const dailyCards = document.querySelector('.daily-cards');
  const dailyWrongWords = document.querySelector('.daily-wrong-words');
  const dailyCorrectWords = document.querySelector('.daily-correct-words');
  const dailyMaxCorrectWordsWay = document.querySelector('.daily-max-correct-words-way');

  const dailyStatistic = JSON.parse(localStorage.getItem('mainDailyStatistic')) || {
    learnedWords: 0, learnedCards: 0, wrongWords: 0, currentGuessedRow: 0, guessedWords: 0, maxGuessedRow: 0,
  };

  dailyLearnedWords.innerHTML = dailyStatistic.learnedWords === undefined ? 0 : dailyStatistic.learnedWords;
  dailyCards.innerHTML = dailyStatistic.learnedCards === undefined ? 0 : dailyStatistic.learnedCards;
  dailyWrongWords.innerHTML = dailyStatistic.wrongWords === undefined ? 0 : dailyStatistic.wrongWords;
  dailyCorrectWords.innerHTML = dailyStatistic.guessedWords === undefined ? 0 : dailyStatistic.guessedWords;
  dailyMaxCorrectWordsWay.innerHTML = dailyStatistic.maxGuessedRow === undefined ? 0 : dailyStatistic.maxGuessedRow;

  const speakit = document.querySelector('.game-speakit');
  const savanna = document.querySelector('.game-savanna');
  const audiocall = document.querySelector('.game-audiocall');
  const sprint = document.querySelector('.game-sprint');
  const newGame = document.querySelector('.game-new-game');

  newGame.innerHTML = localStorage.getItem('OurGame') === null ? 0 : localStorage.getItem('OurGame');
  audiocall.innerHTML = localStorage.getItem('AudioCall') === null ? 0 : localStorage.getItem('AudioCall');
  sprint.innerHTML = JSON.parse(localStorage.getItem('statistics')) === null ? 0 : JSON.parse(localStorage.getItem('statistics')).length;
  speakit.innerHTML = JSON.parse(localStorage.getItem('result')) === null ? 0 : JSON.parse(localStorage.getItem('result')).length;
  savanna.innerHTML = '0';
}

export default statisticComponent;
