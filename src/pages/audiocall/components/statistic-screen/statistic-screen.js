const statisticScreenComponent = () => {
  const template = `<h3>Container Title</h3>
                      <div class="container-inner">
                        <div class="inner-left">
                          <div class="box">
                             <h2>Correct</h2>
                                <ul>
                                 <li><span>1</span>List Item One</li>
                                 <li><span>2</span>List Item Two</li>
                                 <li><span>3</span>List Item Three</li>
                                 <li><span>4</span>List Item Four</li>
                                 <li><span>5</span>List Item Five</li>
                                 <li><span>6</span>List Item Six </li>
                                </ul>
                           </div>
                        </div>
                        <div class="inner-right">
                          <div class="inner-content">
                           <div class="box">
                             <h2>Mistake</h2>
                                <ul>
                                 <li><span>1</span>List Item One</li>
                                 <li><span>2</span>List Item Two</li>
                                 <li><span>3</span>List Item Three</li>
                                 <li><span>4</span>List Item Four</li>
                                 <li><span>5</span>List Item Five</li>
                                 <li><span>6</span>List Item Six </li>
                                </ul>
                           </div>
                          </div>
                        </div>
                        <button class="restart">OK</button>
                      </div>`;
  const startScreen = document.createElement('div');
  startScreen.setAttribute('id', 'statistic');
  startScreen.innerHTML = template;
  startScreen.className = 'container screen statistic';
  return startScreen;
};

export default statisticScreenComponent;
