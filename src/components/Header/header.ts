import Component from '../../common/component';
import { MENU_ITEMS_COUNT, MENU_LINKS_OBJECT, SITE_URL } from '../../constants/constants';
import Navigation from '../Navigation/navigation';
import svg from '/svg/logo.svg?raw';

export default class Header {
  header: Component;
  headerContainer: Component;
  logo: Component<HTMLAnchorElement>;
  title: Component;
  navigation: Navigation;
  isInHome = true;
  constructor(parentNode: HTMLElement) {
    this.header = new Component(parentNode, 'header', 'header', '');
    this.title = new Component(this.header.node, 'h1', 'visually-hidden', 'Nuntium');
    this.headerContainer = new Component(this.header.node, 'div', 'header-container', '');
    this.logo = new Component<HTMLAnchorElement>(this.headerContainer.node, 'a', 'logo', '');
    this.logo.node.href = `${SITE_URL}`;
    this.logo.setListener('click', (e) => {
      e.preventDefault();
      if (!this.isInHome) {
        // если по логотипу кликнули не на домашней странице, то переключаемся на домашнюю страницу
        history.pushState('', '', this.logo.node.href);
        const popStateEvent = new PopStateEvent('popstate');
        dispatchEvent(popStateEvent);
      }
    });
    this.logo.node.innerHTML = svg;
    this.navigation = new Navigation(
      this.headerContainer.node,
      MENU_ITEMS_COUNT,
      MENU_LINKS_OBJECT
    );
  }

  toggleHome(value: boolean) {
    this.isInHome = value; // меняем значение свойства в зависимости от того, на какой странице находимся
  }
}
