import { getFormUser, getSubmitButton } from '../common/user.utils';
import getUserLevelForm from './user.level';
import getCardsCount from './user.cardsCount';
import getWordsCount from './user.wordsCount';
import getCardSettings from './user.cardSettings';

const getCardBody = (user) => {
  const { userName, userMail, userPassword } = user;

  const userCardBody = document.createElement('div');
  userCardBody.className = 'card-body';
  userCardBody.setAttribute('id', 'card-body');

  const userNameForm = getFormUser('edit-user-name-form', 'edit-user-name', userName, 'Text', 'fa-user');
  const userMailForm = getFormUser('edit-user-mail-form', 'edit-user-mail', userMail, 'Email', 'fa-envelope');
  const userPasswordForm = getFormUser('edit-user-pass-form', 'edit-user-pass', userPassword, 'Password', 'fa-unlock-alt');
  const userLevel = getUserLevelForm();
  const userWordCount = getWordsCount();
  const userCardsCount = getCardsCount();
  const userCardSettings = getCardSettings();
  const submitButton = getSubmitButton();

  const buttonArea = document.createElement('div');
  buttonArea.className = 'row row-btn';
  buttonArea.append(submitButton);

  userCardBody.append(userNameForm,
    userMailForm,
    userPasswordForm,
    userLevel,
    userWordCount,
    userCardsCount,
    userCardSettings,
    buttonArea);

  return userCardBody;
};
export default getCardBody;
