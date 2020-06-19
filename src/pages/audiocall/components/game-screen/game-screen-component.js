const gameScreenComponent = () => {
  const template = `<div class="front-face">
                      <div class="cover">
                          <img src="https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" class="profile">
                        </div>
                        <div class="name">Beni Smith 1</div>
                        <div class="name">Beni Smith 2</div>
                        <div class="name">Beni Smith 3</div>
                        <div class="name">Beni Smith 4</div>
                        <div class="name">Beni Smith 5</div>
                      </div>
                  </div>`;
  const startScreen = document.createElement('div');
  startScreen.setAttribute('id', 'play-screen');
  startScreen.className = 'container';
  startScreen.innerHTML = template;
  return startScreen;
};

export default gameScreenComponent;
