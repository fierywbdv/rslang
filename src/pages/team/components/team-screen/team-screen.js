import '../../scss/team.styles.scss';

const teamScreenComponent = () => {
  const template = `<section class="about-team">
      <div class="team-container about-team__container">
        <h2>Наша команда</h2>
        <div class="about-team__representation">
          <div class="team-member">
            <img class="img-fluid rounded-circle" src="./assets/promo/img/photo_vitali.jpg" width="300" height="300">
            <h3>Виталий</h3>
            <p>Тимлид. Разработал игру «Speakit».</p>
          </div>
          <div class="team-member">
            <img class="img-fluid rounded-circle" src="./assets/promo/img/photo_yauheni.jpg" width="300" height="300">
            <h3>Евгений</h3>
            <p>Создал меню регистрации, логику главной страницы приложения, страницу статистики, словарь.
            </p>
          </div>
          <div class="team-member">
            <img class="img-fluid rounded-circle" src="./assets/promo/img/photo_vladimir.jpg" width="300" height="300">
            <h3>Владимир</h3>
            <p>Разработал игру «Аудиовызов» и «Свою игру».</p>
          </div>
          <div class="team-member">
            <img class="img-fluid rounded-circle" src="./assets/promo/img/photo_dasha.jpg" width="300" height="300">
            <h3>Дарья</h3>
            <p>Разработала дизайн и разметку промо-страницы и игру "Спринт".</p>
          </div>
          <div class="team-member">
            <img class="img-fluid rounded-circle" src="./assets/promo/img/photo_dmitriy.png" width="300" height="300">
            <h3>Дмитрий</h3>
            <p>Разработал дизайн, разметку и логику главной страницы приложения.</p>
          </div>
          <div class="team-member">
            <img class="img-fluid rounded-circle" src="./assets/promo/img/photo_kanstantin.jpg" width="300" height="300">
            <h3>Константин</h3>
            <p>Разработал игру «Саванна».</p>
          </div>
        </div>
      </div>
    </section>`;
  const startScreen = document.createElement('div');
  startScreen.setAttribute('id', 'team-screen');
  startScreen.innerHTML = template;
  startScreen.className = 'team-screen';
  return startScreen;
};

export default teamScreenComponent;
