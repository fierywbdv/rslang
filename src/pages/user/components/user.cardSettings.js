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
  cardBoxDiv.className = 'col-8 col-lg-7';

  const cardOneDiv = getCheckbox('user-set-translate', 'перевод слова', localStorage.getItem('userSetTranslate') === 'true', 'check-required');
  const cardTwoDiv = getCheckbox('user-set-explanation', 'предложение с объяснением значения слова', localStorage.getItem('userSetExplanation') === 'true', 'check-required');
  const cardThreeDiv = getCheckbox('user-set-explanation-translate', 'перевод предложения с объяснением значения слова', localStorage.getItem('userSetExplanationTranslate') === 'true');
  const cardFourDiv = getCheckbox('user-set-example', 'предложение с примером использования слова', localStorage.getItem('userSetExample') === 'true', 'check-required');
  const cardFiveDiv = getCheckbox('user-set-example-translate', 'перевод предложения с примером использования слова', localStorage.getItem('userSetExampleTranslate') === 'true');
  const cardSixDiv = getCheckbox('user-set-transcription', 'транскрипция слова', localStorage.getItem('userSetTranscription') === 'true');
  const cardSevenDiv = getCheckbox('user-set-image', 'показывать изображение', localStorage.getItem('userSetImage') === 'true');

  cardBoxDiv.append(cardOneDiv, cardTwoDiv, cardThreeDiv, cardFourDiv, cardFiveDiv, cardSixDiv, cardSevenDiv);

  cardSettingsDiv.append(cardSettingsLabel, cardBoxDiv);

  return cardSettingsDiv;
};

export default getCardSettings;
