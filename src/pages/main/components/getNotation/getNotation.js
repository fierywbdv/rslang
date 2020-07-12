import { getDOMElement } from '../../common/main.helper';
import notationActionHandler from './notationHandler';

const getNotation = () => {
  const overlay = getDOMElement('div', 'main-screen-overlay');
  overlay.setAttribute('id', 'notation-overlay');
  const notationRow = getDOMElement('div', 'notation-row justify-content-center');
  notationRow.setAttribute('id', 'notation-body');
  const notationCol = getDOMElement('div', 'main-screen-popup col-11 col-sm-10 col-md-8 col-lg-7 col-xl-6');
  const notationHeader = getDOMElement('div', 'notation-header');

  const notationHeaderLogo = getDOMElement('div', 'notation-header_logo col-md-3 col-sm-4 col-5');
  const headerLogo = getDOMElement('img', '');
  headerLogo.src = './assets/img/logo_light.png';
  headerLogo.setAttribute('width', '30');
  headerLogo.setAttribute('height', '30');
  headerLogo.setAttribute('alt', 'logo');
  headerLogo.setAttribute('loading', 'lazy');
  const logoText = getDOMElement('div', 'notation-logo-text brand-text d-inline-block');
  const logoContent = '<span>RS</span><span class="colored">Lang</span>';
  logoText.innerHTML = logoContent;

  const notationHeaderH4 = getDOMElement('h4', 'notation-header-h4 col-md-8 col-sm-6 col-8');
  notationHeaderH4.textContent = 'Поздравляем!';

  notationHeaderLogo.append(headerLogo, logoText);
  notationHeader.append(notationHeaderLogo, notationHeaderH4);

  const notationText = getDOMElement('div', 'notation-text');
  notationText.textContent = `Вы выполнили свою дневную норму по количеству карточек!
  Вы можете увеличить количество карточек в настройках, либо можете продолжить обучение.`;

  const notationFooter = getDOMElement('div', 'notation-footer');

  const notationBTNSettings = getDOMElement('button', 'btn btn-outline-primary');
  notationBTNSettings.setAttribute('type', 'button');
  notationBTNSettings.setAttribute('id', 'notation-settings');

  const settingsBTNIcon = document.createElement('i');
  settingsBTNIcon.className = 'fas fa-user-cog';
  settingsBTNIcon.textContent = ' настройки';

  notationBTNSettings.append(settingsBTNIcon);

  const notationBTNSelect = getDOMElement('button', 'btn btn-outline-primary');
  notationBTNSelect.setAttribute('type', 'button');
  notationBTNSelect.setAttribute('id', 'notation-select');

  const selectBTNIcon = document.createElement('i');
  selectBTNIcon.className = 'fas fa-sync-alt';
  selectBTNIcon.textContent = ' выбор задачи';

  notationBTNSelect.append(selectBTNIcon);

  const notationBTNContinue = getDOMElement('button', 'btn btn-outline-primary');
  notationBTNContinue.setAttribute('type', 'button');
  notationBTNContinue.setAttribute('id', 'notation-continue');

  const continueBTNIcon = document.createElement('i');
  continueBTNIcon.className = 'fas fa-graduation-cap';
  continueBTNIcon.textContent = ' учить ещё';

  notationBTNContinue.append(continueBTNIcon);

  notationFooter.append(notationBTNSettings, notationBTNSelect, notationBTNContinue);
  notationCol.append(notationHeader, notationText, notationFooter);

  notationRow.append(notationCol);
  const root = document.querySelector('.header');
  root.append(overlay, notationRow);

  notationActionHandler();
};

export default getNotation;
