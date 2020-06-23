import { timeChartComponent } from './time-chart-component';

export const gameScreenComponent = () => {
  const gameScreen = `<div class="game-screen">
                            <div class="game-screen__content">
                                <div class="current-state">
                                    <span class="points">100</span>${timeChartComponent()}
                                </div>
                                <div class="card">
                                    <div class="card__header">
                                        <div class="card__circles">
                                            <div class="circle"></div>
                                            <div class="circle"></div>
                                            <div class="circle"></div>
                                        </div>
                                        <p class="points-increase">+80 очков за слово</p>
                                    </div>
                                    <div class="card__main">
                                        <p class="card__word">world</p>
                                        <p class="card__translation">мир</p>
                                        <div class="card__result"><i class="fas fa-check"></i></div>
                                        <hr>
                                    </div>
                                    <div class="card__footer">
                                        <button type="button" class="btn btn-danger">Неверно</button>
                                        <button type="button" class="btn btn-success">Верно</button>
                                    </div>
                                </div>
                                <div class="arrows">
                                    <div class="arrow"><i class="fas fa-long-arrow-alt-left"></i></div>
                                    <div class="arrow"><i class="fas fa-long-arrow-alt-right"></i></div>
                                </div>
                            </div>
                    </div>`;
  return gameScreen;
};
