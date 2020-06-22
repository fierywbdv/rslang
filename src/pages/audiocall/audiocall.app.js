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
  static startGame() {
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
      store.dispatch(togglePlay());
      store.dispatch(askQuestion(startAskInfo));
      Audiocall.setGameStatistic({ type: 'startGame', id: 'Audio Call', game: 1 });
    });
  }

  static playGameQuestion() {
    const state = store.getState();
    const { askInfo } = state.audioCallReducer;
    const questions = Audiocall.getQuestionWithAnswers();
    if (askInfo.nextQuestion) {
      store.dispatch(askQuestion({
        nextQuestion: false,
        nextQuestionNum: askInfo.nextQuestionNum += 1,
        firstQuestion: false,
      }));
      helper.render('#root', questions[askInfo.nextQuestionNum || 0], 'append', '.screen');
      const words = document.querySelectorAll('.name');
      words.forEach((word) => {
        word.addEventListener('click', (event) => {
          Audiocall.checkAnswer(event.target, askInfo.nextQuestionNum);
        });
      });
    }

    if (askInfo.firstQuestion) {
      helper.render('#root', questions[askInfo.nextQuestionNum || 0], 'append', '.screen');
      const words = document.querySelectorAll('.name');
      words.forEach((word) => {
        word.addEventListener('click', (event) => {
          Audiocall.checkAnswer(event.target, askInfo.nextQuestionNum);
        });
      });
      store.dispatch(askQuestion({
        ...askInfo,
        firstQuestion: false,
      }));
    }
  }

  static getQuestionWithAnswers() {
    const state = store.getState();
    const { setQuestionsGame } = state.audioCallReducer;
    return helper.getAnswers(setQuestionsGame).map((elem) => gameScreenComponent(elem));
  }

  static setGameStatistic(info = {}) {
    store.dispatch(setStatistic(info));
  }

  static checkAnswer(answer, questionNum) {
    const currentQuestion = document.querySelector('.result-word').getAttribute('data-word-id');
    if (answer.getAttribute('data-id') === currentQuestion) {
      const state = store.getState();
      const { askInfo } = state.audioCallReducer;
      store.dispatch(askQuestion({
        ...askInfo,
        nextQuestion: !askInfo.nextQuestion,
      }));
      Audiocall.setGameStatistic({ id: currentQuestion, error: false, type: 'checkAnswer' });
      if (questionNum === 3 || questionNum === 6 || questionNum === 9) {
        helper.render('#root', statisticScreenComponent(), 'append', '.screen');
        const restart = document.querySelector('.restart');
        restart.addEventListener('click', () => {
          this.stopGame();
          this.startGame();
          store.dispatch(togglePlay());
        });
      }
    } else {
      Audiocall.setGameStatistic({ id: currentQuestion, error: true, type: 'checkAnswer' });
    }
  }

  static stopGame() {
    helper.render('#root', startScreenComponent(), 'append', '.container');
    store.dispatch(togglePlay());
    this.startGame();
  }

  init() {
    Audiocall.startGame();
    store.subscribe(() => {
      const state = store.getState();
      if (state.audioCallReducer.togglePlay) {
        Audiocall.playGameQuestion();
      }
    });
  }
}

export default new Audiocall();
