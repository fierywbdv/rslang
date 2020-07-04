import { store } from '../../redux/store';
import './scss/sprint.styles.scss';
import { showGameScreen } from './sprint-redux/sprint-actions';
import { startScreenComponent } from './components/start-screen-component';
import { gameScreenComponent } from './components/game-screen-component';
import { resultsScreenComponent } from './components/results-screen-component';
import { statisticsScreenComponent } from './components/statistics-screen-component';
import { WordsAPIService } from '../../services/wordsAPIService';
import {
  shuffle,
  toggleCirclesNumber,
  cleanCircles,
  renderBackground,
  playAudio,
  playResultsAudio,
  saveStatistics,
} from './common/sprint.utils';
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
    this.playPromise = null;
    this.correctAnswers = [];
    this.wrongAnswers = [];
  }

  async startGame() {
    this.level = document.getElementById('level').value - 1;
    this.round = document.getElementById('round').value - 1;

    document.querySelector('.current-state').classList.remove('hidden');
    document.querySelector('.card').classList.remove('hidden');
    document.querySelector('.arrows').classList.remove('hidden');

    this.startCountdown();
    this.showPair();
  }

  startCountdown() {
    const timer = setInterval(() => {
      this.secondsRemaining = +document.querySelector('.percentage').innerHTML - 1;
      if (this.secondsRemaining === 0) {
        clearInterval(timer);
        this.audio.pause();
        const points = document.querySelector('.points').innerHTML;
        saveStatistics(points);
        setTimeout(() => {
          document.querySelector('.sprint-wrapper').innerHTML = resultsScreenComponent(this.wordsList, this.words, this.correctAnswers, this.wrongAnswers, points);
          playResultsAudio();
          // document.querySelector('.train-again').addEventListener('click', this.trainAgain);
          this.trainAgain();
          this.showStatistics();
        }, 1000);
      } else {
        if (this.secondsRemaining === 5) {
          this.audio = new Audio(TIMER_SOUND);
          this.audio.play();
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

  async getWords() {
    this.wordsList = await WordsAPIService.getWords(this.round, this.level);
    this.createWordsArray(this.wordsList);
    this.createTranslationsArray(this.wordsList);
    this.shuffledWords = shuffle(this.words.slice());
    this.shuffledTranslations = shuffle(this.translations.slice());
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
    playAudio(ERROR_SOUND);

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
    playAudio(CORRECT_SOUND);

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
        playAudio(SUCCESS_SOUND);
        header.style.backgroundColor = BACKGROUND_MIN_POINTS;
        cleanCircles();
        break;
      case 8:
        this.pointsToAdd = 40;
        playAudio(SUCCESS_SOUND);
        header.style.backgroundColor = BACKGROUND_MEDIUM_POINTS;
        cleanCircles();
        break;
      case 12:
        this.pointsToAdd = 80;
        toggleCirclesNumber();
        playAudio(SUCCESS_SOUND);
        header.style.backgroundColor = BACKGROUND_MAX_POINTS;
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

  trainAgain() {
    document.querySelector('.train-again').addEventListener('click', () => {
      this.pairNumber = 0;
      this.pointsToAdd = 10;
      this.correctAnswersNumber = 0;
      this.secondsRemaining = 60;
      this.correctAnswers = [];
      this.wrongAnswers = [];
      document.querySelector('.sprint-wrapper').innerHTML = gameScreenComponent();
      this.renderButtonEvents();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  showStatistics() {
    document.querySelector('.statistics').addEventListener('click', () => {
      const statistics = JSON.parse(localStorage.getItem('statistics'));
      document.querySelector('.sprint-wrapper').innerHTML = statisticsScreenComponent(statistics);
      document.querySelector('.statistics__buttons .train-again').addEventListener('click', () => {
        this.pairNumber = 0;
        this.pointsToAdd = 10;
        this.correctAnswersNumber = 0;
        this.secondsRemaining = 60;
        this.correctAnswers = [];
        this.wrongAnswers = [];
        document.querySelector('.sprint-wrapper').innerHTML = gameScreenComponent();
        this.renderButtonEvents();
      });
    });
  }

  showStartTimer() {
    const timer = setInterval(() => {
      this.secondsRemaining = +document.querySelector('.start-timer text').innerHTML - 1;
      if (this.secondsRemaining === -1) {
        clearInterval(timer);
        this.audio.pause();
        document.querySelector('.start-timer').classList.add('hidden');
        document.querySelector('.get-ready').classList.add('hidden');
        this.startGame();
      } else {
        document.querySelector('.start-timer text').innerHTML = this.secondsRemaining;
        document.querySelector('.start-timer path').setAttribute('stroke-dasharray', `${60 - (60 * this.secondsRemaining) / 5}, 60`);
      }
    }, 1000);
  }

  renderButtonEvents() {
    const start = document.querySelector('.start-game');
    start.addEventListener('click', () => {
      this.getWords();
      document.querySelector('.start-game').classList.add('hidden');
      document.querySelector('.start-timer').classList.remove('hidden');
      document.querySelector('.get-ready').classList.remove('hidden');
      this.showStartTimer();
      this.audio = new Audio(TIMER_SOUND);
      this.audio.play();

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
        renderBackground();
        const buttonStart = document.querySelector('.button-start');
        buttonStart.addEventListener('click', () => {
          store.dispatch(showGameScreen());
        });
      }

      if (newState.sprintReducer.screen === 'game-screen' && !document.querySelector('.game-screen')) {
        document.querySelector('.sprint-wrapper').innerHTML = gameScreenComponent();

        this.renderButtonEvents();
        this.renderArrowsEvents();
      }
    });

    store.dispatch({ type: 'INIT_SPRINT' });
  }
}

export default new Sprint();
