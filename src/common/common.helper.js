const Diff = require('diff');

const mainHelper = {
  checkSpell: (word, answer, elemId) => {
    const diff = Diff.diffChars(word, answer);
    const fragment = document.createDocumentFragment();
    diff.forEach((part) => {
      const span = document.createElement('span');
      span.style.color = part.added ? 'red' : part.removed ? 'red' : 'green';
      span.appendChild(document.createTextNode(part.value));
      fragment.appendChild(span);
    });
    elemId.value = fragment;
  },
};
export default mainHelper;
