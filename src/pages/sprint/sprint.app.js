import { CLASS_NAMES } from '../../common/common.constants';
import { SPEAKIT_CLASS_NAMES, SPEAKIT_GREETINGS } from './common/sprint.constants';
import { store } from '../../redux/store';
import './scss/sprint.styles.scss';
import { showGameScreen } from './sprint-redux/sprint-actions';
import { startScreenComponent } from './components/start-screen-component';
import { gameScreenComponent } from './components/game-screen-component';

class Sprint {
  constructor() {
    this.logo = null;
  }

  sayHello() {
    console.log(this.logo);

    const speakitLogo = document.createElement('h2');
    speakitLogo.className = SPEAKIT_CLASS_NAMES.LOGO;
    speakitLogo.textContent = this.logo;

    document.querySelector(`.${CLASS_NAMES.MAIN.LOGO}`).after(speakitLogo);
  }

  init() {
    this.logo = SPEAKIT_GREETINGS; // ?

    store.subscribe(() => {
      const newState = store.getState();
      if (newState.sprintReducer.screen === 'start-screen') {
        document.getElementById('root').innerHTML = startScreenComponent();

        const buttonStart = document.querySelector('.button-start');
        buttonStart.addEventListener('click', () => {
          store.dispatch(showGameScreen());
        });
      }

      if (newState.sprintReducer.screen === 'game-screen') {
        document.getElementById('root').innerHTML = gameScreenComponent();
      }
    });

    store.dispatch({ type: 'INIT_SPRINT' });
  }
}

export default new Sprint();
