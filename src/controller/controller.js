import main from '../pages/main/main.app';
import speakit from '../pages/speakit/speakit.app';
import audiocall from '../pages/audiocall/audiocall.app';
import englishPuzzle from '../pages/english-puzzle/english-puzzle.app';
import ourgame from '../pages/ourgame/ourgame.app';
import Savanna from '../pages/savanna/savanna.app';
import sprint from '../pages/sprint/sprint.app';
import user from '../pages/user/user.app';
import helper from '../pages/audiocall/common/audiocall.helper';
import startScreenComponent from '../pages/audiocall/components/start-screen';
import startScreenOurGameComponent from '../pages/ourgame/components/start-screen';
import teamScreenComponent from '../pages/team/components/team-screen';

const controller = {
  callAction: (url) => {
    const root = document.getElementById('root');
    const body = document.querySelector('body');
    root.className = '';
    body.className = '';
    if (root.hasChildNodes()) {
      root.childNodes[0].remove();
    }

    switch (url) {
      case 'main':
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
        controller.actionSprint();
        break;
      case 'user':
        controller.actionUser();
        break;
      case 'team':
        controller.actionTeam();
        break;
      case '/':
        controller.actionSelect();
        break;
      default:
        break;
    }
  },

  actionMain: () => {
    main.init();
  },
  actionPuzzle: () => {
    englishPuzzle.sayHello();
  },
  actionSpeakIt: () => {
    speakit();
  },
  actionAudioCall() {
    helper.render('#root', startScreenComponent());
    audiocall.init();
  },
  actionOurGame() {
    helper.render('#root', startScreenOurGameComponent());
    ourgame.init();
  },
  actionSavanna() {
    Savanna();
  },
  actionSprint() {
    sprint.init();
  },
  actionUser() {
    user.init();
  },
  actionSelect() {
    main.select();
  },

  actionTeam() {
    helper.render('#root', teamScreenComponent());
  },
};

export default controller;
