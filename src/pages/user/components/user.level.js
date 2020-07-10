const getUserLevelForm = () => {
  const formUserLevel = document.createElement('form');
  formUserLevel.setAttribute('id', 'user-level');
  formUserLevel.className = 'form-inline';

  const formLevelGroup = document.createElement('div');
  formLevelGroup.className = 'form-group col-10';

  const formLevelIcon = document.createElement('i');
  formLevelIcon.className = 'fas col-1 fa-balance-scale-left user-i';

  const formLevelLabel = document.createElement('label');
  formLevelLabel.setAttribute('for', 'set-user-level');
  formLevelLabel.innerText = 'Ваш уровень знания языка?';

  const userLevel = document.createElement('span');
  userLevel.setAttribute('id', 'show-user-level');
  userLevel.textContent = `${localStorage.getItem('userLevel') || 0}`;

  const formLevelInput = document.createElement('input');
  formLevelInput.setAttribute('type', 'range');
  formLevelInput.setAttribute('id', 'set-user-level');
  formLevelInput.setAttribute('min', '0');
  formLevelInput.setAttribute('max', '5');
  formLevelInput.className = 'form-control-range';
  formLevelInput.value = `${localStorage.getItem('userLevel') || 0}`;

  formLevelGroup.append(formLevelLabel, userLevel, formLevelInput);
  formUserLevel.append(formLevelIcon, formLevelGroup);

  return formUserLevel;
};
export default getUserLevelForm;
