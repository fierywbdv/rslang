import { store } from '../../redux/store';
import './scss/sprint.styles.scss';
import { showGameScreen } from './sprint-redux/sprint-actions';
import { startScreenComponent } from './components/start-screen-component';
import { gameScreenComponent } from './components/game-screen-component';
import { resultsScreenComponent } from './components/results-screen-component';
import { WordsAPIService } from '../../services/wordsAPIService';
import { shuffle, toggleCirclesNumber, cleanCircles } from './common/sprint.utils';
import {
  POINTS_PER_WORD,
  BACKGROUND_MAX_POINTS,
  BACKGROUND_MEDIUM_POINTS,
  BACKGROUND_MIN_POINTS,
  CORRECT_SOUND,
  ERROR_SOUND,
  SUCCESS_SOUND,
  TIMER_SOUND,
  LAST_LEVEL,
  LAST_ROUND,
} from './common/sprint.constants';

class Sprint {
  constructor() {
    this.level = 0;
    this.round = 0;
    this.secondsRemaining = 60;
    this.wordsList = [];
    this.words = [];
    this.translations = [];
    this.shuffledWords = [];
    this.shuffledTranslations = [];
    this.pairNumber = 0;
    this.pointsToAdd = 10;
    this.correctAnswersNumber = 0;
    this.audio = new Audio();
    this.correctAnswers = [];
    this.wrongAnswers = [];
  }

  async startGame() {
    this.level = document.getElementById('level').value - 1;
    this.round = document.getElementById('round').value - 1;
    document.querySelector('.current-state').classList.remove('hidden');
    document.querySelector('.card').classList.remove('hidden');
    document.querySelector('.arrows').classList.remove('hidden');

    this.wordsList = await WordsAPIService.getWords(this.round, this.level);
    this.createWordsArray(this.wordsList);
    this.createTranslationsArray(this.wordsList);
    this.shuffledWords = shuffle(this.words.slice());
    this.shuffledTranslations = shuffle(this.translations.slice());

    this.startCountdown();
    this.showPair();
  }

  startCountdown() {
    const timer = setInterval(() => {
      this.secondsRemaining = +document.querySelector('.percentage').innerHTML - 1;
      if (this.secondsRemaining === -1) {
        clearInterval(timer);
        this.audio.pause();
        const points = document.querySelector('.points').innerHTML;
        document.getElementById('root').innerHTML = resultsScreenComponent(this.wordsList, this.words, this.correctAnswers, this.wrongAnswers, points);
        this.playResultsAudio();
        this.trainAgain();
      } else {
        if (this.secondsRemaining === 5) {
          this.playAudio(TIMER_SOUND);
        }
        document.querySelector('.percentage').innerHTML = this.secondsRemaining;
        document.querySelector('.circle').setAttribute('stroke-dasharray', `${60 - this.secondsRemaining}, 60`);
      }
    }, 1000);
  }

  createWordsArray(wordsList) {
    this.words = wordsList.map((item) => item.word);
  }

  createTranslationsArray(wordsList) {
    this.translations = wordsList.map((item) => item.wordTranslate);
  }

  showPair() {
    document.querySelector('.card__word').innerHTML = this.shuffledWords[this.pairNumber];
    document.querySelector('.card__translation').innerHTML = this.shuffledTranslations[this.pairNumber];
  }

  async addWords() {
    if (this.round === LAST_ROUND) {
      if (this.level === LAST_LEVEL) {
        this.round = 0;
        this.level = 0;
      } else {
        this.round = 0;
        this.level++;
      }
    } else {
      this.round++;
    }

    const newWordsList = await WordsAPIService.getWords(this.round, this.level);
    this.wordsList.push(...newWordsList);
    const newWords = newWordsList.map((item) => item.word);
    this.words.push(...newWords);
    const newTranslations = newWordsList.map((item) => item.wordTranslate);
    this.translations.push(...newTranslations);
    this.shuffledWords.push(...shuffle(newWords.slice()));
    this.shuffledTranslations.push(...shuffle(newTranslations.slice()));
  }

  answerCorrectly() {
    if (this.checkAnswer()) {
      this.correctAnswers.push(this.shuffledWords[this.pairNumber]);
      this.correctAnswersNumber++;
      this.showCorrectAnswer();
      this.addPoints();
    } else {
      this.wrongAnswers.push(this.shuffledWords[this.pairNumber]);
      this.correctAnswersNumber = 0;
      this.showMistake();
      this.subtractPoints();
      cleanCircles();
    }
    this.pairNumber++;
    this.showPair();
    if (this.pairNumber * 2 === this.words.length) {
      this.addWords();
    }
  }

  answerWrong() {
    if (this.checkAnswer()) {
      this.wrongAnswers.push(this.shuffledWords[this.pairNumber]);
      this.correctAnswersNumber = 0;
      this.showMistake();
      this.subtractPoints();
      cleanCircles();
    } else {
      this.correctAnswers.push(this.shuffledWords[this.pairNumber]);
      this.correctAnswersNumber++;
      this.showCorrectAnswer();
      this.addPoints();
    }
    this.pairNumber++;
    this.showPair();
    if (this.pairNumber * 2 === this.words.length) {
      this.addWords();
    }
  }

  checkAnswer() {
    const wordIndex = this.words.indexOf(this.shuffledWords[this.pairNumber]);
    return this.translations[wordIndex] === this.shuffledTranslations[this.pairNumber];
  }

  showMistake() {
    this.playAudio(ERROR_SOUND);

    if (this.pointsToAdd === 80) {
      toggleCirclesNumber();
      cleanCircles();
    }

    document.querySelector('.card').classList.add('wrong');
    document.querySelector('.card__result').classList.add('wrong');
    document.querySelector('.card__result').innerHTML = '<i class="fas fa-times"></i>';
    setTimeout(() => {
      document.querySelector('.card').classList.remove('wrong');
      document.querySelector('.card__result').classList.remove('wrong');
      document.querySelector('.card__result').innerHTML = '';
    }, 300);
  }

  showCorrectAnswer() {
    this.playAudio(CORRECT_SOUND);

    document.querySelector('.card').classList.add('correct');
    document.querySelector('.card__result').classList.add('correct');
    document.querySelector('.card__result').innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
      document.querySelector('.card').classList.remove('correct');
      document.querySelector('.card__result').classList.remove('correct');
      document.querySelector('.card__result').innerHTML = '';
    }, 300);
    if (this.pointsToAdd !== 80) {
      if ((this.correctAnswersNumber - 1) % 4 === 0) {
        const circle = document.querySelector('.card__circles').firstElementChild;
        circle.classList.add('correct');
        circle.innerHTML = '<i class="fas fa-check"></i>';
      } else if ((this.correctAnswersNumber - 2) % 4 === 0) {
        const circle = document.querySelector('.card__circles').children[1];
        circle.classList.add('correct');
        circle.innerHTML = '<i class="fas fa-check"></i>';
      } else if ((this.correctAnswersNumber - 3) % 4 === 0) {
        const circle = document.querySelector('.card__circles').lastElementChild;
        circle.classList.add('correct');
        circle.innerHTML = '<i class="fas fa-check"></i>';
      }
    }
  }

  addPoints() {
    const points = document.querySelector('.points');
    const header = document.querySelector('.card__header');
    const message = document.querySelector('.points-increase');

    switch (this.correctAnswersNumber) {
      case 4:
        this.pointsToAdd = 20;
        this.playAudio(SUCCESS_SOUND);
        header.style.backgroundColor = BACKGROUND_MIN_POINTS;
        cleanCircles();
        break;
      case 8:
        this.pointsToAdd = 40;
        this.playAudio(SUCCESS_SOUND);
        header.style.backgroundColor = BACKGROUND_MEDIUM_POINTS;
        cleanCircles();
        break;
      case 12:
        this.pointsToAdd = 80;
        this.playAudio(SUCCESS_SOUND);
        header.style.backgroundColor = BACKGROUND_MAX_POINTS;
        toggleCirclesNumber();
        break;
      default:
        break;
    }

    points.innerHTML = +points.innerHTML + this.pointsToAdd;
    message.innerHTML = `+${this.pointsToAdd} ${POINTS_PER_WORD}`;
  }

  subtractPoints() {
    this.pointsToAdd = 10;
    this.correctAnswersNumber = 0;
    document.querySelector('.card__header').style.backgroundColor = '';
  }

  playAudio(path) {
    this.audio = new Audio(path);
    this.audio.play();
  }

  playResultsAudio() {
    document.querySelector('.results__list').addEventListener('click', (event) => {
      if (event.target.tagName === 'I') {
        const path = event.target.getAttribute('data-audio');
        this.playAudio(`https://raw.githubusercontent.com/missdasha/rslang-data/master/${path}`);
      }
    });
  }

  trainAgain() {
    document.querySelector('.train-again').addEventListener('click', () => {
      this.pairNumber = 0;
      this.pointsToAdd = 10;
      this.correctAnswersNumber = 0;
      this.secondsRemaining = 60;
      this.correctAnswers = [];
      this.wrongAnswers = [];
      document.getElementById('root').innerHTML = gameScreenComponent();
      this.renderButtonEvents();
    });
  }

  renderButtonEvents() {
    const start = document.querySelector('.start-game');
    start.addEventListener('click', () => {
      document.querySelector('.start-game').classList.add('hidden');
      this.startGame();

      document.querySelector('.btn-danger').addEventListener('click', () => {
        this.answerWrong();
      });

      document.querySelector('.btn-success').addEventListener('click', () => {
        this.answerCorrectly();
      });
    });
  }

  renderArrowsEvents() {
    document.addEventListener('keyup', (event) => {
      if (event.code === 'ArrowLeft') {
        this.answerWrong();
      }
      if (event.code === 'ArrowRight') {
        this.answerCorrectly();
      }
    });
  }

  init() {
    document.getElementById('root').classList.add('root');

    store.subscribe(() => {
      const newState = store.getState();
      if (newState.sprintReducer.screen === 'start-screen') {
        document.getElementById('root').innerHTML = startScreenComponent();

        const buttonStart = document.querySelector('.button-start');
        buttonStart.addEventListener('click', () => {
          store.dispatch(showGameScreen());
        });
      }

      if (newState.sprintReducer.screen === 'game-screen' && !document.querySelector('.game-screen')) {
        document.getElementById('root').innerHTML = gameScreenComponent();
        this.renderButtonEvents();
        this.renderArrowsEvents();
      }
    });

    store.dispatch({ type: 'INIT_SPRINT' });
  }
}

export default new Sprint();
