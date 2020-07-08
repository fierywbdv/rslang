const notationActionHandler = () => {
  const settingsBTN = document.querySelector('#notation-settings');
  const learningBTN = document.querySelector('#notation-continue');
  const overlay = document.querySelector('#notation-overlay');
  const notation = document.querySelector('#notation-body');

  if (settingsBTN) {
    settingsBTN.addEventListener('click', () => {
      overlay.parentNode.removeChild(overlay);
      notation.parentNode.removeChild(notation);
      window.location.href = '#user';
    });
  }

  if (learningBTN) {
    learningBTN.addEventListener('click', () => {
      overlay.parentNode.removeChild(overlay);
      notation.parentNode.removeChild(notation);
      window.location.href = '#main';
    });
  }
};
export default notationActionHandler;
