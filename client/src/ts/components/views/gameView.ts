import Component from "../../common/component";
import { Cell } from '../../common/cell';
import { BOARD_SIZE, COLORS, DEFAULT_FONT_SIZE, FONT_COEF } from '../../constants/constants';

export default class GameView {
  gameBoard: Component;
  cells: Cell[][] = []; // матрица, в которой будут храниться созданные
  constructor(parentNode: HTMLElement) {
    this.gameBoard = new Component(parentNode, 'div', 'board', ''); // компонент обертки игрового поля
    this.renderBoard();
  }

  renderBoard() {
    for (let i = 0; i < BOARD_SIZE; i += 1) {
      const row = new Component(this.gameBoard.node, 'div', 'board__row', ''); // создание строки игрового поля
      this.cells.push([]);
      for (let j = 0; j < BOARD_SIZE; j += 1) {
        this.cells[i].push(new Cell(row.node, 'div', 'board__cell', '', row)); // создание ячеек внутри строки
      }
    }
  }

  renderNum(coordinates: number[], num: number) {
    const targetCell = this.cells[coordinates[0]][coordinates[1]]; // получаем ячейку по переданным координатам
    targetCell
      .createNum('board__number_new') // создаем число
      .setNumContent(num) // устанавливаем значение
      .setNumPositionStyle('left', targetCell, 'offsetLeft') // устанавливаем стиль положения числа
      .setNumPositionStyle('top', targetCell.parentRow, 'offsetTop')
      .number.setStyle(
        'background-color',
        COLORS[String(num) as keyof typeof COLORS] || COLORS['4096']
      ) // установка бэкграунда для числа
      .setStyle('font-size', `${DEFAULT_FONT_SIZE - FONT_COEF * String(num).length}px`); // установка размера шрифта относительно количества цифр в числе
  }

  renderMerging(rowInd: number, cellInd: number, value: number) { // метод для изменения контента внутри чисел
    const cell = this.cells[rowInd][cellInd]; // получение ячейки в соответствии с переданными координатами
    cell
      .setNumContent(value)
      .number.setStyle('font-size', `${DEFAULT_FONT_SIZE - FONT_COEF * String(value).length}px`);
    if (value > 4096) {
      cell.number.setStyle('background-color', COLORS['4096']); // для всех чисел, больших 4096, цвет будет как у 4096
    } else {
      cell.number.setStyle('background-color', COLORS[String(value) as keyof typeof COLORS]); // для всех остальных цвет берется из массива COLORS
    }
  }

  async moveTo(last: number[], current: number[], isMerge: boolean): Promise<void> { // метод для перемещения чисел
    const fromCell = this.cells[last[0]][last[1]]; // ячейка, число в которой нужно переместить
    const toCell = this.cells[current[0]][current[1]]; // ячейка, куда нужно переместить
    if (!isMerge) { // если ячейки не нужно мержить
      toCell.number = fromCell.number; // присваиваем число из fromCell в toCell и присваиваем числу во fromCell null, так как там больше не будет числа
      fromCell.number = null;
      toCell
        .setNumPositionStyle('left', toCell, 'offsetLeft')
        .setNumPositionStyle('top', toCell.parentRow, 'offsetTop'); // установка стилей для числа 
      return new Promise((resolve) => { // воззвращаем промис который будет резолвится по окончании анимации
        toCell.number.setListener(
          'transitionend',
          () => {
            resolve();
          },
          {
            once: true
          }
        );
      });
    } else { // если нужно будет замержить два числа
      fromCell
        .setNumPositionStyle('left', toCell, 'offsetLeft')
        .setNumPositionStyle('top', toCell.parentRow, 'offsetTop'); // сначала делаем анимацию перемещения
      const numToDestroy = fromCell.number;
      fromCell.number = null; // в ячейке больше числа не будет, так что присваиваем null
      return new Promise((resolve) => {
        numToDestroy.setListener( // по окончании перемещения уничтожаем число, оно больше не нужно и было необходимо только для перемещения
          'transitionend',
          () => {
            numToDestroy.destroy();
            resolve();
          },
          {
            once: true
          }
        );
      });
    }
  }
}