const Diff = require('diff');

const mainHelper = {

  checkSpell: (word, answer, elemId) => {
    const diff = Diff.diffChars(word, answer);
    const display = document.querySelector(elemId);
    const fragment = document.createDocumentFragment();
    diff.forEach((part) => {
      // green for additions, red for deletions
      // grey for common parts
      const span = document.createElement('span');
      span.style.color = part.added ? 'red' : part.removed ? 'red' : 'grey';
      span.appendChild(document.createTextNode(part.value));
      fragment.appendChild(span);
    });

    console.log(fragment)
    display.appendChild(fragment);
  }
}

export default mainHelper;