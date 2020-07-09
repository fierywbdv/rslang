const gameLine = (item, type, kind) => {
  const {
    id, wordTranslate, word, audio, transcription,
  } = item;
  const templateQuestion = `${word} ${(kind === 'withUserWords')
    ? `<i data-id="${id}" class="far fa-trash-alt remove-word"></i>`
    : `<i data-id="${id}" class="fas fa-plus add"></i>`}`;
  const templateAnswer = `${wordTranslate}`;
  const line = document.createElement('li');
  line.className = 'name';
  line.setAttribute('data-id', id);
  line.setAttribute('data-audio', audio);
  line.setAttribute('data-transcription', transcription);
  line.innerHTML = type === 'question' ? templateQuestion : templateAnswer;
  return line;
};

export default gameLine;
