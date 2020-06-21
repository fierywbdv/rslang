import { store } from '../../redux/store';
import { setQuestions, togglePlay, askQuestion } from './audiocall-redux/audiocall-actions';
import './scss/audiocall.styles.scss';
import helper from './common/audiocall.helper';
import gameScreenComponent from './components/game-screen';
import startScreenComponent from './components/start-screen';
import mockData from './common/mock-data';

class Audiocall {
  static startGame() {
    const startButton = document.getElementById('center-div');
    store.dispatch(setQuestions(mockData));
    startButton.addEventListener('click', () => {
      store.dispatch(togglePlay());
      store.dispatch(askQuestion({ nextQuestion: false, nextQuestionNum: 0 }));
      Audiocall.setGameStatistic();
    });
  }

  static playGameQuestion() {
    const state = store.getState();
    const { askInfo } = state.audioCallReducer;
    if (askInfo.nextQuestion) {
      store.dispatch(askQuestion({
        nextQuestion: false,
        nextQuestionNum: askInfo.nextQuestionNum += 1,
      }));
    }
    const questions = Audiocall.getQuestionWithAnswers();
    helper.render('#root', questions[askInfo.nextQuestionNum || 0], 'append', '.screen');
    const words = document.querySelectorAll('.name');
    words.forEach((word) => {
      word.addEventListener('click', (event) => {
        Audiocall.checkAnswer(event.target, askInfo.nextQuestionNum);
      });
    });
  }

  static getQuestionWithAnswers() {
    const state = store.getState();
    const { setQuestionsGame } = state.audioCallReducer;
    return helper.getAnswers(setQuestionsGame).map((elem) => gameScreenComponent(elem));
  }

  static setGameStatistic() {
    console.log('setGameStatistic');
  }

  static checkAnswer(answer, questionNum) {
    console.log('questionNum', questionNum);
    const currentQuestion = document.querySelector('.result-word');
    if (answer.getAttribute('data-id') === currentQuestion.getAttribute('data-word-id')) {
      const state = store.getState();
      const { askInfo } = state.audioCallReducer;
      store.dispatch(askQuestion({
        ...askInfo,
        nextQuestion: !askInfo.nextQuestion,
      }));
      Audiocall.setGameStatistic();
    } else {
      Audiocall.setGameStatistic();
    }
  }

  static stopGame() {
    helper.render('#root', startScreenComponent(), 'append', '.container');
    store.dispatch(togglePlay());
    this.startGame();
  }

  // askQuestion() {
  //   const state = store.getState();
  //   const { setDataPlayGame } = state.audioCallReducer;
  //   const questions = helper.getAnswers(setDataPlayGame).map((elem) => gameScreenComponent(elem));
  //   store.dispatch(questionPlay());
  //   store.dispatch(setQuestionsPlay(questions));
  //   if (state.audioCallReducer.questionGame < 19 && state.audioCallReducer.questionGame !== 2) {
  //     helper.render('#root', questions[state.audioCallReducer.questionGame], 'append', '.screen');
  //     const words = document.querySelectorAll('.name');
  //     words.forEach((word) => {
  //       word.addEventListener('click', (event) => {
  //         this.checkAnswer(event.target, setDataPlayGame);
  //       });
  //     });
  //   } else if (state.audioCallReducer.questionGame === 2) {
  //     helper.render('#root', statisticScreenComponent(), 'append', '.screen');
  //     const restart = document.querySelector('.restart');
  //     restart.addEventListener('click', () => {
  //       this.stopGame();
  //       this.startGame();
  //       store.dispatch(togglePlay());
  //     });
  //   } else {
  //     store.dispatch(questionPlay(0));
  //     this.stopGame();
  //   }
  // }
  //

  //
  // setStatistic(data, words) {
  //   console.log('setStatistic', data, words);
  //   store.dispatch(setStatisticPlay([data]));
  // }
  //

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
