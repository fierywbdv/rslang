const startScreenOurGameComponent = () => {
  const template = `<div>
                      <p>Start<br>Game</p>
                    </div>`;
  const startScreen = document.createElement('div');
  startScreen.setAttribute('id', 'ourgame-start-screen');
  startScreen.innerHTML = template;
  startScreen.className = 'screen';
  return startScreen;
};

export default startScreenOurGameComponent;
