import main from './pages/main/main.app';
import speakit from './pages/speakit/speakit.app';
import audiocall from './pages/audiocall/audiocall.app';
import englishPuzzle from './pages/english-puzzle/english-puzzle.app';
import ourgame from './pages/ourgame/ourgame.app';
import savanna from './pages/savanna/savanna.app';
import sprint from './pages/sprint/sprint.app';
import register from './pages/login/register.app';

import router from './router/Router';

window.onload = () => {
  // main.init();
  speakit.init();
  audiocall.init();
  englishPuzzle.init();
  ourgame.init();
  savanna.init();
  sprint.init();
  register.init();
  main.toggleBtnHandler();
  main.menuHandler();
};
router.run();
