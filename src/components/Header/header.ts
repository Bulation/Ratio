import Component from '../../common/component';
import { MENU_ITEMS_COUNT, MENU_LINKS_OBJECT } from '../../constants/constants';
import Navigation from '../Navigation/navigation';
import svg from '../../../public/logo.svg?raw';

export default class Header {
  header: Component<HTMLElement>;
  headerContainer: Component<HTMLElement>;
  logo: Component<HTMLElement>;
  title: Component<HTMLElement>;
  titleLightText: Component<HTMLElement>;
  titleDarkText: Component<HTMLElement>;
  navigation: Navigation;
  isInHome = true;
  constructor(parentNode: HTMLElement) {
    this.header = new Component(parentNode, 'header', 'header', '');
    this.headerContainer = new Component(this.header.node, 'div', 'header-container', '');
    this.logo = new Component(this.headerContainer.node, 'a', 'logo', '').setListener(
      'click',
      () => {
        if (!this.isInHome) {
          history.pushState('', '', '/');
          const popStateEvent = new PopStateEvent('popstate', { state: '' });
          dispatchEvent(popStateEvent);
        }
      }
    );
    this.logo.node.innerHTML = svg;
    this.navigation = new Navigation(
      this.headerContainer.node,
      MENU_ITEMS_COUNT,
      MENU_LINKS_OBJECT
    );
  }

  toggleHome(value: boolean) {
    this.isInHome = value;
  }
}
