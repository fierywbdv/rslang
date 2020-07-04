const startScreenOurGameComponent = () => {
  const template = `<h3>Our Game</h3>
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12 col-sm-6">
                              <div class="card">
                                  <div class="card-header">
                                    <h4>Play with learned words</h4>
                                  </div>
                                  <div class="card-body">
                                    <div id="start-play" class="card-button two hide">
                                      <button>Play</button>
                                    </div>
                                    <div id="empty-words" class="message-empty-words hide">
                                    <p>You dont have any learned word</p>
                                    <p>You you can go to learn new words or play with random words</p>
                                    </div>
                                  </div>
                              </div>
                            </div>
                            <div class="col-xs-12 col-sm-6">
                              <div class="card">
                                <div class="card-header">
                                  <h4>Play with random words</h4>
                                </div>
                                <div class="card-body">
                                  <ul class="list-unstyled pl-0">
                                    <li class="birthday-item">
                                    <div class="form-item">
                                        <label class="form-item__label">Level</label>
                                        <div class="form-item__control"><small><strong><span class="slider__value level">1</span><span>&nbsp;Level</span></strong></small></div>
                                        <div class="slider">
                                          <input id="level" class="slider__input" type="range" value="0" min="0" max="5"/>
                                          <div class="slider__positive" style="width: 0%;"></div>
                                        </div>
                                      </div>
                                    </li>
                                    <div class="form-item">
                                        <label class="form-item__label">Round</label>
                                        <div class="form-item__control"><small><strong><span class="slider__value round">1</span><span>&nbsp;Round</span></strong></small></div>
                                        <div class="slider">
                                          <input id="group" class="slider__input" type="range" value="0" min="0" max="29"/>
                                          <div class="slider__positive" style="width: 0%;"></div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                  </div>
                                  <div id="custom-start" class="card-button">
                                    <button>Play</button>
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
