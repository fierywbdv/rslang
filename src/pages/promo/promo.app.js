import './scss/promo.styles.scss';
import {
  inputHandler,
  startButtonHandler,
  overlayHandler,
  closeBTNHandler,
  loginHandler,
  registerHandler,
  formValidation,
} from './common/promo.utils';

window.onload = () => {
  startButtonHandler();
  inputHandler();
  overlayHandler();
  closeBTNHandler();
  loginHandler();
  registerHandler();
  formValidation();
};
