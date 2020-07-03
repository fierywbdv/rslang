import './scss/ourgame.styles.scss';
import { store } from '../../redux/store';
import { learnWordsAPIService } from '../../services/learnWordsAPIService';
import {
  setGameNumber,
  setQuestions,
  togglePlay,
  setQuestionNumber,
  setStatistic,
  setListenAnswer,
} from './ourgame-redux/ourgame-actions';
import helper from './common/ourgame.helper';
import gameScreenComponent from './components/game-screen';
import startScreenOurGameComponent from './components/start-screen';
import statisticScreenComponent from './components/statistic-screen';
import mockData from '../audiocall/common/mock-data';

class Ourgame {
  constructor() {
    this.words = null;
    this.timeOut = null;
    this.page = 0;
    this.group = 1;
    this.isFirstGame = false;
    this.questionsGame = null;
    this.info = null;
    this.correct = new Audio('./assets/audio/correct.mp3');
    this.mistake = new Audio('./assets/audio/error.mp3');
    this.failure = new Audio('./assets/audio/failure.mp3');
    this.win = new Audio('./assets/audio/success.mp3');
    this.baseUrl = 'https://raw.githubusercontent.com/irinainina/rslang-data/master/';
  }

  startGame() {
    const startButton = document.getElementById('start-play');
    const root = document.getElementById('root');
    const level = document.getElementById('level');
    const group = document.getElementById('group');
    const customStart = document.getElementById('custom-start');
    const body = document.querySelector('body');
    body.className = 'our-game-body';
    root.classList.add('our-game-root');
    helper.rangeSlider();

    if (startButton) {
      startButton.addEventListener('click', () => {
        store.dispatch(togglePlay());
        store.dispatch(setGameNumber());
        this.playGame();
      });
    }

    if (customStart) {
      customStart.addEventListener('click', async () => {
        this.page = level.value;
        this.group = group.value;
        await this.setWords(this.page, this.group);
        console.log('level', level.value);
        console.log('group', group.value);
        store.dispatch(togglePlay());
        store.dispatch(setGameNumber());
        this.playGame();
      });
    }
  }

  playGame() {
    const state = store.getState();
    const { setQuestionsGame } = state.ourGameReducer;
    helper.render('#root', gameScreenComponent(setQuestionsGame), 'append', '.screen');
    const questions = document.querySelectorAll('.inner-left .name');
    questions.forEach((item) => {
      item.addEventListener('click', (e) => {
        this.askQuestion(e.target);
      });
    });
    this.listenAnswer();
    this.setRestart();
  }

  listenAnswer() {
    const answers = document.querySelectorAll('.inner-right .name');
    answers.forEach((item) => {
      item.addEventListener('click', (e) => {
        const state = store.getState();
        const { isListenAnswer } = state.ourGameReducer;
        if (isListenAnswer.nextQuestion) {
          this.checkAnswer(e.target);
        }
      });
    });
  }

  askQuestion(elem) {
    const questions = document.querySelectorAll('.inner-left .name');
    const infoWord = document.getElementById('info-word');
    store.dispatch(setListenAnswer({ isListen: true, nextQuestion: true, answered: true }));
    questions.forEach((item) => {
      if (item.classList.contains('checked')) {
        item.classList.remove('checked');
      }
    });
    elem.classList.toggle('checked');
    const transcription = elem.getAttribute('data-transcription');
    const audio = elem.getAttribute('data-audio');
    infoWord.innerText = transcription;
    this.sayWord(audio);
  }

  checkAnswer(elem) {
    const id = elem.getAttribute('data-id');
    const currentQuestion = Ourgame.getCurrentQuestion();
    const audio = elem.getAttribute('data-audio');
    const infoWord = document.getElementById('info-word');
    const state = store.getState();
    const { setQuestionNum, setGameNum, setQuestionsGame } = state.ourGameReducer;
    store.dispatch(setListenAnswer({ isListen: true, nextQuestion: false, answered: true }));

    window.clearTimeout(this.timeOut);

    if (id === currentQuestion.getAttribute('data-id')) {
      store.dispatch(setListenAnswer({ isListen: true, nextQuestion: false, answered: true }));
      this.correct.play();
      currentQuestion.classList.add('hide');
      elem.classList.add('hide');
      helper.setOpacity(setQuestionNum);
      infoWord.innerText = `${currentQuestion.innerText} = ${elem.innerText}`;
      this.timeOut = setTimeout(() => {
        this.sayWord(audio);
      }, 300);
      this.setGameStatistic({
        game: setGameNum,
        quesNum: setQuestionsGame,
        mistake: false,
        wordQues: this.getQuestion(currentQuestion.getAttribute('data-id')),
      });
      store.dispatch(setQuestionNumber());
      if (setQuestionNum === 9 || setQuestionNum === 19) {
        helper.render('#root', statisticScreenComponent(setGameNum), 'append', '.screen');
        if (setQuestionNum === 19) {
          this.page = this.page === 20 ? 1 : this.page + 1;
          this.group = this.page === 20 ? this.group + 1 : this.group;
          this.setWords(this.group, this.page);
        }
        store.dispatch(togglePlay());
        this.isFirstGame = !this.isFirstGame;
        this.setRestart();
        this.setRepeat();
      }
    } else {
      store.dispatch(setListenAnswer({ isListen: true, nextQuestion: true, answered: true }));
      this.mistake.play();
      elem.classList.toggle('answered');
      this.setGameStatistic({
        game: setGameNum,
        quesNum: setQuestionsGame,
        mistake: true,
        wordQues: this.getQuestion(currentQuestion.getAttribute('data-id')),
      });
    }
  }

  sayWord(audio) {
    const audioQuestion = new Audio(`${this.baseUrl}${audio}`);
    audioQuestion.play();
  }

  static getCurrentQuestion() {
    const questions = document.querySelectorAll('.inner-left .name');
    let currentQuestions = null;
    questions.forEach((elem) => {
      if (elem.classList.contains('checked')) {
        currentQuestions = elem;
      }
    });
    return currentQuestions;
  }

  stopGame() {
    helper.render('#root', startScreenOurGameComponent(), 'append', '.container');
    this.setWords(this.page, this.group);
  }

  setGameStatistic(info = {}) {
    this.info = { ...info };
    store.dispatch(setStatistic(this.info));
  }

  getQuestion(id) {
    const state = store.getState();
    const { setQuestionsGame } = state.ourGameReducer;
    this.questionsGame = setQuestionsGame.filter((item) => item.id === id);
    return this.questionsGame[0];
  }

  async setWords(page = 0, group = 1) {
    this.words = await learnWordsAPIService.getWordsByPageAndGroup(page, group);
    if (this.isFirstGame) {
      store.dispatch(setQuestions(this.words.slice(0, 10)));
    } else {
      store.dispatch(setQuestions(this.words.slice(10, 20)));
    }
    this.startGame();
  }

  setRestart() {
    const restart = document.querySelector('.restart');
    restart.addEventListener('click', () => {
      store.dispatch(togglePlay());
      this.stopGame();
    });
  }

  setRepeat() {
    const repeat = document.querySelectorAll('.name');
    repeat.forEach((item) => {
      item.addEventListener('click', (event) => {
        const audio = event.target;
        this.sayWord(audio.getAttribute('data-audio'));
      });
    });
  }

  init() {
    this.setWords(this.page, this.group);


  }
}

export default new Ourgame();
