const helper = {
  render: (elementDOM, renderElement, renderPlace, removeItem) => {
    if (removeItem && document.querySelector(removeItem)) {
      document.querySelector(removeItem).remove();
    }
    switch (renderPlace) {
      case 'prepend':
        document.querySelector(elementDOM).prepend(renderElement);
        break;
      case 'before':
        document.querySelector(elementDOM).before(renderElement);
        break;
      case 'after':
        document.querySelector(elementDOM).after(renderElement);
        break;
      case 'append':
        document.querySelector(elementDOM).append(renderElement);
        break;
      default:
        document.querySelector(elementDOM).append(renderElement);
        break;
    }
  },

  getAnswers: (data) => {
    const newData = data.map((item, index, array) => {
      const newArr = array.filter((elem) => elem.id !== item.id);
      const answers = [];
      answers.push(item);
      for (let i = 4; i !== 0; i--) {
        answers.push(helper.shuffle(newArr).pop());
      }
      const shuffleAnswers = helper.shuffle(answers);
      return {
        ...item,
        answer: shuffleAnswers,
      };
    });
    return newData;
  },

  randomInteger: (min, max) => {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  },

  shuffle: (array) => array.sort(() => Math.random() - 0.5),

  isLastQuestion: (num, points) => points.some((elem) => elem === num),

  filterStatistic: (correct, mistake, gameNumber) => {
    const correctAnswers = correct.filter((item) => item.gameNum === gameNumber);
    const mistakeAnswers = mistake.filter((item) => item.gameNum === gameNumber);
    const sortCorrect = correctAnswers.filter((item) => mistakeAnswers.every((elem) => item.id !== elem.id));
    const uniqueMistake = Array.from(new Set(mistakeAnswers.map((a) => a.id))).map((id) => mistakeAnswers.find((a) => a.id === id));

    return {
      cor: sortCorrect,
      miss: uniqueMistake,
    };
  },

  setOpacity: (value) => {
    const body = document.querySelector('body');
    switch (value) {
      case 0:
      case 10:
        body.className = 'audio-call-body op-1';
        break;
      case 1:
      case 11:
        body.className = 'audio-call-body op-2';
        break;
      case 2:
      case 12:
        body.className = 'audio-call-body op-3';
        break;
      case 3:
      case 13:
        body.className = 'audio-call-body op-4';
        break;
      case 4:
      case 14:
        body.className = 'audio-call-body op-5';
        break;
      case 5:
      case 15:
        body.className = 'audio-call-body op-6';
        break;
      case 6:
      case 16:
        body.className = 'audio-call-body op-7';
        break;
      case 7:
      case 17:
        body.className = 'audio-call-body op-8';
        break;
      case 8:
      case 18:
        body.className = 'audio-call-body op-9';
        break;
      case 9:
      case 19:
        body.className = 'audio-call-body op-9';
        break;
      default:
        body.className = 'audio-call-body';
        break;
    }
  },
};

export default helper;
