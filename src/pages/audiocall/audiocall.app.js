// import { CLASS_NAMES } from '../../common/common.constants';
// import { SPEAKIT_CLASS_NAMES, SPEAKIT_GREETINGS } from './common/audiocall.constants';
import { store } from '../../redux/store';
import { togglePlay, getDataPlay } from './audiocall-redux/audiocall-actions';
import './scss/audiocall.styles.scss';
import helper from './common/audiocall.helper';
import gameScreenComponent from './components/game-screen';
import startScreenComponent from './components/start-screen';

class Audiocall {
  constructor() {
    this.logo = null;
  }

  newGame() {
    const startButton = document.querySelector('#center-div');
    startButton.addEventListener('click', () => {
      store.dispatch(togglePlay());
    });
  }

  async playGame(state) {
    if (state.togglePlayGame) {
      // const ques = await WordsAPIService.getWords(1, 2);
      // console.log(ques)
      this.question()
    }
  }

  question(){
    helper.render('#root', gameScreenComponent(), 'append', '#center-div');
    const words = document.querySelectorAll('.name');
    words.forEach((word) => {
      word.addEventListener('click', (event) => {
        this.answer(event.target);
      });
    });
  }

  answer(value) {
    console.log('answer', value);
    this.checkAnswer(value);
  }

  checkAnswer(answer) {
    if (answer.innerText === 'Beni Smith 5') {
      store.dispatch(togglePlay());
      this.stopGame();
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
      this.playGame(state.audioCallReducer);
      getDataPlay()
    });
    store.dispatch({ type: 'INIT_AUDIO_CALL' });
  }
}

export default new Audiocall();
