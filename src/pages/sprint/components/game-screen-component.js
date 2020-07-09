import { timeChartComponent } from './time-chart-component';
import { cardComponent } from './card-component';

export const gameScreenComponent = () => {
  const gameScreen = `<div class="sprint-wrapper bg">
                        <div class="game-screen">
                            <div class="game-screen__content">
                                <div class="choice">
                                    <div class="switches">
                                        <label for="level">Уровень</label>
                                        <input id="level" name="level" value="1" type="number" min="1" max="6" required>
                                        <label for="round">Раунд</label>
                                        <input id="round" name="round" value="1" type="number" min="1" max="30" required>
                                    </div>
                                    <span>Изученные слова</span>
                                </div>
                                <div class="current-state hidden">
                                    <span class="points">0</span>${timeChartComponent()}
                                </div>
                                ${cardComponent()}
                                <div class="arrows hidden">
                                    <div class="arrow"><i class="fas fa-long-arrow-alt-left"></i></div>
                                    <div class="arrow"><i class="fas fa-long-arrow-alt-right"></i></div>
                                </div>
                                <button type="button" class="btn btn-lg start-game">Старт</button>
                            </div>
                        </div>
                    </div>`;
  return gameScreen;
};
