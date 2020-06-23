import './scss/login.styles.scss';
import { inputHandler } from './common/login.utils';

class Register {
  constructor() {
    this.inputHandler = inputHandler;
  }

  init() {
    this.registerInputs = Array.from(document.querySelectorAll('#register-form input'));
    inputHandler(this.registerInputs);
  }
}

export default new Register();
