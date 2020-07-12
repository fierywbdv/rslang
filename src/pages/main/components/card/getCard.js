import { getDOMElement } from '../../common/main.helper';
import { getPhrase } from '../../common/main.utils';
import getCardHeader from './getCardHeader';

const getCard = (word = {}, iterator, typeOfWord = {}) => {
  const currentWordID = word.id;
  const currentWord = (word.word).toLowerCase();
  const currentWordLength = currentWord.length;
  const currentWordTranslate = word.wordTranslate;
  const currentWordExplanation = word.textExampleTranslate;
  const currentWordTranscription = word.transcription;
  const currentWordTextExample = word.textExample;
  const currentWordAudio = word.audio;
  const currentWordAudioExample = word.audioExample;
  const currentWordImage = word.image;
  const currentWordAudioExplanation = word.audioMeaning;

  const card = getDOMElement('div', 'main-screen-card card unselectable');
  card.setAttribute('id', `main-card-${iterator}`);
  card.setAttribute('guessed', 'false');
  card.setAttribute('data-img', currentWordImage);
  card.setAttribute('data-translate', currentWordTranslate);
  card.setAttribute('data-translate', currentWordTranslate);

  const cardHeader = getCardHeader(iterator, typeOfWord, currentWordImage);

  const cardBody = getDOMElement('div', 'main-screen-card card-body');
  const cardBodyPhrase = getDOMElement('div', 'main-screen-card phrase');
  cardBodyPhrase.setAttribute('id', `main-phrase-${iterator}`);
  cardBodyPhrase.innerHTML = getPhrase(iterator,
    currentWordLength,
    currentWord,
    currentWordID,
    currentWordTextExample,
    currentWordAudioExample,
    currentWordAudio,
    currentWordAudioExplanation);

  const spacer = getDOMElement('div', 'card-spacer');

  const cardTranslateExample = getDOMElement('div', 'main-screen-card translate-example');
  cardTranslateExample.textContent = currentWordExplanation;
  cardBody.append(cardBodyPhrase, spacer, cardTranslateExample);

  const cardFooter = getDOMElement('div', 'main-screen-card card-footer text-muted');
  const cardDiv = getDOMElement('div', 'main-screen-card card-footer-area');
  const cardFooterTranslate = getDOMElement('span', 'main-screen-card card-footer-translate');

  if (localStorage.getItem('userSetTranslate') === 'false' && localStorage.getItem('userSetTranscription') === 'false') {
    cardFooterTranslate.textContent = '';
  } else if (localStorage.getItem('userSetTranslate') === 'true' && localStorage.getItem('userSetTranscription') === 'false') {
    cardFooterTranslate.textContent = `${currentWordTranslate}`;
  } else if (localStorage.getItem('userSetTranslate') === 'false' && localStorage.getItem('userSetTranscription') === 'true') {
    cardFooterTranslate.textContent = `${currentWordTranscription}`;
  } else {
    cardFooterTranslate.textContent = `${currentWordTranslate}  |  ${currentWordTranscription}`;
  }

  const cardFooterIconArea = getDOMElement('div', 'main-icon-area');

  const cardFooterSpeakerIcon = getDOMElement('i', 'main-speaker main-i fas fa-volume-up');
  cardFooterSpeakerIcon.setAttribute('id', `main-speaker-${iterator}`);

  const cardFooterEyeIcon = getDOMElement('i', 'main-eye main-i fas fa-eye');
  cardFooterEyeIcon.setAttribute('id', iterator);
  cardFooterEyeIcon.setAttribute('data-audio', currentWordAudio);

  const cardFooterArrowIcon = getDOMElement('i', 'main-arrow main-i fas fa-arrow-circle-right');
  cardFooterArrowIcon.setAttribute('id', `main-arrow-${iterator}`);

  cardFooterIconArea.append(cardFooterSpeakerIcon, cardFooterEyeIcon, cardFooterArrowIcon);

  cardDiv.append(cardFooterTranslate, cardFooterIconArea);
  cardFooter.append(cardDiv);

  card.append(cardHeader, cardBody, cardFooter);

  return card;
};

export default getCard;
