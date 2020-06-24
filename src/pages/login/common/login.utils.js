export const formStatusCodes = {
  unreliable: 'НЕНАДЕЖНЫЙ ПАРОЛЬ.',
  mismatched: 'ПАРОЛИ НЕ СОВПАДАЮТ.',
  incorrect: 'НЕВЕРНЫЙ ПАРОЛЬ.',
};

export const inputHandler = (inputs) => {
  inputs.forEach((input) => {
    input.addEventListener('focus', (e) => {
      const parent = e.target.parentNode;
      const label = parent.querySelector('label');
      label.classList.add('active');
    });
    input.addEventListener('blur', (e) => {
      if (input.value === '') {
        const parent = e.target.parentNode;
        const label = parent.querySelector('label');
        label.classList.remove('active');
      }
    });
  });
};

export const passwordIsValid = (password) => {
  console.log('password ', password);
  const regExp = /^(?=.*[A-Z].*[A-Z])(?=.*[+-_@$!%*?&#.,;:[\]{}])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
  return regExp.test(password);
};

export const setAlarm = (element, code) => {
  const el = element;
  el.value = '';
  el.classList.add('is-invalid');
  const parent = el.parentNode;
  const labelText = parent.querySelector('label span');
  labelText.innerText = `${formStatusCodes[code]} ПОВТОРИТЕ ПОПЫТКУ.`;
};

export const resetAlarm = (element) => {
  const el = element;
  el.classList.remove('is-invalid');
  const parent = el.parentNode;
  const labelText = parent.querySelector('label span');
  labelText.innerText = 'Пароль...';
};
