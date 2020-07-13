import { getDOMElement } from '../../common/main.helper';
import { getPhraseMeaning, getPhraseExample } from '../../common/main.utils';

const getCardBody = (currentWord, iterator) => {
  const {
    audio, audioExample, audioMeaning, id, textExample, textExampleTranslate, textMeaning, textMeaningTranslate, transcription, word, wordTranslate,
  } = currentWord;

  const cardBody = getDOMElement('div', 'main-screen-card card-body');

  const phraseMeaningDiv = getDOMElement('div', 'main-screen-card explanation-area');
  phraseMeaningDiv.setAttribute('id', `main-phrase-${iterator}`);
  const phraseExplanation = getDOMElement('div', 'card-body phrase-explanation');
  const explanationTranslate = getDOMElement('span', 'card-body explanation-translate');

  const spacer = getDOMElement('div', 'card-spacer');

  if (localStorage.getItem('userSetExplanation') === 'true') {
    const wordObj = {
      iterator, word, id, textExample, audioExample, audio, textMeaning, audioMeaning,
    };
    phraseExplanation.innerHTML = getPhraseMeaning(wordObj);
    explanationTranslate.textContent = textMeaningTranslate;
    phraseMeaningDiv.append(phraseExplanation, explanationTranslate);
  }

  const phraseExampleDiv = getDOMElement('div', 'main-screen-card example-area');
  const phraseExample = getDOMElement('div', 'card-body phrase-example');
  const exampleTranslate = getDOMElement('span', 'card-body example-translate');

  if (localStorage.getItem('userSetExample') === 'true') {
    const wordObj = {
      id, iterator, word, audioExample, textExample, audio,
    };
    if (localStorage.getItem('userSetExplanation') === 'false') {
      phraseExample.innerHTML = getPhraseExample(wordObj, 'true');
    } else {
      phraseExample.innerHTML = getPhraseExample(wordObj, 'false');
    }
    exampleTranslate.textContent = textExampleTranslate;
    phraseExampleDiv.append(phraseExample, exampleTranslate);
  }

  cardBody.append(phraseMeaningDiv, spacer, phraseExampleDiv);

  return cardBody;
};

export default getCardBody;
