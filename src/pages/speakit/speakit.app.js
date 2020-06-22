import './scss/main.scss';

import Controller from './app/controller/controller';
import Model from './app/model/model';
import View from './app/view/view';

export default function speakit() {
  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view);
  view.init(controller);
  model.init(controller);
  controller.init();
}
