import getCardHeader from './user.cardHeader';
import getCardFooter from './user.cardFooter';
import getCardBody from './user.cardBody';

const getUser = () => {
  const user = {
    userName: 'User',
    userMail: 'example@mail.com',
    userPassword: 'cwewWRWQ12313@#@#',
  };
  return user;
};

const getUserCard = () => {
  const user = getUser();
  const userCard = document.createElement('div');
  userCard.className = 'card settings-card col-xl-7 col-sm-8 col-lg-8 col-md-8 col-11';

  const userCardHeader = getCardHeader();
  const userCardBody = getCardBody(user);
  const userCardFooter = getCardFooter();

  userCard.append(userCardHeader, userCardBody, userCardFooter);
  return userCard;
};

const getUserSettings = () => {
  const userContainer = document.createElement('div');
  userContainer.className = 'container-fluid';

  const userRow = document.createElement('div');
  userRow.className = 'row justify-content-center';

  const userCard = getUserCard();
  userRow.append(userCard);
  userContainer.append(userRow);

  return userContainer;
};

export const renderUserScreen = () => {
  const root = document.querySelector('#root');
  const card = getUserSettings();
  root.append(card);
};
