import { store } from '../../redux/store';
import './scss/sprint.styles.scss';
import { showGameScreen } from './sprint-redux/sprint-actions';
import { startScreenComponent } from './components/start-screen-component';
import { gameScreenComponent } from './components/game-screen-component';
import { resultsScreenComponent } from './components/results-screen-component';
import { statisticsScreenComponent } from './components/statistics-screen-component';
import { learnWordsAPIService } from '../../services/learnWordsAPIService';
import {
  shuffle,
  createWordsArray,
  createTranslationsArray,
  setLevelAndRound,
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
  AUDIO_PATH,
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
    this.pairNumber = 0;
    this.pointsToAdd = 10;
    this.correctAnswersNumber = 0;
    this.audio = new Audio();
    this.correctAnswers = [];
    this.wrongAnswers = [];
    this.isDynamicActivated = true;
    this.isSoundActivated = true;
    this.arrowsHandler = null;
    this.learnedWordsHandler = null;
    this.areLearnedWordsChosen = false;
    this.areWordsAdded = false;
  }

  startGame() {
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
        document.removeEventListener('keyup', this.arrowsHandler);
        this.audio.pause();
        const points = document.querySelector('.points').innerHTML;
        saveStatistics(points);
        setTimeout(() => {
          document.querySelector('.sprint-wrapper').innerHTML = resultsScreenComponent(this.wordsList, this.words, this.correctAnswers, this.wrongAnswers, points);
          playResultsAudio();
          document.querySelector('.train-again').addEventListener('click', () => this.trainAgain());
          this.showStatistics();
        }, 1000);
      } else if (this.secondsRemaining === 5 && this.isSoundActivated) {
        this.audio = new Audio(TIMER_SOUND);
        this.audio.play();
      }
      document.querySelector('.percentage').innerHTML = this.secondsRemaining;
      document.querySelector('.circle').setAttribute('stroke-dasharray', `${60 - this.secondsRemaining}, 60`);
    }, 1000);
  }

  showPair() {
    const number = Math.floor(Math.random() * this.wordsList.length);
    console.log(number);
    if (number % 2) {
      document.querySelector('.card__translation').innerHTML = this.translations[this.pairNumber];
      console.log(this.translations[this.pairNumber]);
    } else {
      document.querySelector('.card__translation').innerHTML = this.translations[number];
      console.log(this.translations[number]);
    }
    console.log(this.words[this.pairNumber]);
    document.querySelector('.card__word').innerHTML = this.words[this.pairNumber];
    playAudio(`${AUDIO_PATH}${this.wordsList[this.pairNumber].audio}`, this.isDynamicActivated);
  }

  initLevelAndGroup() {
    this.level = document.getElementById('level').value - 1;
    this.round = document.getElementById('round').value - 1;
  }

  setLevelAndGroup() {
    localStorage.setItem('level', this.level + 1);
    localStorage.setItem('round', this.round + 1);
  }

  changeLevelAndGroup() {
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
  }

  async getWords() {
    this.initLevelAndGroup();
    this.setLevelAndGroup();

    this.wordsList = await learnWordsAPIService.getWordsByPageAndGroup(this.round, this.level);
    console.log(this.wordsList);
    shuffle(this.wordsList);
    this.words = createWordsArray(this.wordsList);
    this.translations = createTranslationsArray(this.wordsList);
  }

  async addWords() {
    if ((!this.areLearnedWordsChosen) || this.areWordsAdded) {
      this.changeLevelAndGroup();
    } else {
      if (this.wordsList.length >= 20) {
        this.areLearnedWordsChosen = false;
      }
      this.initLevelAndGroup();
      this.setLevelAndGroup();
      this.areWordsAdded = true;
    }

    const newWordsList = await learnWordsAPIService.getWordsByPageAndGroup(this.round, this.level);
    console.log(newWordsList);
    shuffle(newWordsList);
    this.wordsList.push(...newWordsList);
    const newWords = createWordsArray(newWordsList);
    this.words.push(...newWords);
    const newTranslations = createTranslationsArray(newWordsList);
    this.translations.push(...newTranslations);
  }

  answerCorrectly() {
    if (this.checkAnswer()) {
      this.correctAnswers.push(this.words[this.pairNumber]);
      this.correctAnswersNumber++;
      this.showCorrectAnswer();
      this.addPoints();
    } else {
      this.wrongAnswers.push(this.words[this.pairNumber]);
      this.correctAnswersNumber = 0;
      this.showMistake();
      this.subtractPoints();
      cleanCircles();
    }
    this.pairNumber++;
    if (this.pairNumber === Math.ceil(this.words.length / 2)) {
      this.addWords();
    }
    this.showPair();
  }

  answerWrong() {
    if (this.checkAnswer()) {
      this.wrongAnswers.push(this.words[this.pairNumber]);
      this.correctAnswersNumber = 0;
      this.showMistake();
      this.subtractPoints();
      cleanCircles();
    } else {
      this.correctAnswers.push(this.words[this.pairNumber]);
      this.correctAnswersNumber++;
      this.showCorrectAnswer();
      this.addPoints();
    }
    this.pairNumber++;
    if (this.pairNumber === Math.ceil(this.words.length / 2)) {
      this.addWords();
    }
    this.showPair();
  }

  checkAnswer() {
    return document.querySelector('.card__translation').innerHTML === this.translations[this.pairNumber];
  }

  showMistake() {
    playAudio(ERROR_SOUND, this.isSoundActivated);

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
    playAudio(CORRECT_SOUND, this.isSoundActivated);

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
        playAudio(SUCCESS_SOUND, this.isSoundActivated);
        header.style.backgroundColor = BACKGROUND_MIN_POINTS;
        cleanCircles();
        break;
      case 8:
        this.pointsToAdd = 40;
        playAudio(SUCCESS_SOUND, this.isSoundActivated);
        header.style.backgroundColor = BACKGROUND_MEDIUM_POINTS;
        cleanCircles();
        break;
      case 12:
        this.pointsToAdd = 80;
        toggleCirclesNumber();
        playAudio(SUCCESS_SOUND, this.isSoundActivated);
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
    this.pairNumber = 0;
    this.correctAnswersNumber = 0;
    this.pointsToAdd = 10;
    this.correctAnswers = [];
    this.secondsRemaining = 60;
    this.wrongAnswers = [];
    this.areLearnedWordsChosen = false;
    this.areWordsAdded = false;
    document.querySelector('.sprint-wrapper').innerHTML = gameScreenComponent();

    setLevelAndRound();

    if (!this.isSoundActivated) {
      document.querySelector('.fa-itunes-note').classList.remove('chosen');
    }
    if (!this.isDynamicActivated) {
      document.querySelector('.fa-volume-up').classList.remove('chosen');
    }

    this.renderButtonEvents();
    document.addEventListener('keyup', this.renderArrowsEvents.bind(this)());
    document.querySelector('.learned-words').addEventListener('click', this.learnedWordsHandler);
    this.renderSoundsEvents();
  }

  showStatistics() {
    document.querySelector('.statistics').addEventListener('click', () => {
      const statistics = JSON.parse(localStorage.getItem('statistics'));
      document.querySelector('.sprint-wrapper').innerHTML = statisticsScreenComponent(statistics);
      document.querySelector('.statistics__button .train-again').addEventListener('click', () => {
        this.trainAgain();
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
      if (!this.areLearnedWordsChosen) {
        this.getWords();
      }
      document.querySelector('.learned-words').removeEventListener('click', this.learnedWordsHandler);

      document.querySelector('.start-game').classList.add('hidden');
      document.querySelector('.start-timer').classList.remove('hidden');
      document.querySelector('.get-ready').classList.remove('hidden');
      this.showStartTimer();
      if (this.isSoundActivated) {
        this.audio = new Audio(TIMER_SOUND);
        this.audio.play();
      }

      document.querySelector('.btn-danger').addEventListener('click', () => this.answerWrong());
      document.querySelector('.btn-success').addEventListener('click', () => this.answerCorrectly());
    });
  }

  renderArrowsEvents() {
    this.arrowsHandler = (event) => {
      if (event.code === 'ArrowLeft') {
        this.answerWrong();
      }
      if (event.code === 'ArrowRight') {
        this.answerCorrectly();
      }
    };
    return this.arrowsHandler;
  }

  renderSoundsEvents() {
    const dynamic = document.querySelector('.fa-volume-up');
    dynamic.addEventListener('click', () => {
      dynamic.classList.toggle('chosen');
      this.isDynamicActivated = !this.isDynamicActivated;
    });

    const notes = document.querySelector('.fa-itunes-note');
    notes.addEventListener('click', () => {
      notes.classList.toggle('chosen');
      this.isSoundActivated = !this.isSoundActivated;
    });
  }

  async chooseLearnedWords() {
    const learnedWordsInfo = await learnWordsAPIService.getAllUserWords(localStorage.getItem('userId'), localStorage.getItem('token'));
    if (learnedWordsInfo.length) {
      document.querySelector('.learned-words').classList.add('chosen');
      this.areLearnedWordsChosen = true;
      console.log(learnedWordsInfo);
      this.wordsList = learnedWordsInfo.map((learnedWord) => learnedWord.optional.word);
      console.log(this.wordsList);
      shuffle(this.wordsList);
      this.words = createWordsArray(this.wordsList);
      this.translations = createTranslationsArray(this.wordsList);
      if (learnedWordsInfo.length < 20) {
        this.addWords();
      }
    } else {
      document.querySelector('.error-message').classList.remove('none');
      setTimeout(() => document.querySelector('.error-message').classList.add('none'), 1000);
    }
  }

  init() {
    document.body.classList.add('sprint-body');
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
        if (localStorage.getItem('level') && localStorage.getItem('round')) {
          setLevelAndRound();
        }
        this.renderButtonEvents();
        document.addEventListener('keyup', this.renderArrowsEvents.bind(this)());
        this.renderSoundsEvents();
        this.learnedWordsHandler = this.chooseLearnedWords.bind(this);
        document.querySelector('.learned-words').addEventListener('click', this.learnedWordsHandler);
      }
    });

    store.dispatch({ type: 'INIT_SPRINT' });
  }
}

export default new Sprint();
