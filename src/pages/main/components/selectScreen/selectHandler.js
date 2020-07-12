const selectHandler = () => {
  const selectArea = document.querySelector('.select-screen-body');
  const selectButtons = Array.from(selectArea.getElementsByTagName('button'));

  selectButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const type = e.target.getAttribute('data');
      document.location.href = '#main';
      localStorage.setItem('typeOfGame', type);
    });
  });
};
export default selectHandler;
