import { getDOMElement } from '../../common/main.helper';

const getCardFooter = (currentWord, iterator) => {
  const {
    audio, transcription, wordTranslate,
  } = currentWord;

  const cardFooter = getDOMElement('div', 'main-screen-card card-footer text-muted');
  const cardDiv = getDOMElement('div', 'main-screen-card card-footer-area');
  const cardFooterTranslate = getDOMElement('span', 'main-screen-card card-footer-translate');

  if (localStorage.getItem('userSetTranslate') === 'false' && localStorage.getItem('userSetTranscription') === 'false') {
    cardFooterTranslate.textContent = '';
  } else if (localStorage.getItem('userSetTranslate') === 'true' && localStorage.getItem('userSetTranscription') === 'false') {
    cardFooterTranslate.textContent = `${wordTranslate}`;
  } else if (localStorage.getItem('userSetTranslate') === 'false' && localStorage.getItem('userSetTranscription') === 'true') {
    cardFooterTranslate.textContent = `${transcription}`;
  } else {
    cardFooterTranslate.textContent = `${wordTranslate}  |  ${transcription}`;
  }

  const cardFooterIconArea = getDOMElement('div', 'main-icon-area');

  const cardFooterSpeakerIcon = getDOMElement('i', 'main-speaker main-i fas fa-volume-up');
  cardFooterSpeakerIcon.setAttribute('id', `main-speaker-${iterator}`);

  const speakerIconText = getDOMElement('span', 'main-speaker-text');
  speakerIconText.textContent = 'вкл/выкл звук';
  cardFooterSpeakerIcon.append(speakerIconText);

  const cardFooterEyeIcon = getDOMElement('i', 'main-eye main-i fas fa-eye');
  cardFooterEyeIcon.setAttribute('id', iterator);
  cardFooterEyeIcon.setAttribute('data-audio', audio);

  const eyeIconText = getDOMElement('span', 'main-answer-text');
  eyeIconText.textContent = 'показать ответ';
  cardFooterEyeIcon.append(eyeIconText);

  const cardFooterArrowIcon = getDOMElement('i', 'main-arrow main-i fas fa-arrow-circle-right');
  cardFooterArrowIcon.setAttribute('id', `main-arrow-${iterator}`);

  const arrowIconText = getDOMElement('span', 'main-arrow-text');
  arrowIconText.textContent = 'далее';
  cardFooterArrowIcon.append(arrowIconText);

  cardFooterIconArea.append(cardFooterSpeakerIcon, cardFooterEyeIcon, cardFooterArrowIcon);

  cardDiv.append(cardFooterTranslate, cardFooterIconArea);
  cardFooter.append(cardDiv);

  return cardFooter;
};

export default getCardFooter;
