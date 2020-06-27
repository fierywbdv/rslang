import './scss/ourgame.styles.scss';
import { store } from '../../redux/store';
import { WordsAPIService } from '../../services/wordsAPIService';
import {
  setGameNumber, setQuestions, togglePlay, setQuestionNumber, setStatistic
} from './ourgame-redux/ourgame-actions';
import helper from './common/ourgame.helper';
import gameScreenComponent from './components/game-screen';
import startScreenComponent from '../audiocall/components/start-screen';

class Ourgame {
  constructor() {
    this.words = null;
    this.timeOut = null;
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

  async setWords() {
    const page = 0;
    const group = 1;
    this.words = await WordsAPIService.getWords(page, group);
    store.dispatch(setQuestions(this.words));
    this.startGame();
  }

  playGame() {
    const state = store.getState();
    const { setQuestionsGame } = state.ourGameReducer;
    helper.render('#root', gameScreenComponent(setQuestionsGame.splice(0, 10)), 'append', '.screen');
    const questions = document.querySelectorAll('.inner-left .name');

    questions.forEach((item) => {
      item.addEventListener('click', (e) => {
        this.askQuestion(e.target);
        const answers = document.querySelectorAll('.inner-right .name');
        answers.forEach((elem) => {
          if (elem.classList.contains('disabled')) {
            elem.classList.remove('disabled');
          }
        });
      });
    });
  }

  checkAnswer(elem) {
    const id = elem.getAttribute('data-id');
    const currentQuestion = Ourgame.getCurrentQuestion();
    const audio = elem.getAttribute('data-audio');
    const infoWord = document.getElementById('info-word');
    const state = store.getState();
    const { setQuestionNum, setGameNum, setQuestionsGame } = state.ourGameReducer;

    window.clearTimeout(this.timeOut);

    if (id === currentQuestion.getAttribute('data-id')) {
      this.correct.play();
      currentQuestion.classList.add('hide');
      elem.classList.add('hide');
      infoWord.innerText = `${currentQuestion.innerText} = ${elem.innerText}`;
      this.timeOut = setTimeout(() => {
        this.sayWord(audio);
      }, 300);
      const answers = document.querySelectorAll('.inner-right .name');
      answers.forEach((item) => {
        item.classList.add('disabled');
      });

      this.setGameStatistic({
        game: setGameNum,
        quesNum: setQuestionsGame,
        mistake: false,
        wordQues: this.getQuestion(currentQuestion.getAttribute('data-id')),
      });
      if (setQuestionNum === 9 || setQuestionNum === 19) {
        helper.render('#root', '<h1>hi</h1>', 'append', '.screen');
      }
      store.dispatch(setQuestionNumber());
      store.dispatch(togglePlay());
      // const restart = document.querySelector('.restart');
      // restart.addEventListener('click', () => {
      //   this.stopGame();
      // });
    } else {
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

  askQuestion(elem) {
    const questions = document.querySelectorAll('.inner-left .name');
    const infoWord = document.getElementById('info-word');
    const answers = document.querySelectorAll('.inner-right .name');
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
    answers.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (!item.classList.contains('disabled')) {
          this.checkAnswer(e.target);
        }
      });
    });
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
    this.startGame();
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

  init() {
    this.setWords();
  }
}

export default new Ourgame();
