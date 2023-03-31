import { View } from './views/view';
import GameModel from './models/gameModel';
import { IKeyCodes } from '../interfaces/IKeyCodes';
import { StorageModel } from './models/storageModel';
import { ALLOWED_DISTANCE, ALLOWED_TIME, STATE_KEYS } from '../constants/constants';
import { RecordsModel } from './models/recordsModel';
import Timer from './models/timer';
import Score from './models/score';
import Table from './models/table';
import User from './models/user';
import API from '../api/api';

export class Controller {
  view: View;
  gameModel: GameModel;
  keyCodes: IKeyCodes = {
    ArrowUp: 'toUp',
    ArrowRight: 'toRight',
    ArrowDown: 'toDown',
    ArrowLeft: 'toLeft'
  };
  storageModel: StorageModel;
  recordsModel: RecordsModel;
  timer: Timer;
  score: Score;
  tableModel: Table;
  user: User;
  constructor(node: HTMLElement) {
    this.timer = new Timer();
    this.score = new Score();
    this.tableModel = new Table();
    this.gameModel = new GameModel();
    this.storageModel = new StorageModel();
    this.recordsModel = new RecordsModel();
    this.view = new View(node);
    this.bindMethods(); // биндинг методов моделей и вью для их взаимодействия друг с другом
    this.view.renderPage(); // рендер страницы
    this.bindViewMethods(); // биндинг методов объектов View и методов моделей
    const storageData = this.storageModel.load(STATE_KEYS);
    this.gameModel.initGame(storageData);
    this.score.initScore(storageData);
    this.timer.initTime(storageData);
    this.handleKey();
    this.handlePointer();
    this.handleSavingState();
    this.handleResize(); // методы для обработки событий
    if (!this.storageModel.state.login) {
      // если в локал сторедже нет имени пользователя, то рендерим попап с формой для ввода имени
      this.view.renderLoginForm();
      this.gameModel.playable = false;
    } else {
      // иначе сохраняем то значение, которое есть в локал сторедже
      this.user = new User(this.storageModel.state.login);
    }
    if (this.storageModel.state.time) {
      // если в локал сторедже уже есть сохраненная игра, то отправляем запрос на обновление времени из локал стореджа
      API.initTime({ time: Number(this.storageModel.state.time) });
    } 
  }

  handleResize() {
    window.addEventListener('resize', () => {
      // метод для изменения положения ячеек в мобилке и на десктопе
      this.view.gameView.cells.forEach((row) =>
        row.forEach((cell) => {
          if (cell.number)
            cell
              .setNumPositionStyle('left', cell, 'offsetLeft')
              .setNumPositionStyle('top', cell.parentRow, 'offsetTop');
        })
      );
    });
  }

  bindViewMethods() {
    this.gameModel.onUpdateBoard = this.view.gameView.renderNum.bind(this.view.gameView); // при появлении нового числа в модеди игрового поля это число рендерится во вью
    this.gameModel.moveTo = this.view.gameView.moveTo.bind(this.view.gameView); // перемещение чисел
    this.gameModel.onMerge = this.view.gameView.renderMerging.bind(this.view.gameView); // мерж чисел
    this.timer.onUpdateTime = this.view.header.renderTime.bind(this.view.header); // при обновлении времени оно перерендеривается
    this.score.onUpdateBestScore = this.view.header.renderBestScore.bind(this.view.header); // при обновлении лучшего счета оно перерендеривается
    this.gameModel.onUpdateBoardsStack = this.view.header.toggleBackBtnClass.bind(this.view.header); // метод для переключения поведения кнопки назад, если в стэке есть элементы, то кнопка возврата назад становится активной
  }

  bindMethods() {
    this.gameModel.checkGameStatus = async () => {
      this.gameModel.playable = true; // игра становится активной
      if (!this.gameModel.isEmptyCell() && !this.gameModel.isMergeSiblingNumbers()) {
        this.timer.stopTimer();
        this.gameModel.onGameOver();
        this.gameModel.playable = false; // если нет пустых ячеек и нельзя ничего замержить, то останавливается время, рендерится попап проигрыша, игра становится не активной
      }
      if (!this.gameModel.isWin()) {
        return; // если победа не произошла, то выходим из функции
      }
      this.gameModel.valueForWin *= 2; // меняем значение, которое нужно для победы. Необоходимо для бесконечной игры
      if (!this.gameModel.is2048Reached) {
        // если же произошла победа и игрок впервые достиг 2048
        await API.addUser({ user: this.user.name }); // добавляем в базу данных имя пользователя
        this.gameModel.playable = false; // игра становится не активной
        this.timer.stopTimer(); // время останавливается
        this.gameModel.onWin(); // рендерится попап выигрыша
        this.gameModel.is2048Reached = true; // указываем, что игрок достиг 2048
      }
    };
    this.gameModel.updateScore = this.score.updateScore.bind(this.score); // если в результате хода произошел мерж, то обновляется счет в модели счета
    this.gameModel.onUpdateScoresStack = this.score.updateScoresStack.bind(this.score);
    this.gameModel.getScore = () => this.score.scoreValue;
    this.score.onUpdateScore = this.view.renderScore.bind(this.view); // при обновлении он счета перерендеривается
    this.gameModel.onGameOver = this.view.renderGameOverPopup.bind(this.view); // если произошел гейм овер, то рендерится соответствующий попап
    this.gameModel.onWin = this.view.renderWinPopup.bind(this.view); // если произошел выигрыш, то рендерится соответствующий попап
    this.view.isBackBtnEnable = this.gameModel.isPreviousBoard.bind(this.gameModel); // от того, есть ли в стеке игровых полей игровое поле, зависит активность кнопки Back
    this.view.pauseGame = () => (this.gameModel.playable = false); // при открытии попапа ставим игру на паузу
    this.view.restartGame = async () => {
      // рестарт игры, если нажали на New Game
      API.initTime({ time: 0 });
      this.gameModel.initGame();
      this.timer.initTime();
      this.score.initScore();
    };
    this.view.onBack = () => {
      // если нажали на Back
      this.gameModel.board = this.gameModel.boardsStack.pop(); // игровое поле меняется на последнее значение из стэка игровых полей
      this.score.scoreValue = this.score.scoresStack.pop(); // значение счета меняется на последнее значение из стэка счетов
      this.gameModel.board.forEach((row, rowInd) =>
        row.forEach((cell, cellInd) => {
          if (cell && cell.value) {
            this.gameModel.onUpdateBoard([rowInd, cellInd], cell.value); // пробегаемся по ячейкам и перерендериваем поле
          }
        })
      );
      this.score.onUpdateScore(this.score.scoreValue); // обновляем значение счета
      if (!this.gameModel.boardsStack.length) {
        // если в стэке больше нет полей, то делаем кнопку неактивной
        this.gameModel.onUpdateBoardsStack(false);
      }
    };
    this.view.continueTimer = this.timer.startTimer.bind(this.timer); // метод для продолжения хода времени
    this.view.onSort = (sortName: 'time' | 'user') => {
      // метод для сортировки значений в таблице рекордов
      this.tableModel.changeOrder(sortName); // меняем порядок сортировки для того столбца, название которого передано в метод
      this.recordsModel.sortRecords(sortName, this.tableModel[sortName]); // сортируем результаты в модели результатов
      this.view.renderTableBody(this.recordsModel.getSlicedData(), this.recordsModel.pageNumber); // перерендериваем таблицу
    };
    this.view.paginationClickHandle = (term: number) => {
      // обработка клика по кнопкам Prev и Next
      this.view.tbody.destroy(); // уничтожаем таблицу
      this.recordsModel.pageNumber += term; // меняем номер страницы в таблице рекордов. Если нажали на Prev, то номер уменьшается на 1, иначе увеличивается
      this.view.renderTableBody(this.recordsModel.getSlicedData(), this.recordsModel.pageNumber); // перерендер таблицы с учетом нового номера страницы
      this.view.editPagination(this.recordsModel.pageNumber, this.recordsModel.records.length); // редактируем кнопки пагинации и текст номера
    };
    this.view.continueGame = () => (this.gameModel.playable = true); // метод для продолжения игры, игра вновь становится активной
    this.view.openRecordsPopup = async () => {
      this.recordsModel.loadRecords(await API.getUsers());
      this.view.renderRecordsPopup(this.recordsModel.getSlicedData(), this.recordsModel.pageNumber); // рендерим попап, передавая туда данные из модели рекордов
      this.view.editPagination(this.recordsModel.pageNumber, this.recordsModel.records.length); // устанавливаем атрибуты для кнопок и текст номера страницы
    };
    this.view.onSend = (name: string) => {
      this.user = new User(name);
      this.gameModel.playable = true;
    }
  }

  handleSavingState() {
    // перед уходом со страницы сохраняем все необходимые значения в локал сторедж
    window.onbeforeunload = () => {
      this.storageModel.save({
        bestScore: String(this.score.bestScoreValue),
        score: String(this.score.scoreValue),
        time: String(this.timer.time),
        board: JSON.stringify(this.gameModel.board),
        boardsStack: JSON.stringify(this.gameModel.boardsStack),
        scoresStack: JSON.stringify(this.score.scoresStack),
        winValue: String(this.gameModel.valueForWin),
        is2048Reached: String(this.gameModel.is2048Reached),
        login: this.user.name
      });
    }; 
  }

  handleKey() {
    // обработка клавиш
    document.addEventListener('keydown', (e) => {
      let isArrow = false;
      Object.keys(this.keyCodes).forEach((keyCode) => {
        if (e.code === keyCode) {
          isArrow = true;
        }
      });
      if (!isArrow) {
        // если нажали не на стрелочку, то выходим из функции
        return;
      }
      e.preventDefault();
      if (this.gameModel.playable) {
        // если игра активна, то двигаем игровое поле по соответсвующему направлению
        this.gameModel.moveBoard(this.keyCodes[String(e.code) as keyof typeof this.keyCodes]);
      }
    });
  }

  handlePointer() {
    // метод для обработки событий мыши и тача
    let startX: number; // стартовое положение мыши по оси Х при нажатии на ЛКМ
    let finishX: number; // конечное положение мыши по оси X при отпускании ЛКМ
    let startY: number; // стартовое положение мыши по оси Y при нажатии на ЛКМ
    let finishY: number; // конечное положение мыши по оси Y при отпускании ЛКМ
    let startTime: Date; // время в которое была нажата ЛКМ
    let finishTime: Date; // время, в которое ЛКМ была отпущена
    const allowedTime = ALLOWED_TIME; // время за которое ЛКМ должна быть нажата и отпущена
    let distanceX: number; // расстояние по оси X между точкой, в которой была нажата ЛКМ и точкой, в которой ЛКМ была отпущена
    let distanceY: number; // расстояние по оси Y между точкой, в которой была нажата ЛКМ и точкой, в которой ЛКМ была отпущена
    const allowedDistanceX = ALLOWED_DISTANCE; // минимально допустимое расстояние по оси X, которое необходимо для успешного перемещения чисел
    const allowedDistanceY = ALLOWED_DISTANCE; // минимально допустимое расстояние по оси Y, которое необходимо для успешного перемещения чисел
    const startEvent = (e: MouseEvent | Touch) => {
      startX = e.pageX; // установка стартовых значений при нажатии на ЛКМ
      startY = e.pageY;
      startTime = new Date();
    };
    const stopEvent = (e: MouseEvent | Touch) => {
      finishX = e.pageX; // установка конечных значений при отпускании ЛКМ
      finishY = e.pageY;
      distanceX = Math.abs(finishX - startX);
      distanceY = Math.abs(finishY - startY); // расстояние берем по модулю, т.к. перемещение может быть справа налево
      finishTime = new Date();
      const allowedX = distanceX > allowedDistanceX;
      const allowedY = distanceY > allowedDistanceY;
      const permittedTime = finishTime.getTime() - startTime.getTime() > allowedTime;
      let direction: keyof IKeyCodes;
      if (allowedX && !allowedY && permittedTime) {
        // если расстояние по оси X больше минимального и расстояние по оси Y меньше минимального и нажатие и отпускание ЛКМ произошло в разрешенное время
        direction = finishX - startX >= 0 ? 'ArrowRight' : 'ArrowLeft'; // то перемещаем доску горизонтально. Если перемещение было справа налево, то есть стартовая точка по оси X больше конечной точки по оси Х, то перемещаем доску влево, иначе направо
      }
      if (!allowedX && allowedY && permittedTime) {
        // если расстояние по оси Y больше минимального и расстояние по оси X меньше минимального и нажатие и отпускание ЛКМ произошло в разрешенное время
        direction = finishY - startY >= 0 ? 'ArrowDown' : 'ArrowUp'; // то перемещаем доску вертикально. Если конечная точка больше начальной, значит произошло перемещение вверх, иначе вниз
      }
      if (!direction) {
        // если ни одно условие не сработало и направление не указано, то выходим из функции
        return;
      }
      if (this.gameModel.playable) {
        // если игра активна, то перемещаем поле в соответствии с направлением
        this.gameModel.moveBoard(this.keyCodes[direction]);
      }
    };
    document.body.addEventListener('mousedown', (e) => {
      // установка обработчиков на документе при клике
      startEvent(e);
    });
    document.body.addEventListener('mouseup', (e) => {
      stopEvent(e);
    });
    this.view.gameView.gameBoard.setListener('touchmove', (e) => {
      // установка обработчиков на игровом поле при нажатии на сенсор
      e.preventDefault();
    });
    this.view.gameView.gameBoard.setListener('touchstart', (e) => {
      e.preventDefault();
      startEvent((e as TouchEvent).touches[0]);
    });
    this.view.gameView.gameBoard.setListener('touchend', (e) => {
      e.preventDefault();
      stopEvent((e as TouchEvent).changedTouches[0]);
    });
  }
}
