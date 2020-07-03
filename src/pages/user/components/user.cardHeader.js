const getCardHeader = () => {
  const userCardHeader = document.createElement('div');
  userCardHeader.className = 'card-header';

  const headerDiv = document.createElement('div');
  headerDiv.className = 'card-header-area';

  const headerText = document.createElement('h5');
  headerText.className = 'user-card-header';
  headerText.innerText = 'Настройка профиля';

  const headerIcon = document.createElement('i');
  headerIcon.className = 'fas fa-user-cog';

  headerDiv.append(headerIcon, headerText);
  userCardHeader.append(headerDiv);

  return userCardHeader;
};

export default getCardHeader;
