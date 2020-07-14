import { getDOMElement } from '../../common/main.helper';
import getCardHeader from './getCardHeader';
import getCardBody from './getCardBody';
import getCardFooter from './getCardFooter';

const getCard = (currentWord = {}, iterator) => {
  const {
    audio, image, textMeaning, transcription, wordTranslate,
  } = currentWord;
  const card = getDOMElement('div', 'main-screen-card card unselectable');
  card.setAttribute('id', `main-card-${iterator}`);
  card.setAttribute('guessed', 'false');
  card.setAttribute('data-img', image);
  card.setAttribute('data-translate', wordTranslate);

  const cardHeader = getCardHeader(iterator, image);
  const cardBody = getCardBody(currentWord, iterator);
  const cardFooter = getCardFooter(currentWord, iterator);

  // const cardFooter = getDOMElement('div', 'main-screen-card card-footer text-muted');
  // const cardDiv = getDOMElement('div', 'main-screen-card card-footer-area');
  // const cardFooterTranslate = getDOMElement('span', 'main-screen-card card-footer-translate');

  // if (localStorage.getItem('userSetTranslate') === 'false' && localStorage.getItem('userSetTranscription') === 'false') {
  //   cardFooterTranslate.textContent = '';
  // } else if (localStorage.getItem('userSetTranslate') === 'true' && localStorage.getItem('userSetTranscription') === 'false') {
  //   cardFooterTranslate.textContent = `${wordTranslate}`;
  // } else if (localStorage.getItem('userSetTranslate') === 'false' && localStorage.getItem('userSetTranscription') === 'true') {
  //   cardFooterTranslate.textContent = `${transcription}`;
  // } else {
  //   cardFooterTranslate.textContent = `${wordTranslate}  |  ${transcription}`;
  // }

  // const cardFooterIconArea = getDOMElement('div', 'main-icon-area');

  // const cardFooterSpeakerIcon = getDOMElement('i', 'main-speaker main-i fas fa-volume-up');
  // cardFooterSpeakerIcon.setAttribute('id', `main-speaker-${iterator}`);

  // const cardFooterEyeIcon = getDOMElement('i', 'main-eye main-i fas fa-eye');
  // cardFooterEyeIcon.setAttribute('id', iterator);
  // cardFooterEyeIcon.setAttribute('data-audio', audio);

  // const cardFooterArrowIcon = getDOMElement('i', 'main-arrow main-i fas fa-arrow-circle-right');
  // cardFooterArrowIcon.setAttribute('id', `main-arrow-${iterator}`);

  // cardFooterIconArea.append(cardFooterSpeakerIcon, cardFooterEyeIcon, cardFooterArrowIcon);

  // cardDiv.append(cardFooterTranslate, cardFooterIconArea);
  // cardFooter.append(cardDiv);

  card.append(cardHeader, cardBody, cardFooter);

  return card;
};

export default getCard;
