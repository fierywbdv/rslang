const getWordsCount = () => {
  const formWordCount = document.createElement('form');
  formWordCount.setAttribute('id', 'user-words-count');
  formWordCount.className = 'form-inline';

  const formWordGroup = document.createElement('div');
  formWordGroup.className = 'form-group col-10';

  const formWordIcon = document.createElement('i');
  formWordIcon.className = 'fas col-1 fa-book user-i';

  const formWordLabel = document.createElement('label');
  formWordLabel.setAttribute('for', 'set-user-words-count');
  formWordLabel.innerText = 'Количество новых слов в день:';

  const wordCount = document.createElement('span');
  wordCount.setAttribute('id', 'show-words-count');
  wordCount.textContent = '10';

  const formWordInput = document.createElement('input');
  formWordInput.setAttribute('type', 'range');
  formWordInput.setAttribute('id', 'set-user-words-count');
  formWordInput.setAttribute('min', '5');
  formWordInput.setAttribute('max', '15');
  formWordInput.className = 'form-control-range';
  formWordInput.value = '10';

  formWordGroup.append(formWordLabel, wordCount, formWordInput);
  formWordCount.append(formWordIcon, formWordGroup);

  return formWordCount;
};

export default getWordsCount;
