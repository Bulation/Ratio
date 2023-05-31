import Router from './router/router';
import './scss/style.scss';

const router = new Router();

router.routesMap.forEach((route) => {
  router.addRoute(route.path, route.handler);
});

window.onpopstate = () => {
  router.navigate(window.location.pathname);
};

const popStateEvent = new PopStateEvent('popstate');
window.dispatchEvent(popStateEvent); // создание ивента popstate и принудительный вызов. Необходимо для навигации, так как ивент 'popstate' триггерится только тогда, когда юзер нажимает на кнопки "Вперед" и "Назад" в браузере
