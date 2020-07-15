const setMainStatistic = (answer) => {
  const { correctAnswer, wrongAnswer } = answer;

  const dailyCardCount = localStorage.getItem('userCardsCount');
  const dailyWordCount = localStorage.getItem('wordsPerDay');

  const date = new Date();

  const dailyMainStatistic = {
    date,
    cardsCount: 0,
    correctAnswers: 0,
    correctAnswersPercent: 0,
    wrongAnswers: 0,
    newWordsCount: 0,
    longestSeries: 0,
  };
};

export default setMainStatistic;
