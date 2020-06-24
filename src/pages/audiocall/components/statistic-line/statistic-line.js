const statisticLine = (item) => {
  const {
    id, wordTranslate, word, audio,
  } = item;
  const template = `<i class="fas fa-volume-up" data-audio="${audio}" aria-hidden="true"></i>${word} (${wordTranslate})`;
  const line = document.createElement('li');
  line.className = 'name';
  line.setAttribute('data-id', id);
  line.setAttribute('data-audio', audio);
  line.innerHTML = template;
  return line;
};

export default statisticLine;
