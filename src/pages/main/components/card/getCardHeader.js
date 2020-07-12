import { getDOMElement } from '../../common/main.helper';
import { baseUrl } from '../../common/main.constants';

const getCardHeader = (iterator, typeOfWord, currentWordImage) => {
  const cardHeader = getDOMElement('div', 'main-screen-card card-header');
  const cardHeaderArea = getDOMElement('div', 'main-screen-card card-header-area');
  const cardHeaderText = getDOMElement('small', 'main-screen-card text-primary');
  cardHeaderText.setAttribute('id', 'main-cardheader-text');

  let cardInfo;

  // ======= исправить тосле того, как Женя начнет передават объект typeOfWord ==/

  const typeOfWordTest = {
    newWord: 'true',
    difficultyWord: 'true',
  };
  const newWord = typeOfWordTest.newWord === 'true';
  const difficultyWord = typeOfWordTest.difficultyWord === 'true';

  if (difficultyWord) { cardInfo = 'сложное слово'; }
  if (newWord) {
    cardInfo = 'новое слово';
  } else if (!newWord && !difficultyWord) {
    cardInfo = 'изученное слово';
  }
  // ===============

  cardHeaderText.textContent = cardInfo;

  const cardHeaderControls = getDOMElement('div', 'd-flex card-header-controls');

  const controlDiffIcon = getDOMElement('i', 'main-i far fa-life-ring main-difficult-icon');
  controlDiffIcon.setAttribute('id', `main-difficult-${iterator}`);

  const controlDiffIconText = getDOMElement('span', 'main-difficult-text');
  controlDiffIconText.textContent = 'добавить в сложные слова';
  controlDiffIcon.append(controlDiffIconText);

  const controlDelIcon = getDOMElement('i', 'main-i far fa-trash-alt main-delete-icon');
  controlDelIcon.setAttribute('id', iterator);

  const controlDelIconText = getDOMElement('span', 'main-delete-text');
  controlDelIconText.textContent = 'добавить в удаленные слова';
  controlDelIcon.append(controlDelIconText);

  if (localStorage.getItem('userAddDifficult') === 'true') { cardHeaderControls.append(controlDiffIcon); }
  if (localStorage.getItem('userAddDeleted') === 'true') { cardHeaderControls.append(controlDelIcon); }

  const cardHeaderImage = getDOMElement('img', 'main-screen-image');
  cardHeaderImage.src = `${baseUrl}${currentWordImage}`;

  cardHeaderArea.append(cardHeaderText, cardHeaderControls);

  cardHeader.append(cardHeaderArea, cardHeaderImage);

  return cardHeader;
};
export default getCardHeader;
