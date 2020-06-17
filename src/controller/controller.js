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
    controller.sayHello('Main');
    main.sayHello();
  },

  actionPuzzle: () => {
    controller.sayHello('Puzzle');
    englishPuzzle.sayHello();
  },

  actionSpeakIt: () => {
    controller.sayHello('SpeakIt');
    speakit.sayHello();
  },

  actionAudioCall() {
    controller.sayHello('Audio Call');
    audiocall.sayHello();
  },
  actionOurGame() {
    controller.sayHello('Our Game');
    ourgame.sayHello();
  },
  actionSavanna() {
    controller.sayHello('Savanna');
    savanna.sayHello();
  },
  actionSprint() {
    controller.sayHello('Sprint');
    sprint.sayHello();
  },

  actionPromo() {
    controller.sayHello('Promo');
    console.log('actionPromo');
  },

  sayHello(text) {
    const hello = document.createElement('h1');
    hello.textContent = text;

    document.querySelector('body').append(hello);
  },
};

export default controller;
