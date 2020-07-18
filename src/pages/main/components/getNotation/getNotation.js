import { getDOMElement } from '../../common/main.helper';
import notationActionHandler from './notationHandler';

const getNotation = () => {
  const mainDailyStatistic = JSON.parse(localStorage.getItem('mainDailyStatistic')) || {};
  const {
    learnedWords = 0, guessedWords = 0, maxGuessedRow = 0, wrongWords = 0,
  } = mainDailyStatistic;

  const overlay = getDOMElement('div', 'main-screen-overlay');
  overlay.setAttribute('id', 'notation-overlay');
  const notationRow = getDOMElement('div', 'notation-row justify-content-center');
  notationRow.setAttribute('id', 'notation-body');
  const notationCol = getDOMElement('div', 'main-screen-popup col-11 col-sm-10 col-md-8 col-lg-7 col-xl-6');
  const notationHeader = getDOMElement('div', 'notation-header');

  const notationHeaderLogo = getDOMElement('div', 'notation-header_logo col-md-3 col-sm-4 col-2');
  const headerLogo = getDOMElement('img', '');
  headerLogo.src = './assets/img/logo_light.png';
  headerLogo.setAttribute('width', '30');
  headerLogo.setAttribute('height', '30');
  headerLogo.setAttribute('alt', 'logo');
  headerLogo.setAttribute('loading', 'lazy');
  const logoText = getDOMElement('div', 'notation-logo-text brand-text d-inline-block');
  const logoContent = '<span>RS</span><span class="colored">Lang</span>';
  logoText.innerHTML = logoContent;

  const notationHeaderH4 = getDOMElement('h4', 'notation-header-h4 col-md-8 col-sm-6 col-10');
  notationHeaderH4.textContent = 'Поздравляем!';

  notationHeaderLogo.append(headerLogo, logoText);
  notationHeader.append(notationHeaderLogo, notationHeaderH4);

  const cardBody = getDOMElement('div', 'notation-body');

  const statisticText = getDOMElement('div', 'statistic-text col-11 justify-content-center');

  const wordCount = getDOMElement('div', 'statistic-card-count');
  const wordCountDesc = getDOMElement('div', 'statistic-count-text col-7');
  wordCountDesc.textContent = 'Слов изучено:';
  const wordCountCount = getDOMElement('div', 'statistic-word-count');
  wordCountCount.textContent = learnedWords;
  wordCount.append(wordCountDesc, wordCountCount);

  const guessedCount = getDOMElement('div', 'statistic-card-count');
  const guessedCountDesc = getDOMElement('div', 'statistic-count-text col-7');
  guessedCountDesc.textContent = 'Слов верно отгадано:';
  const guessedCountCount = getDOMElement('div', 'statistic-guessed-count');
  guessedCountCount.textContent = guessedWords;
  guessedCount.append(guessedCountDesc, guessedCountCount);

  const guessedCountPercent = getDOMElement('div', 'statistic-card-count');
  const guessedCountDescPercent = getDOMElement('div', 'statistic-count-text col-7');
  guessedCountDescPercent.textContent = 'Слов верно отгадано, %:';
  const guessedCountPercentCount = getDOMElement('div', 'statistic-guessed-percent');
  const guessedPercent = Math.floor((guessedWords / learnedWords) * 100) || 0;
  guessedCountPercentCount.textContent = `${guessedPercent}%`;
  guessedCountPercent.append(guessedCountDescPercent, guessedCountPercentCount);

  const wrongCount = getDOMElement('div', 'statistic-card-count');
  const wrongCountDesc = getDOMElement('div', 'statistic-count-text col-7');
  wrongCountDesc.textContent = 'Слов не верно отгадано:';
  const wrongCountCount = getDOMElement('div', 'statistic-wrong-count');
  wrongCountCount.textContent = wrongWords;
  wrongCount.append(wrongCountDesc, wrongCountCount);

  const longGuessedRow = getDOMElement('div', 'statistic-card-count');
  const maxGuessedRowDesc = getDOMElement('div', 'statistic-count-text col-7');
  maxGuessedRowDesc.textContent = 'Самая длинная серия ответов:';
  const maxGuessedRowCount = getDOMElement('div', 'statistic-word-count');
  maxGuessedRowCount.textContent = maxGuessedRow;
  longGuessedRow.append(maxGuessedRowDesc, maxGuessedRowCount);

  statisticText.append(wordCount, guessedCount, guessedCountPercent, wrongCount, longGuessedRow);

  const notationText = getDOMElement('div', 'notation-text');
  notationText.textContent = `Вы выполнили свою дневную норму по количеству карточек!
  Вы можете увеличить количество карточек в настройках, либо можете продолжить обучение.`;

  const notationFooter = getDOMElement('div', 'notation-footer');

  const notationBTNSettings = getDOMElement('button', 'btn btn-outline-primary');
  notationBTNSettings.setAttribute('type', 'button');
  notationBTNSettings.setAttribute('id', 'notation-settings');

  const settingsBTNIcon = document.createElement('i');
  settingsBTNIcon.className = 'fas fa-user-cog';
  settingsBTNIcon.textContent = ' настройки';

  notationBTNSettings.append(settingsBTNIcon);

  const notationBTNSelect = getDOMElement('button', 'btn btn-outline-primary');
  notationBTNSelect.setAttribute('type', 'button');
  notationBTNSelect.setAttribute('id', 'notation-select');

  const selectBTNIcon = document.createElement('i');
  selectBTNIcon.className = 'fas fa-sync-alt';
  selectBTNIcon.textContent = ' выбор задачи';

  notationBTNSelect.append(selectBTNIcon);

  const notationBTNContinue = getDOMElement('button', 'btn btn-outline-primary');
  notationBTNContinue.setAttribute('type', 'button');
  notationBTNContinue.setAttribute('id', 'notation-continue');

  const continueBTNIcon = document.createElement('i');
  continueBTNIcon.className = 'fas fa-graduation-cap';
  continueBTNIcon.textContent = ' учить ещё';

  notationBTNContinue.append(continueBTNIcon);

  cardBody.append(statisticText, notationText);
  notationFooter.append(notationBTNSettings, notationBTNSelect, notationBTNContinue);
  notationCol.append(notationHeader, cardBody, notationFooter);

  notationRow.append(notationCol);
  const root = document.querySelector('.header');
  root.append(overlay, notationRow);

  notationActionHandler();
};

export default getNotation;
