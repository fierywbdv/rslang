import main from './pages/main/main.app';
import speakit from './pages/speakit/speakit.app';
import englishPuzzle from './pages/english-puzzle/english-puzzle.app';
import savanna from './pages/savanna/savanna.app';

import router from './router/Router';
import { learnWordsAPIService } from './services/learnWordsAPIService';

window.onload = () => {
  speakit.init();
  englishPuzzle.init();
  savanna.init();
  main.toggleBtnHandler();
  main.menuHandler();
};

router.run();
