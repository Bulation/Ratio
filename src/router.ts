import { SITE_URL } from './constants/constants';

export default class Router {
  routes: { [key: string]: (url: string) => boolean } = {};

  addRoute(path: string, handleRoute: (params?: { [key: string]: string }) => void) {
    const urlSegments = path.split('/');
    const dynamicRoutes: string[] = [];
    const regexPath = urlSegments
      .map((segment) => {
        if (segment.startsWith(':')) {
          dynamicRoutes.push(segment.slice(1));
          return `([^/]+)`;
        } else {
          return segment;
        }
      })
      .join('/');
    const regex = new RegExp(`^${regexPath}$`);
    this.routes[path] = (url: string) => {
      const match = url.match(regex);
      if (match) {
        const params: { [key: string]: string } = {};
        dynamicRoutes.forEach((route, i) => {
          params[route] = match[i + 1];
        });
        handleRoute(params);
        return true;
      }
      return false;
    };
  }

  navigate(url: string) {
    let isWrongUrl = true;
    Object.keys(this.routes).forEach((route) => {
      const handler = this.routes[route];
      if (handler(url)) {
        isWrongUrl = false;
      }
    });
    if (isWrongUrl) {
      history.pushState('', '', `${SITE_URL}404`);
      this.routes[`${SITE_URL}404`](`${SITE_URL}404`);
    }
  }
}
