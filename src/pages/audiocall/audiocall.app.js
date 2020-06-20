// import { CLASS_NAMES } from '../../common/common.constants';
// import { SPEAKIT_CLASS_NAMES, SPEAKIT_GREETINGS } from './common/audiocall.constants';
import { store } from '../../redux/store';
import {
  togglePlay, setDataPlay, questionPlay, setQuestionsPlay,
} from './audiocall-redux/audiocall-actions';
import './scss/audiocall.styles.scss';
import helper from './common/audiocall.helper';
import gameScreenComponent from './components/game-screen';
import startScreenComponent from './components/start-screen';
import mockData from './common/mock-data';

class Audiocall {
  constructor() {
    this.logo = null;
  }

  newGame() {
    const startButton = document.querySelector('#center-div');
    store.dispatch(setDataPlay(mockData));
    startButton.addEventListener('click', () => {
      store.dispatch(togglePlay());
    });
  }

  playGame(state) {
    if (state.togglePlayGame) {
      this.askQuestion();
    }
  }

  askQuestion() {
    const state = store.getState();
    const { setDataPlayGame } = state.audioCallReducer;
    const questions = helper.getAnswers(setDataPlayGame).map((elem) => gameScreenComponent(elem));
    store.dispatch(questionPlay());
    store.dispatch(setQuestionsPlay(questions));
    if (state.audioCallReducer.questionGame < 19) {
      helper.render('#root', questions[state.audioCallReducer.questionGame], 'append', '.screen');
      const words = document.querySelectorAll('.name');
      words.forEach((word) => {
        word.addEventListener('click', (event) => {
          this.checkAnswer(event.target);
        });
      });
    } else {
      store.dispatch(questionPlay(0));
      this.stopGame();
    }
  }

  checkAnswer(answer) {
    const currentQuestion = document.querySelector('.result-word');
    if (answer.getAttribute('data-id') === currentQuestion.getAttribute('data-word-id')) {
      this.askQuestion();
    }
  }

  stopGame() {
    helper.render('#root', startScreenComponent(), 'append', '#play-screen');
    this.newGame();
  }

  init() {
    this.newGame();
    store.subscribe(() => {
      const state = store.getState();
      if (state.audioCallReducer.questionGame === 0) {
        this.playGame(state.audioCallReducer);
      }
    });
    store.dispatch({ type: 'INIT_AUDIO_CALL' });
  }
}

export default new Audiocall();
