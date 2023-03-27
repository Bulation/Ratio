import {
  BOARD_SIZE,
  MAX_DEFAULT_NUM,
  MIN_DEFAULT_NUM,
  PROBABILITY,
  WIN_VALUE
} from '../../constants/constants';
import { Directions } from '../../types/Directions';
import { IGameState } from '../../interfaces/IGameState';
import { INumber } from '../../interfaces/INumber';

export default class GameModel {
  private _boardsStack: Array<INumber[][]> = []; // массив игровых полей, содержат все состояния полей, которые были во время игры
  private _board: INumber[][]; // матрица игрового поля, каждый массив является строкой поля, каждый элемент массива - объект типа INumber, описывающий состояние ячейки
  private directions: Directions[] = ['toRight', 'toDown', 'toLeft', 'toUp']; // массив всевозможных направлений
  playable = true; // флаг, показывающий, можно ли делать ходы, активна ли игра
  valueForWin: number; // значение, необходимое для выигрыша. Изначально 2048, затем увеличивается вдвое
  is2048Reached = false; // флаг, показывающий, достиг ли игрок значения 2048
  moveTo: (last: number[], current: number[], isMerge: boolean) => Promise<void>; // метод, который передвигает все ячейки поля. Реализуется в контроллере
  onUpdate: (coordinates: number[], num: number) => void; // метод, рендерящий числа в ячейках. Реализуется в контроллере.
  onMerge: (rowInd: number, cellInd: number, value: number) => void; // метод, который удваивает значение ячейки во вьюхе. Реализуется в контроллере
  onGameOver: () => void; // метод, рендерящий попап о геймовере. Реализуется в контроллере
  onWin: () => void; // метод, рендерящий попап о выигрыше. Реализуется в контроллере.
  onUpdateBoardsStack: (isBoardLength: boolean) => void; // метод, менящий состояние кнопки Back. Реализуется в контроллере.
  checkGameStatus: () => void; // метод, проверяющий статус игры и в зависимости от статуса меняющий состояние моделей. Реализуется в контроллере
  onUpdateTime: (time: number) => void; // метод, рендерящий время игры. Реализуется в контроллере
  updateScore: (value: number) => void; // метод, обновляющий счет. Реализуется в контроллере
  onUpdateScoresStack: (currentScore: number) => void;
  getScore: () => number;

  constructor() {}

  get boardsStack() {
    return this._boardsStack;
  }
  set boardsStack(value) {
    this._boardsStack = value;
  }
  get board() {
    return this._board;
  }
  set board(value) {
    this._board = value;
  }

  initGame(state: Partial<IGameState> = {}) {
    // метод, инициализирующий игру в зависимости от того, сохранялось ли состояние игры в локал сторедже
    if (Object.keys(state).length) {
      // если в локал сторедже уже есть сохраненная игра, то парсим поле и стек полей, проходимся по полю и рендерим числа
      this.board = JSON.parse(state.board);
      this.boardsStack = JSON.parse(state.boardsStack);
      this.board.forEach((row, rowInd) =>
        row.forEach((cell, cellInd) => {
          if (cell.value) {
            this.onUpdate([rowInd, cellInd], cell.value);
          }
        })
      );
      this.valueForWin = Number(state.winValue); // значение, которое нужно для выигрыша
      this.is2048Reached = state.is2048Reached === 'true'; // сохраняем информацию, было ли уже достигнуто 2048
    } else {
      // если играем в первый раз
      const boardRow = new Array(BOARD_SIZE).fill(undefined).map(() => {
        // создаем массив строки, заполняем андефайндами для корректной работы мапа, маппимся по массиву и для ячеек устанавливаем дефолтные значения
        return {
          value: null,
          isMerged: false
        };
      });
      this.board = new Array(BOARD_SIZE).fill(undefined).map(() => [...boardRow]); // заполняем массив массивами строк
      this.boardsStack = [];
      this.valueForWin = WIN_VALUE;
      this.is2048Reached = false;
      this.insertRandomNum(); // вставляем рандомное число в поле
    }
    this.onUpdateBoardsStack(this.isPreviousBoard()); // устанавливаем состояние кнопки Back в зависимости от того, есть ли в стеке полей массив
  }

  insertRandomNum() {
    // метод для вставки числа в поле
    const randomNum = Math.random() <= PROBABILITY ? MIN_DEFAULT_NUM : MAX_DEFAULT_NUM; // вычисление значения
    let randomIndex = [
      // вычисление индексов, по которым в поле нужно вставить число
      Math.floor(Math.random() * BOARD_SIZE),
      Math.floor(Math.random() * BOARD_SIZE)
    ];
    while (this.board[Math.floor(randomIndex[0])][Math.floor(randomIndex[1])].value) {
      // если в поле по этим индескам уже есть значение
      randomIndex = [
        // то ищем другие индексы
        Math.floor(Math.random() * BOARD_SIZE),
        Math.floor(Math.random() * BOARD_SIZE)
      ];
    }
    this.board[randomIndex[0]][randomIndex[1]] = {
      // вставка значения в объект
      value: randomNum,
      isMerged: false
    };
    this.onUpdate(randomIndex, randomNum); // рендер числа во вьюхе
    this.checkGameStatus(); // проверка статуса игры
  }

  isPreviousBoard() {
    return !!this.boardsStack.length; // проверка на то, есть ли в стеке поля
  }

  isEmptyCell() {
    // проверка на то, есть ли в матрица хотя бы одна строке, в которой есть хотя бы одна пустая ячейка
    return this.board.some((arr) => arr.some((el) => el.value === null));
  }

  isWin() {
    // проверка на то, есть ли ячейка со значением, равным значению, которое необходимо для победы
    return this.board.some((arr) => arr.some((el) => Number(el.value) === this.valueForWin));
  }

  getRowByDirection(direction: Directions, outerCycleIndex: number, innerCycleIndex: number) {
    // получение индекса строки по направлению
    switch (direction) {
      case 'toLeft': // если направление горизонтальное, то значит должны проверять ячейки с [0][4] до [0][0] если идем вправо, и с [0][0] до [0][4], если идем влево
      case 'toRight': // поэтому индекс строки статичен и равен переданному индексу внешнего цикла
        return outerCycleIndex;
      case 'toUp': // если направление вверх, то значит должны проверять ячейки с [0][0] до [4][0] то индекс строки динамичен и равен переданному индексу внутреннего цикла + 1
        return innerCycleIndex + 1;
      case 'toDown': // если направление вверх, то значит должны проверять ячейки с [4][0] до [0][0] то индекс строки динамичен и равен переданному индексу внутреннего цикла с большего к меньшему
        return BOARD_SIZE - 2 - innerCycleIndex;
    }
  }

  getColByDirection(direction: Directions, outerCycleIndex: number, innerCycleIndex: number) {
    // получение индекса столбца по направлению
    switch (direction) {
      case 'toUp': // если направление вверх, то значит должны проверять ячейки с [0][0] до [4][0] то индекс столбца статичен и равен переданному индексу внешнего цикла
      case 'toDown':
        return outerCycleIndex;
      case 'toLeft': // если направление влево, то идем с [0][0] до [0][4], индекс столбца динамичен и равен индексу внутреннего цикла + 1
        return innerCycleIndex + 1;
      case 'toRight': // если направление вправо, то идем с [0][4] до [0][0], индекс стобца динамичен и равен переданному  индексу внутреннего цикла с большего к меньшему
        return BOARD_SIZE - 2 - innerCycleIndex;
    }
  }

  getCellByIndexes(direction: Directions, outerCycleIndex: number, innerCycleIndex: number) {
    // получение ячейки по индексам
    const row = this.getRowByDirection(direction, outerCycleIndex, innerCycleIndex);
    const col = this.getColByDirection(direction, outerCycleIndex, innerCycleIndex);
    return {
      // возвращаем объект, который содержит значение ячейки, замержен ли он, и индексы строки и столбца
      value: this.board[row][col].value,
      isMerged: this.board[row][col].isMerged,
      rowIndex: row,
      colIndex: col
    };
  }

  getMoveToCell(
    direction: Directions,
    fromCell: INumber,
    outerCycleIndex: number,
    innerCycleIndex: number
  ) {
    // метод для получения объекта, который содержит информацию о ячейке, в которую нужно передвинуть ячейку fromCell
    let toCellObj;
    for (let k = innerCycleIndex - 1; k >= -1; k--) {
      //
      const foreCell = this.getCellByIndexes(direction, outerCycleIndex, k); // получаем ячейку, в которую потенциально можно передвинуть fromCell
      if (fromCell.value && fromCell.value === foreCell.value && !foreCell.isMerged) {
        // если значения совпадают и ячейка еще не была замержена, то сразу возвращаем объект, который содержит ячейку и координаты
        return {
          value: foreCell.value,
          isMerged: foreCell.isMerged,
          rowIndex: foreCell.rowIndex,
          colIndex: foreCell.colIndex
        };
      }
      if (!foreCell.value) {
        // если ячейка пустая, то сохраняем ее и ее координаты в переменную
        toCellObj = {
          value: foreCell.value,
          isMerged: foreCell.isMerged,
          rowIndex: foreCell.rowIndex,
          colIndex: foreCell.colIndex
        };
      }
      if (foreCell.value && foreCell.value !== fromCell.value) {
        // если ячейка занята и в ней значение, не равное значению fromCell, то сразу возвращаем объект, который будет либо содержать пустую ячейку, либо ничего
        return toCellObj;
      }
    }
    return toCellObj; // возвращаем объект, который содержит информацию о пустой ячейке и ее координатах
  }

  saveCurrentBoard() {
    return [...this.board].map((row) =>
      row.map((cellObj) => {
        // глубокое клонирование поля, чтобы для каждой ячейки создалась новая ссылка на объект, не связанная с текущим полем
        return {
          value: cellObj.value,
          isMerged: cellObj.isMerged
        };
      })
    );
  }

  async moveBoard(direction: Directions) {
    // метод, который перемещает ячейки игрового поля
    this.playable = false; // делаем игру на время неактивной
    const currentBoard = this.saveCurrentBoard(); // сохраняем текущее состояние игрового поля, чтобы затем его добавить в стек игровых полей, если ход состоится
    const currentScore = this.getScore();
    const cellsAnimationPromises = []; // массив, который будет содержать промисы перемещений ячеек
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE - 1; j++) {
        const fromCellObj = this.getCellByIndexes(direction, i, j); // получаем ячейку, которую будем перемещать
        const toCellObj = this.getMoveToCell(direction, fromCellObj, i, j); // получаем ячейку, в которую будем перемещать fromCellObj
        if (!fromCellObj.value || !toCellObj) {
          // если ячейка, которую будем перемещать, пустая или перемещать ее никуда, то переходим к следующей итерации
          continue;
        }
        let isMerged = false; // флаг, показывающий, будут ли мержиться ячейки
        if (fromCellObj.value === toCellObj.value) {
          // если значения одинаковые
          isMerged = true; // то значит эти ячейки надо замержить
          this.updateScore(fromCellObj.value); // обновляем счет
        }
        this.board[toCellObj.rowIndex][toCellObj.colIndex] = {
          value: fromCellObj.value, // меняем значение ячейки на значения той ячейки, которую надо переместить
          isMerged: isMerged // ставим метку, что ячейка будет замержена
        };
        cellsAnimationPromises.push(
          this.moveTo(
            [fromCellObj.rowIndex, fromCellObj.colIndex],
            [toCellObj.rowIndex, toCellObj.colIndex],
            isMerged
          )
        ); // добавляем промис, который возвращает метод moveTo, в массив, чтобы потом их все разом зарезолвить
        this.board[fromCellObj.rowIndex][fromCellObj.colIndex].value = null; // делаем значение ячейки, откуда мы перемещаем число, пустой
      }
    }
    if (cellsAnimationPromises.length) {
      // если в результате выполнения цикла произошел ход, то резолвим промисы и обновляем поле
      await Promise.all(cellsAnimationPromises);
      this.updateBoard(currentBoard, currentScore);
    } else {
      this.playable = true; // если хода не произошло, то вновь делаем игру активной
    }
  }

  updateBoard(currentBoard: INumber[][], currentScore: number) {
    this.boardsStack.push(currentBoard); // после случившегося хода добавляем предыдущее состояние поля в стек
    this.onUpdateBoardsStack(this.isPreviousBoard()); // меняем состояние кнопки Back
    this.onUpdateScoresStack(currentScore);
    this.mergeNumbers(); // производим обновление значений ячеек
    this.insertRandomNum(); // вставляем новое число в поле
  }

  isMergeSiblingNumbers() {
    // метод для проверки того, могут ли две соседние ячейки быть замержены. Необходимо для определения того, можно ли продолжать игру, если все игровое поле заполнено
    let isMergeCells = false;
    this.directions.forEach((direction) => {
      // проверить надо все направления, поэтому пробегаемся по массиву направлении
      for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE - 1; j++) {
          const cell = this.getCellByIndexes(direction, i, j);
          if (!cell.value) {
            continue;
          }
          const toCell = this.getCellByIndexes(direction, i, j - 1);
          if (toCell.value && cell.value === toCell.value) {
            // если две соседние ячейки существуют и равны, то значит их можно замержить
            isMergeCells = true;
          }
        }
      }
    });
    return isMergeCells;
  }

  mergeNumbers() {
    // метод для обновления значений ячеек
    this.board = this.board.map((row, rowInd) =>
      row.map((cell, cellInd) => {
        if (cell.isMerged) {
          // если ячейка помечена, как необходимая для мержа, то возвращаем объект с удвоенным значением
          this.onMerge(rowInd, cellInd, cell.value * 2); // меняем значение во вьюхе
          return {
            value: cell.value * 2,
            isMerged: false
          };
        } else {
          // если ячейку не нужно мержить, то возвращаем ее же
          return {
            value: cell.value,
            isMerged: cell.isMerged
          };
        }
      })
    );
  }
}
