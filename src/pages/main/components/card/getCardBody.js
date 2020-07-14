import { getDOMElement } from '../../common/main.helper';
import { getPhraseMeaning, getPhraseExample, getWordInput } from '../../common/main.utils';

const getCardBody = (currentWord, iterator) => {
  const {
    audio, audioExample, audioMeaning, id, textExample,
    textExampleTranslate, textMeaning, textMeaningTranslate, word,
  } = currentWord;

  word.toLowerCase();

  const cardBody = getDOMElement('div', 'main-screen-card card-body');

  const phraseMeaningDiv = getDOMElement('div', 'main-screen-card explanation-area');
  phraseMeaningDiv.setAttribute('id', `main-phrase-${iterator}`);
  const phraseExplanation = getDOMElement('div', 'card-body phrase-explanation');
  const explanationTranslate = getDOMElement('span', 'card-body explanation-translate');
  explanationTranslate.setAttribute('id', `explanation-translate-${iterator}`);

  const spacer = getDOMElement('div', 'card-spacer');

  const setExplanation = localStorage.getItem('userSetExplanation') === 'true';
  const setExplanationTranslate = localStorage.getItem('userSetExplanationTranslate') === 'true';

  if (setExplanation) {
    const wordObj = {
      iterator, word, id, textExample, audioExample, audio, textMeaning, audioMeaning,
    };
    phraseExplanation.innerHTML = getPhraseMeaning(wordObj);

    if (setExplanationTranslate) {
      explanationTranslate.textContent = textMeaningTranslate;
      phraseMeaningDiv.append(phraseExplanation, explanationTranslate);
    } else { phraseMeaningDiv.append(phraseExplanation); }
  }

  const phraseExampleDiv = getDOMElement('div', 'main-screen-card example-area');
  const phraseExample = getDOMElement('div', 'card-body phrase-example');
  const exampleTranslate = getDOMElement('span', 'card-body example-translate');
  exampleTranslate.setAttribute('id', `example-translate-${iterator}`);

  const setExample = localStorage.getItem('userSetExample') === 'true';
  const setExampleTranslate = localStorage.getItem('userSetExampleTranslate') === 'true';

  if (setExample) {
    const wordObj = {
      id, iterator, word, audioExample, textExample, audio,
    };
    if (localStorage.getItem('userSetExplanation') === 'false') {
      phraseExample.innerHTML = getPhraseExample(wordObj, 'true');
    } else {
      phraseExample.innerHTML = getPhraseExample(wordObj, 'false');
    }

    if (setExampleTranslate) {
      exampleTranslate.textContent = textExampleTranslate;
      phraseExampleDiv.append(phraseExample, exampleTranslate);
    } else { phraseExampleDiv.append(phraseExample); }
  }

  if (!setExample && !setExplanation) {
    const phraseWordInput = getDOMElement('div', 'card-body phrase-explanation');
    const wordObj = {
      iterator, word, id, textExample, audioExample, audio, textMeaning, audioMeaning,
    };
    phraseWordInput.innerHTML = getWordInput(wordObj);
    phraseMeaningDiv.append(phraseWordInput);
  }

  cardBody.append(phraseMeaningDiv, spacer, phraseExampleDiv);

  return cardBody;
};

export default getCardBody;
