import routes from './routes';
import controller from '../controller/controller';

class Router {
  constructor() {
    if (!Router.router) {
      Router.router = this;
    }
    this.routes = [];
    this.url = null;
    this.addRoute(routes);
    return Router.router;
  }

  hasChanged() {
    window.addEventListener('hashchange', () => {
      controller.callAction(this.getUrl());
    });
  }

  pageLoaded() {
    window.addEventListener('load', () => {
      controller.callAction(this.getUrl());
    });
  }

  addRoute(items) {
    items.forEach((item) => {
      this.routes.push(item.url);
    });
  }

  getUrl() {
    this.url = window.location.hash.slice(1) || '/';
    return this.url;
  }

  run() {
    this.hasChanged();
    this.pageLoaded();
  }
}

const router = new Router();

export default router;
