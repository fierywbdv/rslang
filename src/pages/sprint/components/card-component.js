export const cardComponent = () => {
  const card = `<div class="card hidden">
                    <div class="card__header">
                        <div class="card__circles">
                            <div class="circle"></div>
                            <div class="circle"></div>
                            <div class="circle"></div>
                        </div>
                        <p class="points-increase">+80 очков за слово</p>
                    </div>
                    <div class="card__main">
                        <p class="card__word"></p>
                        <p class="card__translation"></p>
                        <div class="card__result"></div>
                        <hr>
                    </div>
                    <div class="card__footer">
                        <button type="button" class="btn btn-danger">Неверно</button>
                        <button type="button" class="btn btn-success">Верно</button>
                    </div>
                </div>`;
  return card;
};
