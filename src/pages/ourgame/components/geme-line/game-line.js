const gameLine = (item, type) => {
  const { id, wordTranslate, word, audio, transcription } = item;
  const templateQuestion = `${word}`;
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
