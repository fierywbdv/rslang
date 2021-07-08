import { CLASS_NAMES, MAX_WORDS_COUNT } from '../game-line/helper';
import { shuffleArray } from '../game-line/utils';

export default class Model {
  constructor() {
    this.cardsData = null;
    this.controller = null;
    this.pageData = null;
    this.translationsMap = null;
    this.isWordGuessed = this.isWordGuessed.bind(this);
  }

  loadPage(response) {
    this.translationsMap = new Map();
    const shuffledResponse = shuffleArray(response).slice(0, MAX_WORDS_COUNT).map((wordData) => {
      const {
        word,
        transcription,
        audio,
        image,
      } = wordData;
      return {
        word: word.toLowerCase(),
        transcription,
        audio,
        image,
      };
    });
    this.pageData = shuffledResponse;

    shuffledResponse.forEach(async (cardData) => {
      const res = await fetch(
        `https://translated-mymemory---translation-memory.p.rapidapi.com/api/get?q=${cardData.word}&langpair=en|ru`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '8c7a62bd09msha0fcd2de5032f4ap1e9fbdjsncf7dd3c862f8',
            'x-rapidapi-host':
              'translated-mymemory---translation-memory.p.rapidapi.com',
          },
        },
      );
      const data = await res.json();
      this.translationsMap.set(cardData.word, data.responseData.translatedText);
    });
  }

  isWordGuessed(word) {
    return (this.pageData.find((wordData) => wordData.word === word));
  }

  loadResults() {
    this.results = JSON.parse(localStorage.getItem(CLASS_NAMES.RESULT.PAGE)) || [];
  }

  saveResults(guessedList) {
    const currentResult = {
      pageData: this.pageData,
      translations: Array.from(this.translationsMap),
      guessedList,
      time: new Date().toLocaleString(),
    };

    this.results.push(currentResult);
    localStorage.setItem(CLASS_NAMES.RESULT.PAGE, JSON.stringify(this.results));
  }

  init(controller) {
    this.controller = controller;
    this.loadResults();
  }
}
