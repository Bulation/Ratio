import Component from './component';

export default class Popup extends Component {
  popup: Component;
  title: Component<HTMLElement>;
  constructor(
    parent: HTMLElement,
    tagName: keyof HTMLElementTagNameMap,
    className: string,
    content: string,
  ) {
    super(parent, tagName, className, content);
    this.popup = new Component(this.node, 'div', 'popup popup-animated', '');
    this.popup.setListener('animationend', () => this.popup.removeClass('popup-animated')); // cнимаем класс, отвечающий за анимацию по окончании анимации
  }

  destroy(): void {
    this.popup.setListener('animationend', () => this.node.remove()); // устанавливаем класс анимации исчезновения попапа и по окончании удаляем узел из дома
    this.popup.setClass('popup-animate-out');
  }
}