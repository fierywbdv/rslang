import { getDOMElement } from '../../common/main.helper';
import { getPhrase, getUserSettings, getNewRandomWord } from '../../common/main.utils';

const baseUrl = 'https://raw.githubusercontent.com/irinainina/rslang-data/master/';

const getCard = (word = {}, iterator) => {
  const userSettings = getUserSettings();

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

  const cardHeader = getDOMElement('div', 'main-screen-card card-header');
  const cardHeaderText = getDOMElement('small', 'main-screen-card text-primary');
  cardHeaderText.setAttribute('id', 'main-cardheader-text');

  cardHeaderText.textContent = 'служебная информация: новое слово, сложное слово, прочее';

  const cardHeaderImage = getDOMElement('img', 'main-screen-image');
  cardHeaderImage.src = `${baseUrl}${currentWordImage}`;

  if (localStorage.getItem('userSetImage') === 'false') {
    document.querySelectorAll('.main-screen-image').forEach((el) => {
      el.style = 'display: none;';
    });
  }

  cardHeader.append(cardHeaderText, cardHeaderImage);

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

  if (localStorage.getItem('userSetExample') === 'false') {
    document.querySelectorAll('.phrase').forEach((el) => {
      const start = el.innerHTML.indexOf('<');
      const end = el.innerHTML.indexOf('>');
      const res = el.innerHTML.slice(start, end + 1);
      el.innerHTML = res;
    });
  }

  const cardTranslateExample = getDOMElement('div', 'main-screen-card translate-example');
  cardTranslateExample.textContent = currentWordExplanation;
  cardBody.append(cardBodyPhrase, spacer, cardTranslateExample);

  if (localStorage.getItem('userSetExplanation') === 'false') {
    document.querySelectorAll('.translate-example').forEach((el) => {
      el.style = 'visibility: hidden;';
    });
  }

  const cardFooter = getDOMElement('div', 'main-screen-card card-footer text-muted');
  const cardDiv = getDOMElement('div', 'main-screen-card card-footer-area');
  const cardFooterTranslate = getDOMElement('span', 'main-screen-card card-footer-translate');

  if (localStorage.getItem('userSetTranslate') === 'false' && localStorage.getItem('userSetTranscription') === 'false') {
    cardFooterTranslate.textContent = '';// `${currentWordTranslate}  |  ${currentWordTranscription}`;
  } else if (localStorage.getItem('userSetTranslate') === 'true' && localStorage.getItem('userSetTranscription') === 'false') {
    cardFooterTranslate.textContent = `${currentWordTranslate}`;// `${currentWordTranslate}  |  ${currentWordTranscription}`;
  } else if (localStorage.getItem('userSetTranslate') === 'false' && localStorage.getItem('userSetTranscription') === 'true') {
    cardFooterTranslate.textContent = `${currentWordTranscription}`;
  } else {
    cardFooterTranslate.textContent = `${currentWordTranslate}  |  ${currentWordTranscription}`;
  }

  const cardFooterSpeakerIcon = getDOMElement('i', 'main-speaker main-i fas fa-volume-up');
  cardFooterSpeakerIcon.setAttribute('id', iterator);
  cardFooterSpeakerIcon.setAttribute('data-audio', currentWordAudio);

  cardDiv.append(cardFooterTranslate, cardFooterSpeakerIcon);
  cardFooter.append(cardDiv);

  card.append(cardHeader, cardBody, cardFooter);

  return card;
};

export default getCard;
