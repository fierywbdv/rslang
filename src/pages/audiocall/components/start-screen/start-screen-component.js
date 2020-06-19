const startScreenComponent = () => {
  const template = `<div>
                      <p>Start<br>Game</p>
                    </div>`;
  const startScreen = document.createElement('div');
  startScreen.setAttribute('id', 'center-div');
  startScreen.innerHTML = template;
  return startScreen;
};

export default startScreenComponent;
