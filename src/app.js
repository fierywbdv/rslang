import main from './components/main/main.app';
import speakit from './components/speakit/speakit.app';
import audiocall from './components/audiocall/audiocall.app';
import englishPuzzle from './components/english-puzzle/english-puzzle.app';
import ourgame from './components/ourgame/ourgame.app';
import savanna from './components/savanna/savanna.app';
import sprint from './components/sprint/sprint.app';

import { APP_GREETINGS } from './common/common.constants';

console.log(APP_GREETINGS);

window.onload = () => {
  main.init();
  speakit.init();
  audiocall.init();
  englishPuzzle.init();
  ourgame.init();
  savanna.init();
  sprint.init();
  main.sayHello();
  speakit.sayHello();
  audiocall.sayHello();
  englishPuzzle.sayHello();
  ourgame.sayHello();
  savanna.sayHello();
  sprint.sayHello();
};
