export const renderResultsList = (wordsList, words, answers) => {
  let resultsList = '';
  answers.forEach((answer) => {
    const ind = words.indexOf(answer);
    resultsList += `<div><i class="fas fa-volume-up" data-audio="${wordsList[ind].audio}"></i><b>${answer}</b> - ${wordsList[ind].wordTranslate}</div>`;
  });
  return resultsList;
};

export const resultsScreenComponent = (wordsList, words, correctAnswers, wrongAnswers, points) => {
  const resultsScreen = `<div class="results-screen">
                            <div class="results-screen__content">
                              <div class="results">
                                <h2>${points} очков</h2>
                                <p>Ваш рекорд: X очков</p>
                                <div class="results__list">
                                  <span class="heading">Ошибки</span><span class="mark wrong">${wrongAnswers.length}</span>
                                  <div class="wrong-answers">
                                    ${renderResultsList(wordsList, words, wrongAnswers)}
                                  </div>
                                  <hr>
                                  <span class="heading">Правильные ответы</span><span class="mark correct">${correctAnswers.length}</span>
                                  <div class="correct-answers">
                                    ${renderResultsList(wordsList, words, correctAnswers)}
                                  </div>
                                </div>
                                <div class="results__buttons">
                                  <button type="button" class="btn">Статистика</button>
                                  <button type="button" class="btn train-again">Тренироваться ещё</button>
                                </div>
                              </div>
                            </div>
                      </div>`;
  return resultsScreen;
};
