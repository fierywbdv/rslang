import { getDOMElement } from '../../common/main.helper';
import { getPhrase, getUserSettings } from '../../common/main.utils';

const getCard = (word = {}, iterator) => {
  const userSettings = getUserSettings();
  // console.log(word);

  const currentWordID = word.id;
  const currentWord = (word.word).toLowerCase();
  const currentWordLength = currentWord.length;
  const currentWordTranslate = word.wordTranslate;
  const currentWordExplanation = word.textExampleTranslate;
  const currentWordTranscription = word.transcription;
  const currentWordTextExample = word.textExample;
  const currentWordAudio = word.audio;
  const currentWordAudioExample = word.audioExample;

  const card = getDOMElement('div', 'main-screen-card card unselectable');
  card.setAttribute('id', `main-card-${iterator}`);
  card.setAttribute('guessed', 'false');

  const cardHeader = getDOMElement('div', 'main-screen-card card-header');
  const cardHeaderText = getDOMElement('small', 'main-screen-card text-primary');
  cardHeaderText.setAttribute('id', 'main-cardheader-text');
  cardHeaderText.textContent = 'служебная информация: новое слово, сложное слово, прочее';
  cardHeader.append(cardHeaderText);

  const cardBody = getDOMElement('div', 'main-screen-card card-body');
  const cardBodyPhrase = getDOMElement('div', 'main-screen-card phrase');
  cardBodyPhrase.setAttribute('id', `main-phrase-${iterator}`);
  cardBodyPhrase.innerHTML = getPhrase(iterator,
    currentWordLength,
    currentWord,
    currentWordID,
    currentWordTextExample,
    currentWordAudioExample);

  const spacer = getDOMElement('div', 'card-spacer');

  const cardTranslateExample = getDOMElement('div', 'main-screen-card translate-example');
  cardTranslateExample.textContent = currentWordExplanation;
  cardBody.append(cardBodyPhrase, spacer, cardTranslateExample);

  const cardFooter = getDOMElement('div', 'main-screen-card card-footer text-muted');
  const cardDiv = getDOMElement('div', 'main-screen-card card-footer-area');
  const cardFooterTranslate = getDOMElement('span', 'main-screen-card card-footer-translate');
  cardFooterTranslate.textContent = `${currentWordTranslate}  |  ${currentWordTranscription}`;
  const cardFooterSpeakerIcon = getDOMElement('i', 'main-speaker main-i fas fa-volume-up');
  cardFooterSpeakerIcon.setAttribute('id', iterator);
  cardFooterSpeakerIcon.setAttribute('data-audio', currentWordAudio);

  cardDiv.append(cardFooterTranslate, cardFooterSpeakerIcon);
  cardFooter.append(cardDiv);

  card.append(cardHeader, cardBody, cardFooter);
  return card;
};

export default getCard;
