export const getDOMElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

export const getButton = (data) => {
  const button = document.createElement('button');
  button.className = 'btn btn-outline-primary';
  button.setAttribute('type', 'submit');
  button.setAttribute('data', data);

  return button;
};
