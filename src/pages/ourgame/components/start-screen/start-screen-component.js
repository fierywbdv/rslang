const startScreenOurGameComponent = () => {
  const template = `<div>
                      <p>Start<br>Game</p>
                    </div>`;
  const startScreen = document.createElement('div');
  startScreen.setAttribute('id', 'center-div');
  startScreen.innerHTML = template;
  startScreen.className = 'screen';
  return startScreen;
};

export default startScreenOurGameComponent;
