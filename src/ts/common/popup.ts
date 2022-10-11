import Component from './component';

export default class Popup extends Component {
  overlay: Component;
  title: Component<HTMLElement>;
  constructor(
    parent: HTMLElement,
    tagName: keyof HTMLElementTagNameMap,
    className: string,
    content: string,
    popupContent: string
  ) {
    super(parent, tagName, className, content);
    this.overlay = new Component(this.node, 'div', 'popup-wrapper popup-animated', '');
    this.title = new Component(this.overlay.node, 'h2', '', popupContent);
    this.overlay.setListener('animationend', () => this.overlay.removeClass('popup-animated'));
  }

  destroy(): void {
    this.overlay.setListener('animationend', () => this.node.remove());
    this.overlay.setClass('popup-animate-out');
  }
}