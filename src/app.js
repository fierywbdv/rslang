import main from './pages/main/main.app';
import speakit from './pages/speakit/speakit.app';
import audiocall from './pages/audiocall/audiocall.app';
import englishPuzzle from './pages/english-puzzle/english-puzzle.app';
import ourgame from './pages/ourgame/ourgame.app';
import savanna from './pages/savanna/savanna.app';
import sprint from './pages/sprint/sprint.app';
import login from './pages/login/login.app';
import register from './pages/login/register.app';

import { APP_GREETINGS } from './common/common.constants';
import router from './router/Router';

// console.log(APP_GREETINGS);

window.onload = () => {
  main.init();
  speakit.init();
  audiocall.init();
  englishPuzzle.init();
  ourgame.init();
  savanna.init();
  sprint.init();
  // login.init();
  // register.init();

  // register.formValidation();
  // main.sayHello();
  // speakit.sayHello();
  // audiocall.sayHello();
  // englishPuzzle.sayHello();
  // ourgame.sayHello();
  // savanna.sayHello();
  // sprint.sayHello();
  // main.toggleBtnHandler();
};
router.run();

// router.run();
