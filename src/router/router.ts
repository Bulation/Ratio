import { SITE_URL } from '../constants/constants';
import Controller from '../controller/controller';

export default class Router {
  routes: { [key: string]: (url: string) => boolean } = {};
  routesMap: { path: string; handler: (params: { [key: string]: string }) => Promise<void> }[];

  constructor() {
    const controller = new Controller();
    this.routesMap = [
      // массив со всеми роутами, которые будем добавлять в роутер
      {
        path: `${SITE_URL}`,
        handler: controller.handleHomeRoute.bind(controller),
      },
      {
        path: `${SITE_URL}about`,
        handler: controller.handleAboutRoute.bind(controller),
      },
      {
        path: `${SITE_URL}blog`,
        handler: controller.handleBlogRoute.bind(controller),
      },
      {
        path: `${SITE_URL}blog/article/:id`,
        handler: controller.handleArticleRoute.bind(controller),
      },
      {
        path: `${SITE_URL}404`,
        handler: controller.handleWrongRoute.bind(controller),
      },
    ];
  }

  addRoute(path: string, handleRoute: (params?: { [key: string]: string }) => void) {
    const urlSegments = path.split('/');
    const dynamicRoutes: string[] = []; // массив из динамических роутов. Если приходит урл вида /blog/:id/:num, в нем будут id и num
    const regexPath = urlSegments
      .map((segment) => {
        if (segment.startsWith(':')) {
          dynamicRoutes.push(segment.slice(1));
          return `([^/]+)`; // если маршрут динамический, то возвращаем скобочную группу внутри которой будет любой символ кроме / и сегмент пушим в массив роутов
        } else {
          return segment;
        }
      })
      .join('/'); // получаем строку для создания регулярного выражения
    // для маршрута вида /blog регуляркой будет ^/blog$, для /blog/articles/:id - ^/blog/articles/([^/]+)$
    const regex = new RegExp(`^${regexPath}$`);
    this.routes[path] = (url: string) => {
      const match = url.match(regex);
      if (match) {
        const params: { [key: string]: string } = {}; // объект, который будет содержать значения для всех динамических роутов
        dynamicRoutes.forEach((route, i) => {
          // если параметр path содержал динамические роуты, то будем пробегаться по сохраненным в массив роутам и в объект params добавлять значения для динамических роутов
          params[route] = match[i + 1]; // стоит i + 1, так как для регулярок со скобочными группами в 0 элементе массива match будет все совпадение, а в последующих элементах совпадения со скобочными группами
        });
        handleRoute(params);
      }
      return Boolean(match); // если урл соответствует регулярке, то возвращаем тру иначе фолс
    };
  }

  navigate(url: string) {
    let isWrongUrl = true; // переменная, отвечающая за то, является ли параметр url верным урлом
    Object.keys(this.routes).forEach((route) => {
      // пробегаемся по всем роутам и вызываем все функции, содержащиеся в объекте this.routes
      const routeHandler = this.routes[route];
      if (routeHandler(url)) {
        // если роут подходит под пришедший url, то значит url верный
        isWrongUrl = false;
      }
    });
    if (isWrongUrl) {
      // если url неверный, то перенаправляем на страницу 404
      history.pushState('', '', `${SITE_URL}404`);
      this.routes[`${SITE_URL}404`](`${SITE_URL}404`);
    }
  }
}
