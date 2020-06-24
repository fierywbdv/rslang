import { timeChartComponent } from './time-chart-component';
import { cardComponent } from './card-component';

export const gameScreenComponent = () => {
  const gameScreen = `<div class="game-screen">
                            <div class="game-screen__content">
                                <div class="choice">
                                    <div class="switches">
                                        <label for="level">Level</label>
                                        <input id="level" name="level" value="1" type="number" min="1" max="6" required>
                                        <label for="page">Page</label>
                                        <input id="page" name="page" value="1" type="number" min="1" max="60" required>
                                    </div>
                                    <span>Изученные слова</span>
                                </div>
                                <div class="current-state">
                                    <span class="points">100</span>${timeChartComponent()}
                                </div>
                                ${cardComponent()}
                                <div class="arrows">
                                    <div class="arrow"><i class="fas fa-long-arrow-alt-left"></i></div>
                                    <div class="arrow"><i class="fas fa-long-arrow-alt-right"></i></div>
                                </div>
                            </div>
                    </div>`;
  return gameScreen;
};
