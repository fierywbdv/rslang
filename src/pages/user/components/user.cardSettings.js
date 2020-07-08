import { getCheckbox } from '../common/user.utils';

const getCardSettings = () => {
  const cardSettingsDiv = document.createElement('div');
  cardSettingsDiv.className = 'form-group col-11 card-settings';

  const cardSettingsLabel = document.createElement('label');
  cardSettingsLabel.className = 'col-xl-5 col-lg-4 form-control-label';

  const labelDiv = document.createElement('div');
  labelDiv.className = 'label-div';
  const labelText = document.createElement('p');
  labelText.className = 'label-text';
  labelText.innerText = 'Информация на карточках:';

  const labelIcon = document.createElement('i');
  labelIcon.className = 'fas col-2 fa-file-invoice user-i';
  labelDiv.append(labelIcon, labelText);

  cardSettingsLabel.append(labelDiv);

  const cardBoxDiv = document.createElement('div');
  cardBoxDiv.className = 'col-xl-7 col-lg-8';

  const cardOneDiv = getCheckbox('user-set-translate', 'перевод слова', localStorage.getItem('userSetTranslate') === 'true' ? true : false);
  const cardTwoDiv = getCheckbox('user-set-explanation', 'предложение с объяснением значения слова', localStorage.getItem('userSetExplanation') === 'true' ? true : false);
  const cardThreeDiv = getCheckbox('user-set-example', 'предложение с примером использования слова',localStorage.getItem('userSetExample') === 'true' ? true : false);
  const cardFourDiv = getCheckbox('user-set-transcription', 'транскрипция слова',localStorage.getItem('userSetTranscription') === 'true' ? true : false);
  const cardFiveDiv = getCheckbox('user-set-image', 'показывать изображение',localStorage.getItem('userSetImage') === 'true' ? true : false);

  cardBoxDiv.append(cardOneDiv, cardTwoDiv, cardThreeDiv, cardFourDiv, cardFiveDiv);

  cardSettingsDiv.append(cardSettingsLabel, cardBoxDiv);

  return cardSettingsDiv;
};

export default getCardSettings;
