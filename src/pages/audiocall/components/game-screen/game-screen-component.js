import answerline from '../answers';

const gameScreenComponent = (data) => {
  const {
    id, word, image, answer, audio, transcription,
  } = data;
  const generateAnswerLines = (answers = []) => {
    const answerElements = [];
    answers.forEach((item, index) => {
      answerElements.push(answerline(item, index));
    });
    return answerElements;
  };
  const template = `<div class="cover">
                      <img src="https://raw.githubusercontent.com/irinainina/rslang-data/master/${image}" 
                      class="profile prof-img">
                      <i class="fas fa-volume-up profile play-audio" data-audio="${audio}" aria-hidden="true"></i>
                    </div>
                    <div class="answers-group" >
                      <div class="result-word" data-audio="${audio}" data-word-id="${id}"><span>${word}</span></div>
                      <div class="result-translate">${transcription}</div>
                    </div>`;

  const buttonsTemplate = `<button class="next btn btn-success">Далее</button>
                           <button class="forget btn btn-success">Не помню</button>
                           <button class="reset  btn btn-success">Остановить Игру</button>`;
  const startScreen = document.createElement('div');
  startScreen.setAttribute('id', 'play-screen');
  startScreen.className = 'container screen';

  const frontFace = document.createElement('div');
  frontFace.className = 'front-face';
  frontFace.innerHTML = template;

  const answerList = document.createElement('div');
  answerList.className = 'answers';
  generateAnswerLines(answer).forEach((item) => answerList.append(item));
  frontFace.append(answerList);

  const buttons = document.createElement('div');
  buttons.className = 'buttons';
  buttons.innerHTML = buttonsTemplate;
  frontFace.append(buttons);
  startScreen.append(frontFace);
  return startScreen;
};

export default gameScreenComponent;
