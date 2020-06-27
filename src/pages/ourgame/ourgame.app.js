import './scss/ourgame.styles.scss';
import { store } from '../../redux/store';
import { WordsAPIService } from '../../services/wordsAPIService';
import {
  setGameNumber, setQuestions, togglePlay, setQuestionNumber, setStatistic, setListenAnswer,
} from './ourgame-redux/ourgame-actions';
import helper from './common/ourgame.helper';
import gameScreenComponent from './components/game-screen';
import startScreenComponent from '../audiocall/components/start-screen';
import statisticScreenComponent from './components/statistic-screen';

class Ourgame {
  constructor() {
    this.words = null;
    this.timeOut = null;
    this.page = 0;
    this.group = 1;
    this.isFirstGame = false;
    this.correct = new Audio('./assets/audio/correct.mp3');
    this.mistake = new Audio('./assets/audio/error.mp3');
    this.failure = new Audio('./assets/audio/failure.mp3');
    this.win = new Audio('./assets/audio/success.mp3');
    this.baseUrl = 'https://raw.githubusercontent.com/irinainina/rslang-data/master/';
  }

  startGame() {
    const startButton = document.getElementById('center-div');
    startButton.addEventListener('click', () => {
      store.dispatch(togglePlay());
      store.dispatch(setGameNumber());
      this.playGame();
    });
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
    const {
      setQuestionNum, setGameNum, setQuestionsGame,
    } = state.ourGameReducer;
    store.dispatch(setListenAnswer({ isListen: true, nextQuestion: false, answered: true }));

    window.clearTimeout(this.timeOut);

    if (id === currentQuestion.getAttribute('data-id')) {
      store.dispatch(setListenAnswer({ isListen: true, nextQuestion: false, answered: true }));
      this.correct.play();
      currentQuestion.classList.add('hide');
      elem.classList.add('hide');
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
        store.dispatch(togglePlay());
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
    helper.render('#root', startScreenComponent(), 'append', '.container');
    this.setWords(this.page, this.group);
  }

  setGameStatistic(info = {}) {
    store.dispatch(setStatistic(info));
  }

  getQuestion(id) {
    const state = store.getState();
    const { setQuestionsGame } = state.ourGameReducer;
    const result = setQuestionsGame.filter((item) => item.id === id);
    return result[0];
  }

  async setWords(page = 0, group = 1) {
    this.words = await WordsAPIService.getWords(page, group);
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
