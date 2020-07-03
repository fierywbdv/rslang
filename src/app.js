import main from './pages/main/main.app';
import englishPuzzle from './pages/english-puzzle/english-puzzle.app';
import ourgame from './pages/ourgame/ourgame.app';
import savanna from './pages/savanna/savanna.app';

import router from './router/Router';

window.onload = () => {
  englishPuzzle.init();
  ourgame.init();
  savanna.init();
  main.toggleBtnHandler();
  main.menuHandler();
};

router.run();
