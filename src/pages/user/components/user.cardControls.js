import { getCheckbox } from '../common/user.utils';
import { getDOMElement } from '../../main/common/main.helper';

const getCardControls = () => {
  const cardControlsDiv = getDOMElement('div', 'form-group col-11 card-controls');
  const cardControlsLabel = getDOMElement('label', 'col-xl-5 col-lg-4 form-control-label');

  const labelDiv = getDOMElement('div', 'label-div');
  const labelText = getDOMElement('p', 'label-text');
  labelText.innerText = 'Управление словами на карточках:';

  const labelIcon = getDOMElement('i', 'fas col-2 fa-cogs user-i');
  labelDiv.append(labelIcon, labelText);

  cardControlsLabel.append(labelDiv);

  const cardBoxDiv = getDOMElement('div', 'control-card-checkboxes col-12 col-sm-7');

  const cardOneDiv = getCheckbox('user-set-difficult', 'добавлять в "сложные слова"', localStorage.getItem('userAddDifficult') === 'true');
  const cardTwoDiv = getCheckbox('user-set-deleted', 'добавлять в "удаленные слова"', localStorage.getItem('userAddDeleted') === 'true');
  const cardTwoThree = getCheckbox('user-set-answer', 'показывать ответ', localStorage.getItem('userShowAnswer') === 'true');

  cardBoxDiv.append(cardOneDiv, cardTwoDiv, cardTwoThree);

  cardControlsDiv.append(cardControlsLabel, cardBoxDiv);

  return cardControlsDiv;
};

export default getCardControls;
