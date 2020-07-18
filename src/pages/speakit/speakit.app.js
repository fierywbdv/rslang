import './scss/main.scss';

import Controller from './components/app/game-screen/controller';
import Model from './components/app/game-model/model';
import View from './components/app/view/view';

export default function speakit() {
  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view);
  view.init(controller);
  model.init(controller);
  controller.init();
}
