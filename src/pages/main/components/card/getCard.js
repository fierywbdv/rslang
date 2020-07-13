import { getDOMElement } from '../../common/main.helper';
import getCardHeader from './getCardHeader';
import getCardBody from './getCardBody';

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

  // const cardBody = getDOMElement('div', 'main-screen-card card-body');

  // const phraseMeaningDiv = getDOMElement('div', 'main-screen-card explanation-area');
  // phraseMeaningDiv.setAttribute('id', `main-phrase-${iterator}`);

  // const phraseMeaning = getDOMElement('div', 'card-body phrase-explanation');
  // const meaningTranslate = getDOMElement('span', 'card-body explanation-translate');

  // if (localStorage.getItem('userSetExplanation') === 'true') {
  //   const wordObj = {
  //     iterator,
  //     word,
  //     id,
  //     textExample,
  //     audioExample,
  //     audio,
  //     textMeaning,
  //     audioMeaning,
  //   };
  //   phraseMeaning.innerHTML = getPhraseMeaning(wordObj);
  //   meaningTranslate.textContent = textMeaningTranslate;
  //   phraseMeaningDiv.append(phraseMeaning, meaningTranslate);
  // }

  // const phraseExampleDiv = getDOMElement('div', 'main-screen-card example-area');
  // const phraseExample = getDOMElement('div', 'card-body phrase-example');
  // const exampleTranslate = getDOMElement('span', 'card-body example-translate');

  // if (localStorage.getItem('userSetExample') === 'true') {
  //   const wordObj = {
  //     iterator,
  //     word,
  //     audioMeaning,
  //     textMeaning,
  //   };

  //   phraseExample.innerHTML = getPhraseExample(wordObj);
  //   phraseMeaning.innerHTML = getPhraseMeaning(wordObj);
  //   meaningTranslate.textContent = textExampleTranslate;
  //   phraseExampleDiv.append(phraseMeaning, exampleTranslate);
  // }

  // const spacer = getDOMElement('div', 'card-spacer');

  // const cardTranslateExample = getDOMElement('div', 'main-screen-card translate-example');
  // cardTranslateExample.textContent = textMeaning;

  // cardBody.append(phraseMeaningDiv, spacer, cardTranslateExample);

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

  const cardFooterEyeIcon = getDOMElement('i', 'main-eye main-i fas fa-eye');
  cardFooterEyeIcon.setAttribute('id', iterator);
  cardFooterEyeIcon.setAttribute('data-audio', audio);

  const cardFooterArrowIcon = getDOMElement('i', 'main-arrow main-i fas fa-arrow-circle-right');
  cardFooterArrowIcon.setAttribute('id', `main-arrow-${iterator}`);

  cardFooterIconArea.append(cardFooterSpeakerIcon, cardFooterEyeIcon, cardFooterArrowIcon);

  cardDiv.append(cardFooterTranslate, cardFooterIconArea);
  cardFooter.append(cardDiv);

  card.append(cardHeader, cardBody, cardFooter);

  return card;
};

export default getCard;
