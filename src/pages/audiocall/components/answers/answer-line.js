const answerline = (item) => {
  const { id, wordTranslate } = item;
  const template = `<span class="icon"></span><span class="text" data-id="${id}">${wordTranslate}</span>`;
  const line = document.createElement('div');
  line.className = 'name';
  line.setAttribute('data-id', id);
  line.innerHTML = template;
  return line;
};

export default answerline;
