import Component from '../common/component';
import Page from './Page';

export default class NotFoundPage extends Page {
  content: Component;
  parent: HTMLElement;
  main: Component;

  constructor(parent: HTMLElement) {
    super();
    this.parent = parent;
  }

  pageWillUnmount() {
    this.main.destroy();
  }

  render() {
    this.main = new Component(this.parent, 'main', '', '');
    this.content = new Component(this.main.node, 'span', '', '404');
  }
}
