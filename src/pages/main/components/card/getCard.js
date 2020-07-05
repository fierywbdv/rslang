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

  const card = getDOMElement('div', 'main-card card');
  card.setAttribute('id', `main-card-${iterator}`);

  const cardHeader = getDOMElement('div', 'main-card card-header');
  const cardHeaderText = getDOMElement('small', 'main-card text-primary');
  cardHeaderText.setAttribute('id', 'main-cardheader-text');
  cardHeaderText.textContent = 'новое слово';
  cardHeader.append(cardHeaderText);

  const cardBody = getDOMElement('div', 'main-card card-body');
  const cardBodyPhrase = getDOMElement('div', 'main-card phrase');
  cardBodyPhrase.setAttribute('id', `main-phrase-${iterator}`);
  cardBodyPhrase.innerHTML = getPhrase(currentWordLength);

  const hr = getDOMElement('hr', '');

  const cardTranslateExample = getDOMElement('div', 'main-card translate-example');
  cardTranslateExample.textContent = currentWordExplanation;
  cardBody.append(cardBodyPhrase, hr, cardTranslateExample);

  const cardFooter = getDOMElement('div', 'main-card card-footer text-muted');
  cardFooter.textContent = `${currentWordTranslate} | ${currentWordTranscription}`;

  card.append(cardHeader, cardBody, cardFooter);
  return card;
};

export default getCard;
