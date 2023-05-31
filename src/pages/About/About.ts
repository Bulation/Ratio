import Component from '../../common/component';
import { IAbout } from '../../interfaces/IAbout';
import './about.scss';

export default class About {
  main: Component;
  parent: HTMLElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;
  }

  pageWillUnmount() {
    this.main.destroy();
  }

  render(pageData: IAbout) {
    this.main = new Component(this.parent, 'main');
    const aboutSection = new Component(this.main.node, 'section', 'about-section', '');
    const aboutContainer = new Component(aboutSection.node, 'div', 'about-container', '');
    const title = new Component(
      aboutContainer.node,
      'h2',
      'about-container__title',
      pageData.title
    );
    const content = new Component(aboutContainer.node, 'div', 'about-container__content', '');
    content.node.innerHTML = pageData.content;
    content.node.querySelector('img').alt = 'bee on chamomile'; // добавление атрибута alt для картинки
  }
}
