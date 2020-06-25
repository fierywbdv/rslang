export default function makePage() {
  const pageWiew = document.querySelector('#root');
  pageWiew.innerHTML += `
    <div class="body-speakit overflow-hidden">
        <div class="centralizer hidden">
          <div class="header">
          </div>
          <div class="main">
            <div class="game__controls">
              <div class="buttons__wrapper">
                <div class="difficulties">
                  <span class="difficult__description">Уровень:</span>
                  <button class="game__difficult game__difficult-1 button-rounded active">1</button>
                  <button class="game__difficult game__difficult-2 button-rounded">2</button>
                  <button class="game__difficult game__difficult-3 button-rounded">3</button>
                  <button class="game__difficult game__difficult-4 button-rounded">4</button>
                  <button class="game__difficult game__difficult-5 button-rounded">5</button>
                  <button class="game__difficult game__difficult-6 button-rounded">6</button>
                </div>
                <div class="button__container">
                  <button class="game__button game__button-new button-rounded">Новая игра</button>
                  <button class="game__button game__button-start button-rounded">Начать игру</button>
                  <button class="game__button game__button-stop button-rounded">Остановить игру</button>
                  <button class="game__button game__button-results button-rounded">Результаты</button>
                </div>
              </div>
              <p class="status-bar"></p>
            </div>
    
            <div class="main-card">
              <div>
                <p class="main-card__translation"></p>
                <input class="main-card__speech-input input" type="text" readonly> <!-- readonly -->
              </div>
              <div class="picture__container">
                <img class="main-card__picture" alt="current word picture">
              </div>
            </div>
    
            <div class="cards__container">
            </div>
    
            <div class="results__container">
              <div class="button__container-results">
                <button class="game__button game__button-results_return button-rounded">Вернуться</button>
                <button class="game__button game__button-results_new button-rounded">Новая игра</button>
              </div>
    
              <div class="slider__wrapper wrapper">
                <div class="button__container-slider button__container_left">
                  <button class="slider__button slider__button_previous">
                    <span class="slider__button-icon"></span>
                  </button>
                </div>
                <div class="button__container-slider button__container_right">
                  <button class="slider__button slider__button_next">
                    <span class="slider__button-icon"></span>
                  </button>
                </div>
    
                <div class="gallery">
                </div>
              </div>
            </div>
          </div>
        </div>
    
        <div class="spinner hidden">
          <div class="spinner__gear">
            <div class="spinner__inner">
              <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <svg class="spinner" viewBox="0 0 50 50">
  <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
</svg>
        </div>
    
        <div class="introduction">
          <div class="introduction__container">
            <button class="introduction__button button-rounded">Старт</button>
          </div>
        </div>
    
        <template class="slider__item-template">
          <div class="slider__item">
            <p class="time"></p>
            <div class="results__correct">
              <p class="correct__title">
                <span class="correct__lead">Правильно:
                  <span class="correct"></span>
                </span>
              </p>
            </div>
            <div class="results__errors">
              <p class="errors__title">
                <span class="errors__lead">Ошибок:
                  <span class="errors"></span>
                </span>
              </p>
            </div>
          </div>
        </template>
      </div>
    `;
}
