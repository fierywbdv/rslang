import { getDOMElement } from '../../common/main.helper';
import { getPhrase, getUserSettings } from '../../common/main.utils';

const getCard = (obj = {}, iterator) => {
  const userSettings = getUserSettings();

  // userSetTranslate: true,
  // userSetExplanation: true, объяснение
  // userSetExample: true,
  // userSetTranscription: true,
  // userSetImage: true,

  const currentWord = 'rest';
  const currentWordTranslate = 'отдых, покой';
  const currentWordExplanation = 'Не забудьте немного отдохнуть после долгого путешествия!';
  const currentWordLength = currentWord.length - 1;
  const currentWordTranscription = '[rɛst]';

  const card = getDOMElement('div', 'main-screen-card card unselectable');
  card.setAttribute('id', `main-card-${iterator}`);

  const cardHeader = getDOMElement('div', 'main-screen-card card-header');
  const cardHeaderText = getDOMElement('small', 'main-screen-card text-primary');
  cardHeaderText.setAttribute('id', 'main-cardheader-text');
  cardHeaderText.textContent = 'служебная информация: новое слово, сложное слово, прочее';
  cardHeader.append(cardHeaderText);

  const cardBody = getDOMElement('div', 'main-screen-card card-body');
  const cardBodyPhrase = getDOMElement('div', 'main-screen-card phrase');
  cardBodyPhrase.setAttribute('id', `main-phrase-${iterator}`);
  cardBodyPhrase.innerHTML = getPhrase(iterator, currentWordLength, currentWord);

  const hr = getDOMElement('hr', '');

  const cardTranslateExample = getDOMElement('div', 'main-screen-card translate-example');
  cardTranslateExample.textContent = currentWordExplanation;
  cardBody.append(cardBodyPhrase, hr, cardTranslateExample);

  const cardFooter = getDOMElement('div', 'main-screen-card card-footer text-muted');
  const cardDiv = getDOMElement('div', 'main-screen-card card-footer-area');
  const cardFooterTranslate = getDOMElement('span', 'main-screen-card card-footer-translate');
  cardFooterTranslate.textContent = `${currentWordTranslate}  |  ${currentWordTranscription}`;
  const cardFooterSpeakerIcon = getDOMElement('i', 'main-speaker main-i fas fa-volume-up');
  cardFooterSpeakerIcon.setAttribute('id', `main-speaker-${iterator}`);

  cardDiv.append(cardFooterTranslate, cardFooterSpeakerIcon);
  cardFooter.append(cardDiv);

  card.append(cardHeader, cardBody, cardFooter);
  return card;
};

export default getCard;
