import routes from './routes';
import controller from '../controller/controller';

class Router {
  constructor() {
    if (!Router.router) {
      Router.router = this;
    }
    this.routes = [];
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
    const url = window.location.hash.slice(1) || '/';
    return url;
  }

  run() {
    this.hasChanged();
    this.pageLoaded();
  }
}

const router = new Router();
Object.freeze(router);
export default router;
