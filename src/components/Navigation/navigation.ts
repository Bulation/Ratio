import Component from '../../common/component';
import { IMenuItem } from '../../interfaces/IMenuItem';

export default class Navigation {
  navigation: Component;
  list: Component;
  listLinks: Component[];
  activeMenuItem: Component;
  parent: HTMLElement;
  burger: Component;
  linksObj: IMenuItem[];
  itemsCount: number;
  constructor(parent: HTMLElement, itemsCount: number, linksObj: IMenuItem[]) {
    this.parent = parent;
    this.navigation = new Component(parent, 'nav', 'navigation', '');
    this.list = new Component(this.navigation.node, 'ul', 'navigation__list', '');
    this.listLinks = []; // массив ссылок
    this.itemsCount = itemsCount;
    this.linksObj = linksObj;
    this.renderLinks();
    document.body.onclick = (e) => {
      if (
        e.target instanceof HTMLElement &&
        !e.target.closest('.navigation, .burger') &&
        document.body.classList.contains('body_overlay')
      ) {
        this.toggleBurger();
      } // на боди навешиваем обработчик по клику, при котором если по боди кликнули при открытом бургере, то бургер будет закрываться
    };
    this.renderBurger();
  }

  renderLinks() {
    for (let i = 0; i < this.itemsCount; i += 1) {
      const listItem = new Component(this.list.node, 'li', 'navigation__item', '');
      const listLink = new Component<HTMLAnchorElement>(
        listItem.node,
        'a',
        'navigation__link',
        this.linksObj[i].content // добавление текстового контента из объекта
      ).setListener('click', (e) => {
        e.preventDefault();
        this.handleLinkClick(listLink);
      });
      listLink.node.href = this.linksObj[i].url; // добавление урла из объекта
      this.listLinks.push(listLink);
    }
  }

  renderBurger() {
    this.burger = new Component(this.parent, 'div', 'burger header__burger', '').setListener(
      'click',
      () => {
        this.toggleBurger();
      }
    );
    for (let i = 0; i < 3; i++) {
      new Component(this.burger.node, 'span', 'burger__item', ''); // рендер элементов бургера
    }
  }

  handleLinkClick(link: Component<HTMLAnchorElement>) {
    if (this.burger.hasClass('burger_active')) {
      // если клик по пункту меню произошел при открытом бургере, то закрываем бургер
      this.toggleBurger();
    }
    history.pushState('', '', link.node.href);
    const popStateEvent = new PopStateEvent('popstate');
    dispatchEvent(popStateEvent);
  }

  toggleBurger() {
    // метод для переключения классов для навигации, боди и бургера, чтобы открывать и закрывать бургер
    this.navigation.toggleClass('navigation_show');
    if (!this.navigation.hasClass('navigation_show')) {
      this.navigation.setClass('navigation_hidden');
    } else {
      this.navigation.removeClass('navigation_hidden');
    }
    document.body.classList.toggle('body_overlay');
    this.burger.toggleClass('burger_active');
  }

  addActiveClass(index: number) {
    // добавление класса для активного пункта меню
    this.listLinks[index].setClass('navigation__link_active');
    this.activeMenuItem = this.listLinks[index];
  }

  removeActiveClass() {
    // удаление класса для активного пункта меню
    if (this.activeMenuItem) {
      this.activeMenuItem.removeClass('navigation__link_active');
    }
  }
}
