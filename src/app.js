import main from './pages/main/main.app';
import englishPuzzle from './pages/english-puzzle/english-puzzle.app';
import ourgame from './pages/ourgame/ourgame.app';
import savanna from './pages/savanna/savanna.app';

import router from './router/Router';
import { logout } from './pages/promo/common/promo.utils';
import { learnWordsAPIService } from './services/learnWordsAPIService';

window.onload = () => {
  englishPuzzle.init();
  ourgame.init();
  savanna.init();
  main.toggleBtnHandler();
  main.menuHandler();
  logout();
};

router.run();

//learnWordsAPIService.getUserSettings(localStorage.getItem('userId'), 'dsasdf');