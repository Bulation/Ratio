import { BOARD_SIZE, MAX_DEFAULT_NUM, MIN_DEFAULT_NUM, PROBABILITY, NUMBERS_ON_TOP_OF_BOARD, NUMBERS_ON_RIGHT_OF_BOARD, NUMBERS_ON_BOTTOM_OF_BOARD, NUMBERS_ON_LEFT_OF_BOARD, WIN_VALUE } from "../constants/constants";
import { IDirections } from "../interfaces/IDirections";
import { IGameState } from "../interfaces/IGameState";
import { INumber } from "../interfaces/INumber";

export class Model {
  private winTime: number;
  private winResult: number;
  private _score: number;
  private _bestScore = 0;
  private _boardsStack: Array<INumber[][]> = [];
  private _scoresStack: number[] = [];
  private _board: INumber[][];
  private _time: number;
  private _timer: NodeJS.Timer;
  private directions: IDirections = {
    toUp: NUMBERS_ON_TOP_OF_BOARD,
    toRight: NUMBERS_ON_RIGHT_OF_BOARD,
    toDown: NUMBERS_ON_BOTTOM_OF_BOARD,
    toLeft: NUMBERS_ON_LEFT_OF_BOARD,
  };
  playable = true;
  valueForWin: number;
  isWin = false;
  moveTo: (last: number[], current: number[], isMerge: boolean) => Promise<void>;
  onUpdate: (coordinates: number[], num: number) => void;
  onUpdateScore: (score: number) => void;
  onMerge: (rowInd: number, cellInd: number, value: number) => void;
  onGameOver: () => void;
  onUpdateBestScore: (score: number) => void;
  onWin: () => void;
  onUpdateTime: (time: number) => void;
  onUpdateBoardsStack: (isBoardLength: boolean) => void;
  sendResult: (winTime: number, winResult: number) => void;
  sendRecord: (winTime: number, winResult: number) => void;

  constructor() {}

  get bestScore() {
    return this._bestScore;
  }
  set bestScore(value) {
    this._bestScore = value;
  }
  get score() {
    return this._score;
  }
  set score(value) {
    this._score = value;
  }
  get boardsStack() {
    return this._boardsStack;
  }
  set boardsStack(value) {
    this._boardsStack = value;
  }
  get scoresStack() {
    return this._scoresStack;
  }
  set scoresStack(value) {
    this._scoresStack = value;
  }
  get board() {
    return this._board;
  }
  set board(value) {
    this._board = value;
  }
  get time() {
    return this._time;
  }
  set time(value) {
    this._time = value;
  }
  get timer() {
    return this._timer;
  }
  set timer(value) {
    this._timer = value;
  }

  initGame(state: Partial<IGameState> = {}) {
    if (Object.keys(state).length) {
      this.score = Number(state.score);
      this.bestScore = Number(state.bestScore);
      this.board = JSON.parse(state.board);
      this.boardsStack = JSON.parse(state.boardsStack);
      this.scoresStack = JSON.parse(state.scoresStack);
      this.board.forEach((row, rowInd) => row.forEach((cell, cellInd) => {
        if (cell && cell.value) {
          this.onUpdate([rowInd, cellInd], cell.value);
        }
      }));
      this.time = Number(state.time);
      this.valueForWin = Number(state.winValue);
      this.isWin = state.isWin === 'true';
    } else {
      this.score = 0;
      this.board = [...new Array(BOARD_SIZE)].map(() => [...new Array(BOARD_SIZE)]);
      this.boardsStack = [];
      this.scoresStack = [];
      this.insertRandomNum();
      this.time = 0;
      this.valueForWin = WIN_VALUE;
      this.isWin = false;
    }
    if (this.boardsStack.length) {
      this.onUpdateBoardsStack(true);
    } else {
      this.onUpdateBoardsStack(false);
    }
    this.stopTime();
    this.onUpdateTime(this.time);
    this.startTime();
    this.onUpdateScore(this.score);
    this.onUpdateBestScore(this.bestScore);
  }

  insertRandomNum() {
    if (!this.isEmptyCell()) {
      return false;
    }
    const randomNum = Math.random() <= PROBABILITY ? MIN_DEFAULT_NUM : MAX_DEFAULT_NUM;
    let randomIndex = [Math.floor(Math.random() * BOARD_SIZE), Math.floor(Math.random() * BOARD_SIZE)];
    while (this.board[Math.floor(randomIndex[0])][Math.floor(randomIndex[1])]) {
      randomIndex = [Math.floor(Math.random() * BOARD_SIZE), Math.floor(Math.random() * BOARD_SIZE)];
    }
    this.board[randomIndex[0]][randomIndex[1]] = {
      value: randomNum,
      mergeValue: null
    };
    this.onUpdate(randomIndex, randomNum);
    this.checkGameStatus();
  }

  checkGameStatus() {
    if (!this.isEmptyCell() && !this.isMergeSiblingNumbers()) {
      this.stopTime();
      this.onGameOver();
    }
    if (this.checkWin()) {
      this.saveGameResult(this.time, this.valueForWin);
      this.sendRecord(this.winTime, this.winResult);
      this.valueForWin *= 2;
      if (!this.isWin) {
        this.stopTime();
        this.onWin();
        this.isWin = true;
        this.sendResult(this.winTime, this.winResult);
      }
    }
    this.playable = true;
  }

  saveGameResult(winTime: number, winResult: number) {
    this.winTime = winTime;
    this.winResult = winResult;
  }
  
  startTime() {
    this.timer = setInterval(() => {
      this.time++;
      this.onUpdateTime(this.time);
    }, 1000);
  }

  stopTime() {
    const timer = this.timer;
    clearInterval(timer);
  }

  backToPreviousBoard() {
    this.board = this.boardsStack.pop();
    this.score = this.scoresStack.pop();
    this.board.forEach((row, rowInd) => row.forEach((cell, cellInd) => {
      if (cell && cell.value) {
        this.onUpdate([rowInd, cellInd], cell.value);
      }
    }));
    this.onUpdateScore(this.score);
    if (!this.boardsStack.length) {
      this.onUpdateBoardsStack(false);
    }
  }

  isPreviousBoard() {
    return this.boardsStack.length;
  }

  isEmptyCell() {
    return this.board.some((arr) => arr.some((el) => Boolean(el) === false));
  }

  checkWin() {
    return this.board.some((arr) => arr.some((el) => el && Number(el.value) === this.valueForWin));
  }

  async moveBoard(direction: keyof IDirections) {
    this.playable = false;
    const currentBoard = [...this.board].map((row) => row.map((cellObj) => { //deep clone of board
      if (cellObj && cellObj.value) {
        return Object.assign({}, cellObj);
      } else {
        return null;
      }
    }));
    const promises = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE - 1; j++) {
        const row = (direction === 'toRight' || direction === 'toLeft') ? i : (direction === 'toUp') ? j + 1 : BOARD_SIZE - 2 - j;
        const col = (direction === 'toUp' || direction === 'toDown') ? i : (direction === 'toLeft') ? j + 1 : BOARD_SIZE - 2 - j;
        const cell = this.board[row][col]; //get cell that we must move to the direction that was sent to the function if we can do it
        if (cell && cell.value) {
          let moveToCellCoordinates: number[] | null = null;
          for (let k = j - 1; k >= -1; k--) {
            const row = (direction === 'toRight' || direction === 'toLeft') ? i : (direction === 'toUp') ? k + 1 : BOARD_SIZE - 2 - k;
            const col = (direction === 'toUp' || direction === 'toDown') ? i : (direction === 'toLeft') ? k + 1 : BOARD_SIZE - 2 - k;
            const foreCell = this.board[row][col]; //get cell on that we must move cell that we got on 212 line if we can do it
            if (!foreCell || !foreCell.value) {
              moveToCellCoordinates = [row, col]; //on this coordinates we must move cell that we got on 212 line
            } else if (cell.value === foreCell.value && foreCell.mergeValue === null) {
              moveToCellCoordinates = [row, col]; //on this coordinates we must move cell that we got on 212 line and merge two cells
              this.score += cell.value * 2;
              this.onUpdateScore(this.score);
              if (this.score > this.bestScore) {
                this.bestScore = this.score;
                this.onUpdateBestScore(this.bestScore);
              }
              break;
            } else {
              break;
            }
          }
          if (moveToCellCoordinates !== null) {
            const from = this.board[row][col];
            const to = this.board[moveToCellCoordinates[0]][moveToCellCoordinates[1]];
            if (from && to && from.value === to.value) { // merging cells
              this.board[moveToCellCoordinates[0]][moveToCellCoordinates[1]] = {
                value: this.board[row][col].value,
                mergeValue: this.board[row][col].value * 2
              }
              promises.push(this.moveTo([row, col], moveToCellCoordinates, true));
            } else if (!to || to.mergeValue === null) { //move cell that we got on 212 line
              this.board[moveToCellCoordinates[0]][moveToCellCoordinates[1]] = {
                value: this.board[row][col].value,
                mergeValue: this.board[row][col].mergeValue
              }
              promises.push(this.moveTo([row, col], moveToCellCoordinates, false));
            }
            this.board[row][col] = null;
          }
        }
      }
    }
    await Promise.all(promises);
    if (promises.length) {
      if (!this.boardsStack.length) {
        this.onUpdateBoardsStack(true);
      }
      this.boardsStack.push(currentBoard);
      this.scoresStack.push(this.score);
      this.mergeNumbers();
      this.insertRandomNum();
    } else {
      this.playable = true;
    }
  }

  isMergeSiblingNumbers() { //check if we can merge sibling numbers
    let isMergeCells = false;
    Object.keys(this.directions).forEach((direction) => {
      for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE - 1; j++) {
          const row = (direction === 'toRight' || direction === 'toLeft') ? i : (direction === 'toUp') ? j + 1 : BOARD_SIZE - 2 - j;
          const col = (direction === 'toUp' || direction === 'toDown') ? i : (direction === 'toLeft') ? j + 1 : BOARD_SIZE - 2 - j;
          const cell = this.board[row][col];
          if (cell && cell.value) {
            const k = j - 1;
            const row = (direction === 'toRight' || direction === 'toLeft') ? i : (direction === 'toUp') ? k + 1 : BOARD_SIZE - 2 - k;
            const col = (direction === 'toUp' || direction === 'toDown') ? i : (direction === 'toLeft') ? k + 1 : BOARD_SIZE - 2 - k;
            const foreCell = this.board[row][col];
            if (foreCell && foreCell.value && cell.value === foreCell.value) {
              isMergeCells = true;
            }
          }
        }
      }
    });
    return isMergeCells;
  }

  mergeNumbers() {
    this.board.forEach((row, rowInd) => row.forEach((cell, cellInd) => {
      if (cell && cell.mergeValue) {
        this.onMerge(rowInd, cellInd, cell.mergeValue);
      }
    }));
    this.board = this.board.map((row) => row.map((cell) => {
      if (cell && cell.mergeValue) {
        return {
          value: cell.mergeValue,
          mergeValue: null
        }
      } else if (cell) {
        return {
          value: cell.value,
          mergeValue: cell.mergeValue
        }
      } else {
        return null;
      }
    }));
  }
}