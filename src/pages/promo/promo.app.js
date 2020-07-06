import './scss/promo.styles.scss';
import {
  inputHandler,
  startButtonHandler,
  overlayHandler,
  closeBTNHandler,
  loginHandler,
  registerHandler,
  formValidation,
  loginForm,
} from './common/promo.utils';
import { store } from '../../redux/store';

if(store.getState().promoReducer.authorized === 'true') {
  document.location.href = "/main.index.html";
}

window.onload = () => {
  startButtonHandler();
  inputHandler();
  overlayHandler();
  closeBTNHandler();
  loginHandler();
  registerHandler();
  formValidation();
  loginForm();
};

store.subscribe(() => {
  const state = store.getState().promoReducer;

  if(state.authorized === false) {
    localStorage.setItem('authorized', false)
    document.location.href = "/";
  } else if(state.authorized === true) {
    localStorage.setItem('authorized', true)
    document.location.href = "/main.index.html";
  }
})
