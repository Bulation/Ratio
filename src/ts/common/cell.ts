import Component from "./component";

export class Cell extends Component {
  number: Component<HTMLElement> | null;
  mergeNumber: Component<HTMLElement> | null;
  parentRow: Component<HTMLElement>;
  constructor(parentNode: HTMLElement | null, tagName: keyof HTMLElementTagNameMap, className = '', content = '', parentRow: Component) {
    super(parentNode, tagName, className, content);
    this.parentRow = parentRow;
  }

  createNum(className = '') {
    const number = new Component(this.node, 'div', `board__number ${className}`, '');
    number.setListener('animationend', () => { 
      number.node.classList.remove(className);
    }, 
    { 
      once: true 
    });
    this.number = number;
    return this;
  }

  setNumContent(num: number) {
    this.number.setContent(String(num));
    return this;
  }

  setNumPositionStyle(key: string, cell: Component, cellOffsetKey: keyof HTMLElement) {
    const offset = Number(cell.getStyle(cellOffsetKey));
    this.number.setStyle(key, `${offset}px`);
    return this;
  }
}