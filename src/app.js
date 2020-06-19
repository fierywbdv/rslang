import main from './pages/main/main.app';
import speakit from './pages/speakit/speakit.app';
import audiocall from './pages/audiocall/audiocall.app';
import englishPuzzle from './pages/english-puzzle/english-puzzle.app';
import ourgame from './pages/ourgame/ourgame.app';
import savanna from './pages/savanna/savanna.app';
import sprint from './pages/sprint/sprint.app';

import { APP_GREETINGS } from './common/common.constants';
import router from './router/Router';

console.log(APP_GREETINGS);

window.onload = () => {
  main.init();
  speakit.init();
  englishPuzzle.init();
  ourgame.init();
  savanna.init();
  sprint.init();
};

router.run();
