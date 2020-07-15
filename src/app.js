import main from './pages/main/main.app';
import englishPuzzle from './pages/english-puzzle/english-puzzle.app';

import router from './router/Router';
import { logout } from './pages/promo/common/promo.utils';

window.onload = () => {
  englishPuzzle.init();
  main.toggleBtnHandler();
  main.menuHandler();
  logout();
};

router.run();
