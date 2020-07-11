const getCardsCount = () => {
  const formCardsCount = document.createElement('form');
  formCardsCount.setAttribute('id', 'user-cards-count');
  formCardsCount.className = 'form-inline';

  const formCardsGroup = document.createElement('div');
  formCardsGroup.className = 'form-group col-10';

  const formCardsIcon = document.createElement('i');
  formCardsIcon.className = 'fas col-1 fa-newspaper user-i';

  const formCardsLabel = document.createElement('label');
  formCardsLabel.setAttribute('for', 'set-user-cards-count');
  formCardsLabel.innerText = 'Количество карточек в день:';

  const cardsCount = document.createElement('span');
  cardsCount.setAttribute('id', 'show-cards-count');
  cardsCount.textContent = `${localStorage.getItem('userCardsCount')}`;

  const formCardsInput = document.createElement('input');
  formCardsInput.setAttribute('type', 'range');
  formCardsInput.setAttribute('id', 'set-user-cards-count');
  formCardsInput.setAttribute('min', '3');
  formCardsInput.setAttribute('max', '30');
  formCardsInput.className = 'form-control-range';
  formCardsInput.value = `${localStorage.getItem('userCardsCount')}`;

  formCardsGroup.append(formCardsLabel, cardsCount, formCardsInput);
  formCardsCount.append(formCardsIcon, formCardsGroup);

  return formCardsCount;
};
export default getCardsCount;
