import './scss/login.styles.scss';
import { inputHandler } from './common/login.utils';

class Login {
  constructor() {
    this.inputHandler = inputHandler;
  }

  init() {
    this.loginInputs = Array.from(document.querySelectorAll('#login-form input'));
    inputHandler(this.loginInputs);
  }
}

export default new Login();
