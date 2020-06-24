import { doc } from 'prettier';
import main from '../pages/main/main.app';
import speakit from '../pages/speakit/speakit.app';
import audiocall from '../pages/audiocall/audiocall.app';
import englishPuzzle from '../pages/english-puzzle/english-puzzle.app';
import ourgame from '../pages/ourgame/ourgame.app';
import savanna from '../pages/savanna/savanna.app';
import sprint from '../pages/sprint/sprint.app';

const controller = {

  callAction: (url) => {
    switch (url) {
      case '/':
        controller.actionMain();
        break;
      case 'puzzle':
        controller.actionPuzzle();
        break;
      case 'speakit':
        controller.actionSpeakIt();
        break;
      case 'audiocall':
        controller.actionAudioCall();
        break;
      case 'ourgame':
        controller.actionOurGame();
        break;
      case 'savanna':
        controller.actionSavanna();
        break;
      case 'sprint':
        console.log('contr');
        controller.actionSprint();
        break;
      case 'promo':
        controller.actionPromo();
        break;
      default:
        break;
    }
  },

  actionMain: () => {
    main.sayHello();
  },
  actionPuzzle: () => {
    englishPuzzle.sayHello();
  },
  actionSpeakIt: () => {
    speakit.sayHello();
  },
  actionAudioCall() {
    audiocall.sayHello();
  },
  actionOurGame() {
    ourgame.sayHello();
  },
  actionSavanna() {
    savanna.sayHello();
  },
  actionSprint() {
    document.getElementById('root').classList.add('bg');
    sprint.init();
  },
  actionPromo() {
    console.log('actionPromo');
  },
};

export default controller;
