import Router from './router';
import Controller from './controller';
import './style.scss';
import { SITE_URL } from './constants/constants';

const router = new Router();
const controller = new Controller();

const routes = [
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

routes.forEach((route) => {
  router.addRoute(route.path, route.handler);
});

window.onpopstate = () => {
  router.navigate(window.location.pathname);
};

const popStateEvent = new PopStateEvent('popstate');
window.dispatchEvent(popStateEvent); // создание ивента popstate и принудительный вызов. Необходимо для навигации, так как ивент 'popstate' триггерится только тогда, когда юзер нажимает на кнопки "Вперед" и "Назад" в браузере
