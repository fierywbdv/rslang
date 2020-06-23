export const inputHandler = (inputs) => {
  inputs.forEach((input) => {
    input.addEventListener('focus', (e) => {
      const label = e.target.nextElementSibling;
      label.classList.add('active');
    });
    input.addEventListener('blur', (e) => {
      if (input.value === '') {
        const label = e.target.nextElementSibling;
        label.classList.remove('active');
      }
    });
  });
};
