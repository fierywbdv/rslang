import main from './pages/main/main.app';
import speakit from './pages/speakit/speakit.app';
import englishPuzzle from './pages/english-puzzle/english-puzzle.app';
import ourgame from './pages/ourgame/ourgame.app';
import savanna from './pages/savanna/savanna.app';


import router from './router/Router';

window.onload = () => {
  speakit.init();
  englishPuzzle.init();
  ourgame.init();
  main.toggleBtnHandler();
  main.menuHandler();
};

router.run();
