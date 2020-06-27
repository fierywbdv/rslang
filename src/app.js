import main from './pages/main/main.app';
import router from './router/Router';

window.onload = () => {
  main.init();
  main.toggleBtnHandler();
  main.menuHandler();
};

router.run();
