const answerline = (item) => {
  const { id, wordTranslate } = item;
  const template = `<span id="${id}" class="icon" data-id="${id}"></span><span  class="name" data-id="${id}">${wordTranslate}</span>`;
  const line = document.createElement('div');
  line.className = 'name';
  line.setAttribute('data-id', id);
  line.innerHTML = template;
  return line;
};

export default answerline;
