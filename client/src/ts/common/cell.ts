import Component from "./component";

export class Cell extends Component { // класс для рендера ячеек
  number: Component<HTMLElement> | null; // дом элемент с числом, который может быть в ячейке
  parentRow: Component<HTMLElement>; // строка, в которй находится ячейка. Необходима для установления стиля offsetTop
  constructor(parentNode: HTMLElement | null, tagName: keyof HTMLElementTagNameMap, className = '', content = '', parentRow: Component) {
    super(parentNode, tagName, className, content);
    this.parentRow = parentRow;
  }

  createNum(className = '') { // создание дом элемента с числом внутри
    const number = new Component(this.node, 'div', `board__number ${className}`, '');
    number.setListener('animationend', () => { 
      number.node.classList.remove(className);
    }, // снимаем класс анимации по ее окончании и удаляем обработчик
    { 
      once: true 
    });
    this.number = number;
    return this;
  }

  setNumContent(num: number) { // установка значения в компонент, который должен содержать число
    this.number.setContent(String(num));
    return this;
  }

  setNumPositionStyle(key: string, cell: Component, cellOffsetKey: keyof HTMLElement) { // перемещение дом элемента с числом
    const offset = Number(cell.getStyle(cellOffsetKey)); // получаем значение свойства offset. Если key = left, то будет получено значение offsetLeft текущей ячейки, если key = top, то будет получено значение оффсета строки, в которой находится ячейка, так как нужно значение относительно родителя
    this.number.setStyle(key, `${offset}px`);
    return this;
  }
}