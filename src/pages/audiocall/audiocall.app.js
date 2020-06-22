import { store } from '../../redux/store';
import {
  setQuestions, togglePlay, askQuestion, setStatistic,
} from './audiocall-redux/audiocall-actions';
import './scss/audiocall.styles.scss';
import helper from './common/audiocall.helper';
import gameScreenComponent from './components/game-screen';
import startScreenComponent from './components/start-screen';
import statisticScreenComponent from './components/statistic-screen';
import mockData from './common/mock-data';

class Audiocall {
  constructor() {
    this.correct = new Audio('./assets/audio/correct.mp3');
    this.mistake = new Audio('./assets/audio/error.mp3');
    this.failure = new Audio('./assets/audio/failure.mp3');
    this.win = new Audio('./assets/audio/success.mp3');
    this.baseUrl = 'https://raw.githubusercontent.com/irinainina/rslang-data/master/';
  }

  startGame() {
    const startButton = document.getElementById('center-div');
    store.dispatch(setQuestions(mockData));
    startButton.addEventListener('click', () => {
      const state = store.getState();
      const { askInfo } = state.audioCallReducer;
      const startAskInfo = {
        nextQuestion: (askInfo.nextQuestion === undefined) ? false : askInfo.nextQuestion,
        nextQuestionNum: (askInfo.nextQuestionNum === undefined) ? 0 : askInfo.nextQuestionNum,
        firstQuestion: true,
      };
      store.dispatch(askQuestion(startAskInfo));
      store.dispatch(togglePlay());
      this.playGameQuestion();
    });
  }

  playGameQuestion() {
    const state = store.getState();
    const { askInfo, setQuestionsGame } = state.audioCallReducer;
    const questions = this.getQuestionWithAnswers();
    if (state.audioCallReducer.togglePlay) {
      if (askInfo.nextQuestion) {
        store.dispatch(askQuestion({
          nextQuestion: false,
          nextQuestionNum: askInfo.nextQuestionNum += 1,
          firstQuestion: false,
        }));
      }
      const number = askInfo.nextQuestionNum || 0;
      helper.render('#root', questions[number], 'append', '.screen');
      const { audio } = setQuestionsGame[askInfo.nextQuestionNum || 0];
      this.sayQuestion(audio);
      const words = document.querySelectorAll('.name');
      words.forEach((word) => {
        word.addEventListener('click', (event) => {
          this.checkAnswer(event.target, askInfo.nextQuestionNum);
        });
      });
    }
  }

  sayQuestion(audio) {
    const audioQuestion = new Audio(`${this.baseUrl}${audio}`);
    audioQuestion.play();
  }

  getQuestionWithAnswers() {
    const state = store.getState();
    const { setQuestionsGame } = state.audioCallReducer;
    return helper.getAnswers(setQuestionsGame).map((elem) => gameScreenComponent(elem));
  }

  setGameStatistic(info = {}) {
    store.dispatch(setStatistic(info));
  }

  checkAnswer(answer, questionNum) {
    const currentQuestion = document.querySelector('.result-word').getAttribute('data-word-id');
    if (answer.getAttribute('data-id') === currentQuestion) {
      const state = store.getState();
      const { askInfo } = state.audioCallReducer;
      store.dispatch(askQuestion({
        ...askInfo,
        nextQuestion: !askInfo.nextQuestion,
      }));
      if (questionNum === 2 || questionNum === 4 || questionNum === 6) {
        helper.render('#root', statisticScreenComponent(), 'append', '.screen');
        store.dispatch(togglePlay());
        const restart = document.querySelector('.restart');
        restart.addEventListener('click', () => {
          this.stopGame();
        });
        this.setGameStatistic({ id: currentQuestion, error: false, type: 'checkAnswer' });
      } else {
        this.setGameStatistic({ id: currentQuestion, error: false, type: 'checkAnswer' });
        this.playGameQuestion();
      }
    } else {
      this.setGameStatistic({ id: currentQuestion, error: true, type: 'checkAnswer' });
    }
  }

  stopGame() {
    helper.render('#root', startScreenComponent(), 'append', '.container');
    this.startGame();
    // this.startGame();
  }

  init() {
    this.startGame();
  }
}

export default new Audiocall();
