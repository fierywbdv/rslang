const startScreenOurGameComponent = () => {
  const template = `<div class="container">
                        <div class="row">
                            <div class="col-12">
                                <h3 class="text-center">Своя Игра</h3>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12 col-sm-6">
                              <div class="card">
                                  <div class="card-header">
                                    <h4>Играть с выученными словами</h4>
                                  </div>
                                  <div class="card-body">
                                    <div id="start-play" class="card-button two hide">
                                      <button>Старт</button>
                                    </div>
                                    <div id="empty-words" class="message-empty-words hide">
                                    <p>Вы еще не выучили слов</p>
                                    <p>Вы можете отправиться учить слова или играть со случайными словами</p>
                                    </div>
                                  </div>
                              </div>
                            </div>
                            <div class="col-xs-12 col-sm-6">
                              <div class="card">
                                <div class="card-header">
                                  <h4>Играть со случайными словами</h4>
                                </div>
                                <div class="card-body">
                                  <ul class="list-unstyled pl-0">
                                    <li class="birthday-item">
                                    <div class="form-item">
                                        <label class="form-item__label">Сложность</label>
                                        <div class="form-item__control"><small><strong><span class="slider__value level">1</span><span>&nbsp;Уровень</span></strong></small></div>
                                        <div class="slider">
                                          <input id="level" class="slider__input" type="range" value="0" min="0" max="5"/>
                                          <div class="slider__positive" style="width: 0%;"></div>
                                        </div>
                                      </div>
                                    </li>
                                    <div class="form-item">
                                        <label class="form-item__label">Раунд</label>
                                        <div class="form-item__control"><small><strong><span class="slider__value round">1</span><span>&nbsp;Раунд</span></strong></small></div>
                                        <div class="slider">
                                          <input id="group" class="slider__input" type="range" value="0" min="0" max="29"/>
                                          <div class="slider__positive" style="width: 0%;"></div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                  </div>
                                  <div id="custom-start" class="card-button">
                                    <button>Старт</button>
                                  </div>
                                </div>
                            </div>
                        </div>
                      </div>`;
  const startScreen = document.createElement('div');
  startScreen.setAttribute('id', 'ourgame-start-screen');
  startScreen.innerHTML = template;
  startScreen.className = 'screen';
  return startScreen;
};

export default startScreenOurGameComponent;
