export const shuffle = (array) => array.sort(() => Math.random() - 0.5);

export const toggleCirclesNumber = () => {
  document.querySelector('.card__circles').firstElementChild.classList.toggle('hidden');
  document.querySelector('.card__circles').lastElementChild.classList.toggle('hidden');
};

export const cleanCircles = () => {
  Array.from(document.querySelectorAll('.circle')).forEach((item) => {
    const circle = item;
    circle.innerHTML = '';
    circle.classList.remove('correct');
  });
};
