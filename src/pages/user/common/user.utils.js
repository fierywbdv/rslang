import Toastify from 'toastify-js';
import { passwordIsValid } from '../../promo/common/promo.utils';
import { learnWordsAPIService } from '../../../services/learnWordsAPIService';
import { store } from '../../../redux/store';
import { disAutorization } from '../../promo/promo-redux/promo-actions';
import 'toastify-js/src/toastify.css';

export const clearRoot = () => {
  const root = document.querySelector('#root');
  if (root.firstChild) {
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
  }
};

export const getUserWordsCount = () => {
  const input = document.querySelector('#set-user-words-count');

  input.addEventListener('change', (event) => {
    const wordCount = document.querySelector('#show-words-count');
    wordCount.textContent = event.target.value;
  });
};

export const getUserLevel = () => {
  const input = document.querySelector('#set-user-level');

  input.addEventListener('change', (event) => {
    const userLevel = document.querySelector('#show-user-level');
    userLevel.textContent = event.target.value;
  });
};

export const getUserCardsCount = () => {
  const input = document.querySelector('#set-user-cards-count');

  input.addEventListener('change', (event) => {
    const wordCount = document.querySelector('#show-cards-count');
    wordCount.textContent = event.target.value;
  });
};

export const getCheckbox = (id, content, checked = false) => {
  const cardDiv = document.createElement('div');

  const cardCheck = document.createElement('input');
  cardCheck.setAttribute('type', 'checkbox');
  cardCheck.setAttribute('id', id);
  cardCheck.setAttribute('value', '');
  if (checked) { cardCheck.setAttribute('checked', ''); }
  cardCheck.className = 'form-check-input';
  const cardCheckLabel = document.createElement('label');
  cardCheckLabel.className = 'form-check-label';
  cardCheckLabel.setAttribute('for', id);
  cardCheckLabel.textContent = content;

  cardDiv.append(cardCheck, cardCheckLabel);
  return cardDiv;
};

const checkboxHandler = () => {
  const cardSettings = document.querySelector('.card-settings');
  const boxArr = Array.from(cardSettings.querySelectorAll('input'));
  const res = 1 + boxArr.findIndex((el) => el.checked);

  if (!res) {
    boxArr.forEach((box) => { box.classList.add('is-invalid'); });
  } else {
    boxArr.forEach((box) => { box.classList.remove('is-invalid'); });
  }
  return res;
};

export const getFormUser = (id, inputID, value, inputType, icon) => {
  const formUser = document.createElement('form');
  formUser.setAttribute('id', id);
  formUser.className = 'form-inline';

  const groupForm = document.createElement('div');
  groupForm.className = 'form-group col-12';

  const inputLabel = document.createElement('label');
  inputLabel.className = 'col-1 col-form-label';
  inputLabel.setAttribute('for', inputID);

  const inputIcon = document.createElement('i');
  inputIcon.className = 'fas user-i';
  inputIcon.classList.add(icon);
  inputLabel.append(inputIcon);

  const input = document.createElement('input');
  input.className = 'col-10';
  input.setAttribute('id', inputID);
  input.setAttribute('type', inputType);
  input.setAttribute('autocomplete', 'off');
  input.value = `${value}`;

  groupForm.append(inputLabel, input);
  formUser.append(groupForm);

  return formUser;
};

export const getSubmitButton = () => {
  const formButton = document.createElement('button');
  formButton.className = 'btn btn-outline-primary';
  formButton.setAttribute('type', 'submit');
  formButton.setAttribute('id', 'save-settings');

  const buttonIcon = document.createElement('i');
  buttonIcon.className = 'far fa-save';
  buttonIcon.textContent = ' сохранить настройки';
  formButton.append(buttonIcon);

  return formButton;
};

const mailIsValid = (mail) => {
  const regExp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  return regExp.test(mail);
};

const setAlarm = (element) => {
  const el = element;
  el.value = '';
  el.classList.add('is-invalid');
};

const resetAlarm = (element) => {
  const el = element;
  el.classList.remove('is-invalid');
};

const inputHandler = (element) => {
  element.addEventListener('focus', () => {
    resetAlarm(element);
  });
};

const settingsFormValidation = (userName, userPassword, userMail) => {
  let password = false;
  let mail = false;
  let name = false;

  if (passwordIsValid(userPassword.value)) {
    resetAlarm(userPassword);
    password = true;
  } else {
    setAlarm(userPassword);
  }

  if (mailIsValid(userMail.value)) {
    resetAlarm(userMail);
    mail = true;
  } else {
    setAlarm(userMail);
  }

  if (userName.value.length > 0) {
    resetAlarm(userName);
    name = true;
  } else {
    setAlarm(userName);
  }
  return password && mail && name;
};

export const saveSettingsHandler = () => {
  const saveButton = document.querySelector('#save-settings');
  saveButton.addEventListener('click', async () => {
    const userName = document.querySelector('#edit-user-name');
    const userMail = document.querySelector('#edit-user-mail');
    const userPassword = document.querySelector('#edit-user-pass');
    const userWordsCount = document.querySelector('#set-user-words-count').value;
    const userLevel = document.querySelector('#set-user-level').value;
    const userCardsCount = document.querySelector('#set-user-cards-count').value;
    const userSetTranslate = document.querySelector('#user-set-translate').checked;
    const userSetExplanation = document.querySelector('#user-set-explanation').checked;
    const userSetExample = document.querySelector('#user-set-example').checked;
    const userSetTranscription = document.querySelector('#user-set-transcription').checked;
    const userSetImage = document.querySelector('#user-set-image').checked;

    inputHandler(userMail);
    inputHandler(userPassword);
    inputHandler(userName);

    if (settingsFormValidation(userName, userPassword, userMail) && checkboxHandler()) {
      const userSettings = {
        userName: userName.value,
        userMail: userMail.value,
        userPassword: userPassword.value,
        userLevel,
        userWordsCount,
        userCardsCount,
        userSetTranslate,
        userSetExplanation,
        userSetExample,
        userSetTranscription,
        userSetImage,
      };
      try {
        const updateUser = await learnWordsAPIService.updateUser(localStorage.getItem('userId'), localStorage.getItem('token'), userSettings.userName, userSettings.userMail, userSettings.userPassword);
        const setUserSettings = await learnWordsAPIService.setUserSettings(localStorage.getItem('userId'), localStorage.getItem('token'), `${userWordsCount}`, {
          userCardsCount: userSettings.userCardsCount,
          userLevel: userSettings.userLevel,
          userSetTranslate: userSettings.userSetTranslate,
          userSetExplanation: userSettings.userSetExplanation,
          userSetExample: userSettings.userSetExample,
          userSetTranscription: userSettings.userSetTranscription,
          userSetImage: userSettings.userSetImage,
        });

        if (updateUser !== undefined) {
          Toastify({
            text: 'Settings was saved',
            backgroundColor: 'linear-gradient(to right, #036615, #03ab22)',
            className: 'info',
            position: 'right',
            gravity: 'top',
          }).showToast();

          localStorage.setItem('userName', userSettings.userName);
          localStorage.setItem('email', userSettings.userMail);
          localStorage.setItem('wordsPerDay', userSettings.userWordsCount);
          localStorage.setItem('userLevel', userSettings.userLevel);
          localStorage.setItem('userCardsCount', userSettings.userCardsCount);
          localStorage.setItem('userSetExample', userSettings.userSetExample);
          localStorage.setItem('userSetExplanation', userSettings.userSetExplanation);
          localStorage.setItem('userSetImage', userSettings.userSetImage);
          localStorage.setItem('userSetTranscription', userSettings.userSetTranscription);
          localStorage.setItem('userSetTranslate', userSettings.userSetTranslate);
        }
      } catch (error) {
        console.error(error);
      }
    }
    return true;
  });
};

export const deleteProfileHandler = () => {
  const deleteProfileBTN = document.querySelector('#delete-profile');

  deleteProfileBTN.addEventListener('click', async (e) => {
    e.preventDefault();
    const del = await learnWordsAPIService.deleteUser(localStorage.getItem('userId'), localStorage.getItem('token'));
    localStorage.setItem('userId', null);
    localStorage.setItem('token', null);
    localStorage.setItem('userName', null);
    localStorage.setItem('email', null);
    localStorage.setItem('authorized', false);
    localStorage.setItem('wordsPerDay', null);
    localStorage.setItem('userLevel', null);
    localStorage.setItem('userCardsCount', null);
    localStorage.setItem('userSetExample', null);
    localStorage.setItem('userSetExplanation', null);
    localStorage.setItem('userSetImage', null);
    localStorage.setItem('userSetTranscription', null);
    localStorage.setItem('userSetTranslate', null);
    localStorage.setItem('refreshToken', null);
    store.dispatch(disAutorization());
    document.location.href = '/';
  });
};
