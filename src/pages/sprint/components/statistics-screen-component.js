export const statisticsResultsList = (statistics) => {
  let statisticsList = '';
  statistics.forEach((data) => {
    statisticsList += `<div>${data.date} — <b>${data.points} баллов</b></div>`;
  });
  return statisticsList;
};

export const statisticsScreenComponent = (statistics) => {
  const resultsScreen = `<div class="statistics-screen">
                            <div class="statistics-screen__content">
                              <div class="statistics">
                                <p>Вы играли в игру "Спринт" ${statistics.length} раз(а)</p>
                                <div class="statistics__list">
                                  ${statisticsResultsList(statistics)}
                                </div>
                                <div class="statistics__button">
                                  <button type="button" class="btn train-again">Тренироваться ещё</button>
                                </div>
                              </div>
                            </div>
                      </div>`;
  return resultsScreen;
};
