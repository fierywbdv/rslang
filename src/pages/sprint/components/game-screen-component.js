export const gameScreenComponent = () => {
  const gameScreen = `<div class="game-screen">
                            <div class="game-screen__content">
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
                            </div>
                        </div>`;
  return gameScreen;
};
