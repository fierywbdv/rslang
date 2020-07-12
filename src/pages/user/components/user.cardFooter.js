const getCardFooter = () => {
  const userCardFooter = document.createElement('div');
  userCardFooter.className = 'card-footer';

  const footerDiv = document.createElement('div');
  footerDiv.className = 'card-footer-area';

  const footerBTN = document.createElement('button');
  footerBTN.className = 'btn btn-outline-danger';
  footerBTN.setAttribute('type', 'button');
  footerBTN.setAttribute('id', 'delete-profile');

  const footerIcon = document.createElement('i');
  footerIcon.className = 'fas fa-user-times';
  footerIcon.textContent = ' удалить профиль';

  footerBTN.append(footerIcon);

  footerDiv.append(footerBTN);
  userCardFooter.append(footerDiv);

  return userCardFooter;
};

export default getCardFooter;
