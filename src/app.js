import main from './pages/main/main.app';
import speakit from './pages/speakit/speakit.app';
import englishPuzzle from './pages/english-puzzle/english-puzzle.app';
import savanna from './pages/savanna/savanna.app';
import sprint from './pages/sprint/sprint.app';


import router from './router/Router';

window.onload = () => {
  speakit.init();
  englishPuzzle.init();
  savanna.init();
  main.toggleBtnHandler();
  main.menuHandler();
};

router.run();
