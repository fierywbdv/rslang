import { getDOMElement } from '../../common/main.helper';

const getCardFooter = (currentWord, iterator) => {
  const {
    audio, transcription, wordTranslate,
  } = currentWord;

  const cardFooter = getDOMElement('div', 'main-screen-card card-footer text-muted');
  const cardDiv = getDOMElement('div', 'main-screen-card card-footer-area');
  const cardFooterTranslate = getDOMElement('span', 'main-screen-card card-footer-translate');
  cardFooterTranslate.setAttribute('id', `footer-translate-${iterator}`);

  const userSetTranslate = localStorage.getItem('userSetTranslate') === 'true';
  const userSetTranscription = localStorage.getItem('userSetTranscription') === 'true';
  const setExplanation = localStorage.getItem('userSetExplanation') === 'true';
  const setExample = localStorage.getItem('userSetExample') === 'true';

  if (!userSetTranslate && !userSetTranscription) {
    cardFooterTranslate.textContent = '';
  } else if (userSetTranslate && !userSetTranscription) {
    cardFooterTranslate.textContent = `${wordTranslate}`;
  } else if (!userSetTranslate && userSetTranscription) {
    cardFooterTranslate.textContent = `${transcription}`;
  } else {
    cardFooterTranslate.textContent = `${wordTranslate}  |  ${transcription}`;
  }

  if (userSetTranslate && !setExplanation && !setExample) {
    cardFooterTranslate.classList.add('show');
  }
  const cardFooterIconArea = getDOMElement('div', 'main-icon-area');

  const cardFooterSpeakerIcon = getDOMElement('i', 'main-speaker main-i fas fa-volume-up');
  cardFooterSpeakerIcon.setAttribute('id', `main-speaker-${iterator}`);

  const speakerIconText = getDOMElement('span', 'main-speaker-text');
  speakerIconText.textContent = 'вкл/выкл звук';
  cardFooterSpeakerIcon.append(speakerIconText);

  const cardFooterEyeIcon = getDOMElement('i', 'main-eye main-i fas fa-eye');
  cardFooterEyeIcon.setAttribute('data_id', iterator);
  cardFooterEyeIcon.setAttribute('id', `main-eye-${iterator}`);
  cardFooterEyeIcon.setAttribute('data-audio', audio);

  const eyeIconText = getDOMElement('span', 'main-answer-text');
  eyeIconText.textContent = 'показать ответ';
  cardFooterEyeIcon.append(eyeIconText);

  const cardFooterArrowIcon = getDOMElement('i', 'main-arrow main-i fas fa-arrow-circle-right');
  cardFooterArrowIcon.setAttribute('id', `main-arrow-${iterator}`);

  const arrowIconText = getDOMElement('span', 'main-arrow-text');
  arrowIconText.textContent = 'далее';
  cardFooterArrowIcon.append(arrowIconText);

  if (localStorage.getItem('userShowAnswer') === 'true') {
    cardFooterIconArea.append(cardFooterSpeakerIcon, cardFooterEyeIcon, cardFooterArrowIcon);
  } else {
    cardFooterIconArea.append(cardFooterSpeakerIcon, cardFooterArrowIcon);
  }

  cardDiv.append(cardFooterTranslate, cardFooterIconArea);
  cardFooter.append(cardDiv);

  return cardFooter;
};

export default getCardFooter;
