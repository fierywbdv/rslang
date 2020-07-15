import main from './pages/main/main.app';
import englishPuzzle from './pages/english-puzzle/english-puzzle.app';

import router from './router/Router';
import { logout } from './pages/promo/common/promo.utils';
import mainHelper from './common/common.helper';


window.onload = () => {
  englishPuzzle.init();
  main.toggleBtnHandler();
  main.menuHandler();
  logout();
};

router.run();

const time = setTimeout(() => {
    mainHelper.checkSpell('accounting', 'accuountg', '#root')
}, 6000)
