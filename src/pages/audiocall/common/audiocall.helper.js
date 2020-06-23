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
};

export default helper;
