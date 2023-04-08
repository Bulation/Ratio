import Component from '../../common/component';
import { IMenuItem } from '../../interfaces/IMenuItem';

export default class Navigation {
  navigation: Component;
  list: Component;
  listLinks: Component[];
  activeMenuItem: Component;
  parent: HTMLElement;
  burger: Component;
  constructor(parent: HTMLElement, itemsCount: number, linksObj: IMenuItem[]) {
    this.parent = parent;
    this.navigation = new Component(parent, 'nav', 'navigation', '');
    this.list = new Component(this.navigation.node, 'ul', 'navigation__list', '');
    this.listLinks = [];
    for (let i = 0; i < itemsCount; i += 1) {
      const listItem = new Component(this.list.node, 'li', 'navigation__item', '');
      const listLink = new Component<HTMLAnchorElement>(
        listItem.node,
        'a',
        'navigation__link',
        linksObj[i].content
      ).setListener('click', (e) => {
        e.preventDefault();
        this.handleLinkClick(listLink);
      });
      listLink.node.href = linksObj[i].url;
      this.listLinks.push(listLink);
    }
    document.body.onclick = (e) => {
      if (
        e.target instanceof HTMLElement &&
        !e.target.closest('.navigation, .burger') &&
        document.body.classList.contains('body_overlay')
      ) {
        this.toggleNavigationClass();
      }
    };
    this.burger = new Component(parent, 'div', 'burger header__burger', '').setListener(
      'click',
      () => {
        this.toggleNavigationClass();
      }
    );
    for (let i = 0; i < 3; i++) {
      new Component(this.burger.node, 'span', 'burger__item', '');
    }
  }

  handleLinkClick(link: Component<HTMLAnchorElement>) {
    this.removeActiveClass();
    if (this.burger.hasClass('burger_active')) {
      this.toggleNavigationClass();
    }
    history.pushState('', '', link.node.href);
    const popStateEvent = new PopStateEvent('popstate');
    dispatchEvent(popStateEvent);
  }

  toggleNavigationClass() {
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
    console.log(index);
    this.listLinks[index].setClass('navigation__link_active');
    this.activeMenuItem = this.listLinks[index];
  }

  removeActiveClass() {
    console.log(this.activeMenuItem);
    if (this.activeMenuItem) {
      this.activeMenuItem.removeClass('navigation__link_active');
    }
  }
}
