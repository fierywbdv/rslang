import { getDOMElement, getButton } from '../../common/main.helper';

import './_selectScreenCard.scss';

const getSelectCard = () => {
  const userName = localStorage.getItem('userName');
  const container = getDOMElement('div', 'select-screen-card container');
  const row = getDOMElement('div', 'select-screen-card row justify-content-center');
  const col = getDOMElement('div', 'col-12');
  const card = getDOMElement('div', 'select-screen-card card');
  const cardHeader = getDOMElement('div', 'select-screen-card card-header d-flex');
  const cardBody = getDOMElement('div', 'select-screen-card card-body');

  const phraseNew = 'Вам будут предложены к изучению новые слова, количество которых вы указали в настройках';
  const phraseRepeat = `Вам будут предложены
  к повторению ранее изученные слова, количество которых вы указали в настройках`;
  const phraseMix = `Вам будут предложены карточки с новыми и изученными словами,
  количество которых вы указали в настройках`;

  const selectHeaderLogo = getDOMElement('div', 'select-header_logo col-md-3 col-sm-4 col-5');
  const headerLogo = getDOMElement('img', '');
  headerLogo.src = './assets/img/logo_light.png';
  headerLogo.setAttribute('width', '30');
  headerLogo.setAttribute('height', '30');
  headerLogo.setAttribute('alt', 'logo');
  headerLogo.setAttribute('loading', 'lazy');
  const logoText = getDOMElement('div', 'select-logo-text brand-text d-inline-block');
  const logoContent = '<span>RS</span><span class="colored">Lang</span>';
  logoText.innerHTML = logoContent;

  selectHeaderLogo.append(headerLogo, logoText);

  const headerText = getDOMElement('h4', 'select-header-h4');
  headerText.innerText = `${userName}, выберите упражнение:`;
  cardHeader.append(selectHeaderLogo, headerText);

  const bodyRow = getDOMElement('div', 'select-screen-body row justify-content-center');

  const bodyColOne = getDOMElement('div', 'select-screen-body col col-4');
  const bodyTextOne = getDOMElement('p', 'select-screen-body text');
  bodyTextOne.innerText = phraseNew;
  const bodyColOneButton = getButton('new');
  bodyColOneButton.innerText = 'новые слова';
  bodyColOne.append(bodyColOneButton, bodyTextOne);

  const bodyColTwo = getDOMElement('div', 'select-screen-body col col-4');
  const bodyTextTwo = getDOMElement('p', 'select-screen-body text');
  bodyTextTwo.innerText = phraseRepeat;
  const bodyColTwoButton = getButton('repeat');
  bodyColTwoButton.innerText = 'изученные слова';
  bodyColTwo.append(bodyColTwoButton, bodyTextTwo);

  const bodyColThree = getDOMElement('div', 'select-screen-body col col-4');
  const bodyTextThree = getDOMElement('p', 'select-screen-body text');
  bodyTextThree.innerText = phraseMix;
  const bodyColThreeButton = getButton('mix');
  bodyColThreeButton.innerText = 'новые и изученные';
  bodyColThree.append(bodyColThreeButton, bodyTextThree);

  bodyRow.append(bodyColOne, bodyColTwo, bodyColThree);
  cardBody.append(bodyRow);

  card.append(cardHeader, cardBody);
  col.append(card);
  row.append(col);
  container.append(row);

  return container;
};
export default getSelectCard;
