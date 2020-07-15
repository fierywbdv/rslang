export default function makePage() {
  const pageWiew = document.querySelector('#root');
  pageWiew.innerHTML += ` 
    <div class="body-speakit overflow-hidden">
        <div class="speakit-wrapper hidden">
          <div class="speakit-wrapper-header">
          </div>
          <div class="speakit-wrapper-basik">
            <div class="speakit-wrapper-basik-control">
              <div class="speakit-basik-wrapper">
                <div class="speakit-basik-container">
                  <button class="game__button game__button-start button-rounded">Начать игру</button>
                  <button class="game__button game__button-start-lerned button-rounded">играть с изученными словами </button>
                  <button class="game__button game__button-start-random button-rounded">играть с рандомными словами </button>
                  <button class="game__button game__button-new button-rounded">Новая игра</button>
                  <button class="game__button game__button-stop button-rounded">Остановить игру</button>
                  <button class="game__button game__button-results button-rounded">Результаты</button>
                </div>
                <div class="speakit-levels">
                  <span class="levels__result">Уровень сложности:</span>
                  <button class="game__difficult game__difficult-1 button-rounded speakit_active">1</button>
                  <button class="game__difficult game__difficult-2 button-rounded">2</button>
                  <button class="game__difficult game__difficult-3 button-rounded">3</button>
                  <button class="game__difficult game__difficult-4 button-rounded">4</button>
                  <button class="game__difficult game__difficult-5 button-rounded">5</button>
                  <button class="game__difficult game__difficult-6 button-rounded">6</button>
                </div>
                <div class="speakit-levels speakit_level">
                 <span class="levels__result">Раунд:</span>
                 <button class="game__difficult game__difficult-1 button-rounded1 speakit_active">1</button>
                 <button class="game__difficult game__difficult-2 button-rounded1">2</button>
                 <button class="game__difficult game__difficult-3 button-rounded1">3</button>
                 <button class="game__difficult game__difficult-4 button-rounded1">4</button>
                 <button class="game__difficult game__difficult-5 button-rounded1">5</button>
                 <button class="game__difficult game__difficult-6 button-rounded1">6</button>
                 <button class="game__difficult game__difficult-7 button-rounded1">7</button>
                 <button class="game__difficult game__difficult-8 button-rounded1">8</button>
                 <button class="game__difficult game__difficult-9 button-rounded1">9</button>
                 <button class="game__difficult game__difficult-10 button-rounded1">10</button>
                 <button class="game__difficult game__difficult-11 button-rounded1">11</button>
                 <button class="game__difficult game__difficult-12 button-rounded1">12</button>
                 <button class="game__difficult game__difficult-13 button-rounded1">13</button>
                 <button class="game__difficult game__difficult-14 button-rounded1">14</button>
                 <button class="game__difficult game__difficult-15 button-rounded1">15</button>
                 <button class="game__difficult game__difficult-16 button-rounded1">16</button>
                 <button class="game__difficult game__difficult-17 button-rounded1">17</button>
                 <button class="game__difficult game__difficult-18 button-rounded1">18</button>
                 <button class="game__difficult game__difficult-19 button-rounded1">19</button>
                 <button class="game__difficult game__difficult-20 button-rounded1">20</button>
                 <button class="game__difficult game__difficult-21 button-rounded1">21</button>
                 <button class="game__difficult game__difficult-22 button-rounded1">22</button>
                 <button class="game__difficult game__difficult-23 button-rounded1">23</button>
                 <button class="game__difficult game__difficult-24 button-rounded1">24</button>
                 <button class="game__difficult game__difficult-25 button-rounded1">25</button>
                 <button class="game__difficult game__difficult-26 button-rounded1">26</button>
                 <button class="game__difficult game__difficult-27 button-rounded1">27</button>
                 <button class="game__difficult game__difficult-28 button-rounded1">28</button>
                 <button class="game__difficult game__difficult-29 button-rounded1">29</button>
                 <button class="game__difficult game__difficult-30 button-rounded1">30</button>
                </div>
              </div>
              <p class="status-bar"></p>
            </div>

             <div class="cards__container">
            </div>
            
            <div class="speakit-main-card">
              <div class="picture__container">
                <img class="main-card__picture" alt="current word picture">
              </div>
              <div>
                <p class="main-card__translation"></p>
                <input class="main-card__speech-input input" type="text" readonly> <!-- readonly -->
              </div>
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
    
        <div class="speakit-starter hidden">
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
          <svg class="speakit-starter" viewBox="0 0 50 50">
  <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
</svg>
        </div>
    
        <div class="speakit-first-wrapper">
          <div class="speakit-first-wrapper__container">
            <button class="speakit-first-wrapper__button button-rounded">Старт</button>
          </div>
        </div>
    
        <template class="slider__item-template">
          <div class="slider__item">
            <p class="time"></p>
            <div class="results__correct">
              <p class="correct__title">
                <span class="correct__lead">Правильные ответы:
                  <span class="correct"></span>
                </span>
              </p>
            </div>
            <div class="results__errors">
              <p class="errors__title">
                <span class="errors__lead">Не правильные ответы:
                  <span class="errors"></span>
                </span>
              </p>
            </div>
          </div>
        </template>
      </div>
    `;
}
