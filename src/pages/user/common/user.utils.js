import { passwordIsValid } from '../../promo/common/promo.utils';

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
  inputLabel.className = 'col-2 col-form-label';
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

const settingsFormValidation = (userPassword, userMail) => {
  let password = false;
  let mail = false;

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
  return password && mail;
};

export const saveSettingsHandler = () => {
  const saveButton = document.querySelector('#save-settings');
  saveButton.addEventListener('click', () => {
    const userName = document.querySelector('#edit-user-name').value;
    const userMail = document.querySelector('#edit-user-mail');
    const userPassword = document.querySelector('#edit-user-pass');
    const userWordsCount = document.querySelector('#set-user-words-count').value;
    const userCardsCount = document.querySelector('#set-user-cards-count').value;
    const userSetTranslate = document.querySelector('#user-set-translate').checked;
    const userSetExplanation = document.querySelector('#user-set-explanation').checked;
    const userSetExample = document.querySelector('#user-set-example').checked;
    const userSetTranscription = document.querySelector('#user-set-transcription').checked;
    const userSetImage = document.querySelector('#user-set-image').checked;

    inputHandler(userMail);
    inputHandler(userPassword);

    if (settingsFormValidation(userPassword, userMail) && checkboxHandler()) {
      const userSettings = {
        userName,
        userMail: userMail.value,
        userPassword: userPassword.value,
        userWordsCount,
        userCardsCount,
        userSetTranslate,
        userSetExplanation,
        userSetExample,
        userSetTranscription,
        userSetImage,
      };
      return userSettings;
    }
  });
};

export const deleteProfileHandler = () => {
  const deleteProfileBTN = document.querySelector('#delete-profile');

  deleteProfileBTN.addEventListener('click', (e) => {
    e.preventDefault();
  });
};
