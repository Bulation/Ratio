import Router from './router';
import Controller from './controller';
import './style.scss';

const router = new Router();
const controller = new Controller();

const routes = [
  {
    path: '/',
    handler: controller.handleHomeRoute.bind(controller),
  },
  {
    path: '/about',
    handler: controller.handleAboutRoute.bind(controller),
  },
  {
    path: '/blog',
    handler: controller.handleBlogRoute.bind(controller),
  },
  {
    path: '/blog/articles/:id',
    handler: controller.handleArticleRoute.bind(controller),
  },
  {
    path: '/404',
    handler: controller.handleWrongRoute.bind(controller),
  },
];

routes.forEach((route) => {
  router.addRoute(route.path, route.handler);
});

window.onpopstate = () => {
  router.navigate(window.location.pathname);
};

const popStateEvent = new PopStateEvent('popstate', { state: '' });
window.dispatchEvent(popStateEvent);
