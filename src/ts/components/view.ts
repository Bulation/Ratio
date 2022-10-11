import Component from "../common/component";
import Popup from "../common/popup";
import { Cell } from "../common/cell"
import { BOARD_SIZE, DEFAULT_FONT_SIZE, FONT_COEF, COLORS } from "../constants/constants";
import { getDate } from "../helperFunctions/getDate";
import { IResult } from "../interfaces/IResult";

export class View {
  gameBoard: Component;
  cells: Cell[][] = [];
  score: Component<HTMLElement>;
  restartBtn: Component<HTMLElement>;
  bestScore: Component<HTMLElement>;
  backBtn: Component<HTMLElement>;
  time: Component<HTMLElement>;
  resultsBtn: Component<HTMLElement>;
  timeOrder: 'ASC' | 'DESC' = 'ASC';
  valueOrder: 'ASC' | 'DESC' = 'ASC';
  recordsBtn: Component<HTMLElement>;
  scoreContainer: Component<HTMLElement>;
  gameBtnsContainer: Component<HTMLElement>;
  resultsContainer: Component<HTMLElement>;
  howToPlay: Component<HTMLElement>;
  gameTitle: Component<HTMLElement>;
  getSortedTableResultsData: (key: keyof IResult, order: string) => IResult[];
  getSortedTableRecordsData: (key: keyof IResult, order: string) => IResult[];
  continueTimer: () => void;
  restartGame: () => void;
  onBack: () => void;
  isBackBtnEnable: () => number;
  getTableResultsData: () => IResult[];
  getTableRecordsData: () => IResult[];
  sendResult: () => void;
  constructor(parentNode: HTMLElement) {
    this.gameTitle = new Component(parentNode, 'h1', 'game-title', '2048');
    this.scoreContainer = new Component(parentNode, 'div', 'score-container', '');
    this.score = new Component(this.scoreContainer.node, 'div', 'score', 'Score: 0');
    this.bestScore = new Component(this.scoreContainer.node, 'div', 'best-score', 'Best Score: 0');
    this.gameBtnsContainer = new Component(parentNode, 'div', 'game-btns-container', '');
    this.restartBtn = new Component(this.gameBtnsContainer.node, 'button', 'btn restart-btn', 'New Game').setListener('click', () => {
      this.destroyNumbers();
      this.renderScore(0);
      this.restartGame();
    });
    this.backBtn = new Component(this.gameBtnsContainer.node, 'button', 'btn back-btn', 'Back').setClass('back-btn_inactive').setListener('click', () => {
      if (this.isBackBtnEnable()) {
        this.destroyNumbers();
        this.onBack()
      }
    });
    this.time = new Component(parentNode, 'div', 'time', 'Time: 00:00:00');
    this.gameBoard = new Component(parentNode, 'div', 'board', '');
    this.renderBoard();
    this.resultsContainer = new Component(parentNode, 'div', 'results-container', '');
    this.resultsBtn = new Component(this.resultsContainer.node, 'button', 'btn results-btn', 'Results table').setListener('click', () => {
      this.renderResultsPopup();
    });
    this.recordsBtn = new Component(this.resultsContainer.node, 'button', 'btn records-btn', 'Records table').setListener('click', () => {
      this.renderRecordsPopup();
    });
    this.howToPlay = new Component(parentNode, 'p', 'instruction', 'How to play: use arrow keys, swipe on phone or hold down the left mouse button and drag the mouse in different directions to move the numbers.');
  }

  toggleBackBtnClass(isActive: boolean) {
    if (isActive) {
      this.backBtn.setClass('back-btn_active');
      this.backBtn.removeClass('back-btn_inactive');
    } else {
      this.backBtn.removeClass('back-btn_active');
      this.backBtn.setClass('back-btn_inactive');
    }
  }

  renderBoard() {
    for (let i = 0; i < BOARD_SIZE; i += 1) {
      const row = new Component(this.gameBoard.node, 'div', 'board__row', '');
      this.cells.push([]);
      for (let j = 0; j < BOARD_SIZE; j += 1) {
        this.cells[i].push(new Cell(row.node, 'div', 'board__cell', '', row));
      }
    }
  }

  destroyNumbers() {
    this.cells.forEach((row) => row.forEach((cell) => {
      if (cell.number) {
        cell.number.destroy();
        cell.number = null;
      }
    }))
  }

  renderNum(coordinates: number[], num: number) {
    const targetCell = this.cells[coordinates[0]][coordinates[1]]
    targetCell
      .createNum('board__number_new')
      .setNumContent(num)
      .setNumPositionStyle('left', targetCell, 'offsetLeft')
      .setNumPositionStyle('top', targetCell.parentRow, 'offsetTop')
      .number
      .setStyle('background-color', COLORS[String(num) as keyof typeof COLORS] || COLORS['4096']) //if num is 8192 then render color of 4096
      .setStyle('font-size', `${DEFAULT_FONT_SIZE - FONT_COEF * String(num).length}px`); //set size that depends on length of num
  }

  renderTime(time: number) {
    this.time.setContent(`Time: ${getDate(time)}`);
  }

  renderScore(value: number) {
    this.score.setContent(`Score: ${String(value)}`);
  }

  renderBestScore(value: number) {
    this.bestScore.setContent(`Best Score: ${String(value)}`);
  }

  renderGameOverPopup() {
    const popup = new Popup(document.body, 'div', 'popup', '', 'Game Over!');
    new Component(popup.overlay.node, 'button', 'btn popup-btn', 'Try Again').setListener('click', () => {
      popup.destroy();
      this.destroyNumbers();
      this.renderScore(0);
      this.restartGame();
    });
  }

  renderWinPopup() {
    const popup = new Popup(document.body, 'div', 'popup', '', 'You win!');
    new Component(popup.overlay.node, 'button', 'btn popup-btn', 'Keep Going').setListener('click', () => {
      popup.destroy();
      this.continueTimer();
    });
    new Component(popup.overlay.node, 'button', 'btn popup-btn', 'Try Again').setListener('click', () => {
      popup.destroy();
      this.destroyNumbers();
      this.renderScore(0);
      this.restartGame();
    });
  }

  renderResultsPopup() {
    const popup = new Popup(document.body, 'div', 'popup', '', 'Results table');
    new Component(popup.overlay.node, 'button', 'popup-close-btn', 'x').setListener('click', () => {
      popup.destroy();
    })
    const tableData = this.getTableResultsData();
    if (!tableData.length) {
      new Component(popup.overlay.node, 'div', 'popup-warn', 'There is no results');
      return;
    }
    const renderResultsTable = (tableData: IResult[], timeClass: string, valueClass: string) => {
      const table = new Component(popup.overlay.node, 'table', 'results-table', '');
      const thead = new Component(table.node, 'thead', '', '');
      new Component(thead.node, 'th', '', '№');
      new Component(thead.node, 'th', `table-header time-header ${timeClass}`, 'Time').setListener('click', () => {
        this.timeOrder = this.timeOrder === 'ASC' ? 'DESC' : 'ASC';
        table.destroy();
        if (this.timeOrder === 'ASC') {
          renderResultsTable(this.getSortedTableResultsData('time', this.timeOrder), 'table-header_asc', '');
        } else {
          renderResultsTable(this.getSortedTableResultsData('time', this.timeOrder), 'table-header_desc', '');
        }
      })
      new Component(thead.node, 'th', `table-header value-header ${valueClass}`, 'Value').setListener('click', () => {
        this.valueOrder = this.valueOrder === 'ASC' ? 'DESC' : 'ASC';
        table.destroy();
        if (this.valueOrder === 'ASC') {
          renderResultsTable(this.getSortedTableResultsData('time', this.valueOrder), '', 'table-header_asc');
        } else {
          renderResultsTable(this.getSortedTableResultsData('time', this.valueOrder), '', 'table-header_desc');
        }
      })
      const tbody = new Component(table.node, 'tbody', '', '');
      for (let i = 0; i < tableData.length; i++) {
        const tr = new Component(tbody.node, 'tr', '', '');
        new Component(tr.node, 'td', '', `${i + 1}`);
        new Component(tr.node, 'td', '', `${getDate(tableData[i].time)}`);
        new Component(tr.node, 'td', '', `${tableData[i].winValue}`);
      }
    }
    renderResultsTable(tableData, '', '');
  }

  renderRecordsPopup() {
    const popup = new Popup(document.body, 'div', 'popup', '', 'Records table');
    new Component(popup.overlay.node, 'button', 'popup-close-btn', 'x').setListener('click', () => {
      popup.destroy();
    })
    const tableData = this.getTableRecordsData();
    if (!tableData.length) {
      new Component(popup.overlay.node, 'div', 'popup-warn', 'There is no records');
      return;
    }
    const renderRecordsTable = (tableData: IResult[], timeClass: string, valueClass: string) => {
      const table = new Component(popup.overlay.node, 'table', 'records-table', '');
      const thead = new Component(table.node, 'thead', '', '');
      new Component(thead.node, 'th', '', '№');
      new Component(thead.node, 'th', `table-header time-header ${timeClass}`, 'Time').setListener('click', () => {
        this.timeOrder = this.timeOrder === 'ASC' ? 'DESC' : 'ASC';
        table.destroy();
        if (this.timeOrder === 'ASC') {
          renderRecordsTable(this.getSortedTableRecordsData('time', this.timeOrder), 'table-header_asc', '');
        } else {
          renderRecordsTable(this.getSortedTableRecordsData('time', this.timeOrder), 'table-header_desc', '');
        }
      })
      new Component(thead.node, 'th', `table-header value-header ${valueClass}`, 'Value').setListener('click', () => {
        this.valueOrder = this.valueOrder === 'ASC' ? 'DESC' : 'ASC';
        table.destroy();
        if (this.valueOrder === 'ASC') {
          renderRecordsTable(this.getSortedTableRecordsData('time', this.valueOrder), '', 'table-header_asc');
        } else {
          renderRecordsTable(this.getSortedTableRecordsData('time', this.valueOrder), '', 'table-header_desc');
        }
      })
      const tbody = new Component(table.node, 'tbody', '', '');
      for (let i = 0; i < tableData.length; i++) {
        const tr = new Component(tbody.node, 'tr', '', '');
        new Component(tr.node, 'td', '', `${i + 1}`);
        new Component(tr.node, 'td', '', `${getDate(tableData[i].time)}`);
        new Component(tr.node, 'td', '', `${tableData[i].winValue}`);
      }
    }
    renderRecordsTable(tableData, '', '');
  }

  async moveTo(last: number[], current: number[], isMerge: boolean): Promise<void> {
    const fromCell = this.cells[last[0]][last[1]];
    const toCell = this.cells[current[0]][current[1]];
    if (!isMerge) {
      toCell.number = fromCell.number;
      fromCell.number = null;
      toCell.setNumPositionStyle('left', toCell, 'offsetLeft').setNumPositionStyle('top', toCell.parentRow, 'offsetTop');
      return new Promise(resolve => {
        toCell.number.setListener(
          "transitionend",
          () => {
            resolve()
          },
          {
            once: true,
          }
        )
      })
    } else {
      fromCell.setNumPositionStyle('left', toCell, 'offsetLeft').setNumPositionStyle('top', toCell.parentRow, 'offsetTop');
      toCell.mergeNumber = fromCell.number;
      fromCell.number = null;
      return new Promise(resolve => {
        toCell.mergeNumber.setListener(
          "transitionend",
          () => {
            toCell.mergeNumber.destroy();
            toCell.mergeNumber = null;
            resolve()
          },
          {
            once: true,
          }
        )
      });
    }
  }

  renderMerging(rowInd: number, cellInd: number, value: number) {
    const cell = this.cells[rowInd][cellInd];
    cell.setNumContent(value).number.setStyle('font-size', `${DEFAULT_FONT_SIZE - FONT_COEF * String(value).length}px`);
    if (value > 4096) {
      cell.number.setStyle('background-color', COLORS['4096']);
    } else {
      cell.number.setStyle('background-color', COLORS[String(value) as keyof typeof COLORS]);
    }
  }
}
