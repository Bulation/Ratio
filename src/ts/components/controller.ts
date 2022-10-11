import { View } from "./view";
import { Model } from "./model";
import { IKeyCodes } from "../interfaces/IKeyCodes";
import { StorageModel } from "./storageModel";
import { ALLOWED_DISTANCE, ALLOWED_TIME, STATE_KEYS } from "../constants/constants";
import { ResultsModel } from "./resultsModel";

export class Controller {
  view: View;
  model: Model;
  keyCodes: IKeyCodes = {
    'ArrowUp': 'toUp',
    'ArrowRight': 'toRight',
    'ArrowDown': 'toDown',
    'ArrowLeft': 'toLeft'
  }
  storageModel: StorageModel;
  resultsModel: ResultsModel;
  constructor(node: HTMLElement) {
    this.model = new Model();
    this.storageModel = new StorageModel();
    this.resultsModel = new ResultsModel();
    this.view = new View(node);
    this.model.onUpdate = this.view.renderNum.bind(this.view);
    this.model.moveTo = this.view.moveTo.bind(this.view);
    this.model.onMerge = this.view.renderMerging.bind(this.view);
    this.model.onUpdateScore = this.view.renderScore.bind(this.view);
    this.model.onUpdateBestScore = this.view.renderBestScore.bind(this.view);
    this.model.onGameOver = this.view.renderGameOverPopup.bind(this.view);
    this.model.onWin = this.view.renderWinPopup.bind(this.view);
    this.model.onUpdateTime = this.view.renderTime.bind(this.view);
    this.model.onUpdateBoardsStack = this.view.toggleBackBtnClass.bind(this.view);
    this.model.sendResult = this.resultsModel.saveResult.bind(this.resultsModel);
    this.model.sendRecord = this.resultsModel.saveRecord.bind(this.resultsModel);
    this.view.isBackBtnEnable = this.model.isPreviousBoard.bind(this.model);
    this.view.restartGame = this.model.initGame.bind(this.model);
    this.view.onBack = this.model.backToPreviousBoard.bind(this.model);
    this.view.continueTimer = this.model.startTime.bind(this.model);
    this.view.getTableResultsData = this.resultsModel.getResults.bind(this.resultsModel);
    this.view.getTableRecordsData = this.resultsModel.getRecords.bind(this.resultsModel);
    this.view.getSortedTableResultsData = this.resultsModel.getSortedResults.bind(this.resultsModel);
    this.view.getSortedTableRecordsData = this.resultsModel.getSortedRecords.bind(this.resultsModel);
    this.model.initGame(this.storageModel.load(STATE_KEYS));
    if (this.storageModel.state.results) {
      this.resultsModel.loadResults(JSON.parse(this.storageModel.state.results));
    }
    if (this.storageModel.state.records) {
      this.resultsModel.loadRecords(JSON.parse(this.storageModel.state.records));
    }
    this.handleKey();
    this.handlePointer();
    this.handleSavingState();
    window.addEventListener('resize', () => {
      this.view.cells.forEach((row) => row.forEach((cell) => {
        if (cell.number)
          cell.setNumPositionStyle('left', cell, 'offsetLeft').setNumPositionStyle('top', cell.parentRow, 'offsetTop');
      }));
    });
  }

  handleSavingState() {
    window.onbeforeunload = () => {
      this.storageModel.save({
        'bestScore': String(this.model.bestScore),
        'score': String(this.model.score),
        'time': String(this.model.time),
        'board': JSON.stringify(this.model.board),
        'boardsStack': JSON.stringify(this.model.boardsStack),
        'scoresStack': JSON.stringify(this.model.scoresStack),
        'winValue': String(this.model.valueForWin),
        'isWin': String(this.model.isWin),
        'results': this.resultsModel.results.length ? JSON.stringify(this.resultsModel.results) : '',
        'records': this.resultsModel.records.length ? JSON.stringify(this.resultsModel.records) : ''
      })
    }
  }

  handleKey() {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (this.model.playable) {
        this.model.moveBoard(this.keyCodes[String(e.code) as keyof typeof this.keyCodes]);
      }
    });
  }

  handlePointer() {
    let startX: number;
    let finishX: number;
    let startY: number;
    let finishY: number;
    let startTime: Date;
    let finishTime: Date;
    const allowedTime = ALLOWED_TIME;
    let distanceX: number;
    let distanceY: number;
    const allowedDistanceX = ALLOWED_DISTANCE;
    const allowedDistanceY = ALLOWED_DISTANCE;
    const startEvent = (e: MouseEvent | Touch) => {
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date();
    }
    const stopEvent = (e: MouseEvent | Touch) => {
      finishX = e.pageX;
      finishY = e.pageY;
      distanceX = Math.abs(finishX - startX);
      distanceY = Math.abs(finishY - startY);
      finishTime = new Date();
      if (distanceX > allowedDistanceX && distanceY < allowedDistanceY  && finishTime.getTime() - startTime.getTime() > allowedTime) {
        if (finishX - startX >= 0) {
          this.model.moveBoard(this.keyCodes['ArrowRight']);
        } else {
          this.model.moveBoard(this.keyCodes['ArrowLeft']);
        }
      }
      else if (distanceX < allowedDistanceX && distanceY > allowedDistanceY && finishTime.getTime() - startTime.getTime() > allowedTime) {
        if (finishY - startY >= 0) {
          this.model.moveBoard(this.keyCodes['ArrowDown']);
        } else {
          this.model.moveBoard(this.keyCodes['ArrowUp']);
        }
      }
    }
    document.body.addEventListener('mousedown', (e) => {
      e.preventDefault();
      startEvent(e);
    });
    document.body.addEventListener('mousemove', (e) => {
      e.preventDefault();
    })
    document.body.addEventListener('mouseup', (e) => {
      e.preventDefault();
      stopEvent(e);
    })
    this.view.gameBoard.setListener('touchmove', (e) => {
      e.preventDefault();
    });
    this.view.gameBoard.setListener('touchstart', (e) => {
      e.preventDefault();
      startEvent((e as TouchEvent).touches[0]);
    });
    this.view.gameBoard.setListener('touchend', (e) => {
      e.preventDefault();
      stopEvent((e as TouchEvent).changedTouches[0]);
    });
  }
}