const answerline = (item, index) => {
  const { id, wordTranslate } = item;
  const template = `<span id="${id}" class="icon" data-id="${id}"></span>
                    <span data-number="${index + 1}" data-id="${id}" class="answer-number-${index + 1}">${index + 1}.</span> 
                    <span  class="name" data-id="${id}"> ${wordTranslate}</span>`;
  const line = document.createElement('button');
  line.className = 'name';
  line.setAttribute('data-id', id);
  line.innerHTML = template;
  return line;
};

export default answerline;
