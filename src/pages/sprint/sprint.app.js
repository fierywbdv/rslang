import { store } from '../../redux/store';
import './scss/sprint.styles.scss';
import { showGameScreen } from './sprint-redux/sprint-actions';
import { startScreenComponent } from './components/start-screen-component';
import { gameScreenComponent } from './components/game-screen-component';
import { learnWordsAPIService } from '../../services/learnWordsAPIService';
import { shuffle, toggleCirclesNumber, cleanCircles } from './common/sprint.utils';
import {
  POINTS_PER_WORD,
  BACKGROUND_MAX_POINTS,
  BACKGROUND_MEDIUM_POINTS,
  BACKGROUND_MIN_POINTS,
} from './common/sprint.constants';

class Sprint {
  constructor() {
    this.level = 0;
    this.round = 0;
    this.gameStarted = false;
    this.secondsRemaining = 60;
    this.words = [];
    this.translations = [];
    this.shuffledWords = [];
    this.shuffledTranslations = [];
    this.pairNumber = 0;
    this.pointsToAdd = 10;
    this.correctAnswersNumber = 0;
  }

  async startGame() {
    this.level = document.getElementById('level').value - 1;
    this.round = document.getElementById('round').value - 1;

    document.querySelector('.current-state').classList.remove('hidden');
    document.querySelector('.card').classList.remove('hidden');
    document.querySelector('.arrows').classList.remove('hidden');

    const wordsList = await learnWordsAPIService.getWordsByPageAndGroup(this.level, this.round);
    this.createWordsArray(wordsList);
    this.createTranslationsArray(wordsList);
    this.shuffledWords = shuffle(this.words.slice());
    this.shuffledTranslations = shuffle(this.translations.slice());

    this.startCountdown();
    this.showPair();
  }

  startCountdown() {
    setInterval(() => {
      this.secondsRemaining = +document.querySelector('.percentage').innerHTML - 1;
      document.querySelector('.percentage').innerHTML = this.secondsRemaining;
      document.querySelector('.circle').setAttribute('stroke-dasharray', `${60 - this.secondsRemaining}, 60`);
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

  answerCorrectly() {
    if (this.checkAnswer()) {
      this.correctAnswersNumber++;
      this.showCorrectAnswer();
      this.addPoints();
    } else {
      this.correctAnswersNumber = 0;
      this.showMistake();
      this.subtractPoints();
      cleanCircles();
    }
    this.pairNumber++;
    this.showPair();
  }

  answerWrong() {
    if (this.checkAnswer()) {
      this.correctAnswersNumber = 0;
      this.showMistake();
      this.subtractPoints();
      cleanCircles();
    } else {
      this.correctAnswersNumber++;
      this.showCorrectAnswer();
      this.addPoints();
    }
    this.pairNumber++;
    this.showPair();
  }

  checkAnswer() {
    const wordIndex = this.words.indexOf(this.shuffledWords[this.pairNumber]);
    return this.translations[wordIndex] === this.shuffledTranslations[this.pairNumber];
  }

  showMistake() {
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
        header.style.backgroundColor = BACKGROUND_MIN_POINTS;
        cleanCircles();
        break;
      case 8:
        this.pointsToAdd = 40;
        header.style.backgroundColor = BACKGROUND_MEDIUM_POINTS;
        cleanCircles();
        break;
      case 12:
        this.pointsToAdd = 80;
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

          document.addEventListener('keyup', (event) => {
            if (event.code === 'ArrowLeft') {
              this.answerWrong();
            }
            if (event.code === 'ArrowRight') {
              this.answerCorrectly();
            }
          });
        });
      }
    });

    store.dispatch({ type: 'INIT_SPRINT' });
  }
}

export default new Sprint();
