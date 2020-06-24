import './scss/login.styles.scss';
import {
  inputHandler, passwordIsValid, setAlarm, resetAlarm,
} from './common/login.utils';

class Register {
  constructor() {
    this.inputHandler = inputHandler;
    this.passwordIsValid = passwordIsValid;
    this.setAlarm = setAlarm;
    this.resetAlarm = resetAlarm;
  }

  init() {
    this.registerInputs = Array.from(document.querySelectorAll('#register-form input'));
    console.log(this.registerInputs);
    console.log('Оно рабоооотает!');
    inputHandler(this.registerInputs);
    this.formValidation(this.registerInputs);
  }

  formValidation() {
    this.registerForm = document.querySelector('#register-form');
    this.password = document.querySelector('#register-password');
    this.passwordConfirm = document.querySelector('#confirm-register-password');

    this.registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (passwordIsValid(this.password.value)) {
        resetAlarm(this.password);
        if (this.password.value === this.passwordConfirm.value) {
          this.passwordConfirm.classList.remove('is-invalid');
          this.registerForm.submit();
        } else {
          setAlarm(this.passwordConfirm, 'mismatched');
        }
      } else {
        setAlarm(this.password, 'unreliable');
      }
    });
  }
}

export default new Register();
