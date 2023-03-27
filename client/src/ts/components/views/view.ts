import Component from "../../common/component";
import Popup from "../../common/popup";
import PaginationView from './paginationView';
import Header from './header';
import PopupView from './popupView';
import GameView from './gameView';
import { COUNT_PER_PAGE } from "../../constants/constants";
import { getDate } from "../../helperFunctions/getDate";
import { IRecord } from "../../interfaces/IRecord";

export class View {
  recordsBtn: Component<HTMLElement>; // кнопка рекордов
  recordsContainer: Component<HTMLElement>; // контейнер для кнопки рекордов
  howToPlay: Component<HTMLElement>; // инструкция по игре
  continueTimer: () => void; // метод для продолжения игры
  restartGame: () => void; // метод для рестарта игры
  onBack: () => void; // метод для возвращения поля к предыдущему состоянию
  isBackBtnEnable: () => boolean; // метод, определяющий, активна ли кнопка Back
  backDrop: Popup; // бэкдроп попапа
  onSort: (sortName: 'time' | 'winValue') => void; // метод для сортировки таблицы рекордов. Реализуется в контроллере
  continueGame: () => void; // метод для продолжения игры
  pauseGame: () => void; // метод для постановки игры на паузу
  pagination: PaginationView; // компонент пагинации
  paginationClickHandle: (term: number) => void; // метод обработки клика по кнопкам Prev и Next
  table: Component<HTMLElement>; // таблица рекордов
  openRecordsPopup: () => void; // метод открытия попапа с таблицей рекордов. Реализуется в контроллере
  tableWrapper: Component<HTMLElement>; // контейнер таблицы
  header: Header;
  gameView: GameView; // вьюха, отрисовывающая игровое поле
  parentNode: HTMLElement;
  tbody: Component;
  constructor(parentNode: HTMLElement) {
    this.parentNode = parentNode;
  }

  renderPage() {
    this.header = new Header( // создание хедера, передача туда методов
      this.parentNode,
      this.destroyNumbers,
      this.restartGame,
      this.renderScore,
      this.isBackBtnEnable,
      this.onBack
    );
    this.gameView = new GameView(this.parentNode); // создание игрового поля
    this.recordsContainer = new Component(this.parentNode, 'div', 'results-container', '');
    this.recordsBtn = new Component(
      this.recordsContainer.node,
      'button',
      'btn records-btn',
      'Records table'
    ).setListener('click', () => {
      // по нажатию на кнопку открытия таблицы рекордов игра останавливается и открывается попап
      this.pauseGame();
      this.openRecordsPopup();
    });
    this.howToPlay = new Component(
      this.parentNode,
      'p',
      'instruction',
      'How to play: use arrow keys, swipe on phone or hold down the left mouse button and drag the mouse in different directions to move the numbers.'
    );
  }

  renderScore = (value: number) => {
    // установка нового значения счета
    this.header.score.setContent(`Score: ${String(value)}`);
  };

  destroyNumbers = () => {
    // метод для удаления всех чисел из дома
    this.gameView.cells.forEach((row) =>
      row.forEach((cell) => {
        if (cell.number) {
          cell.number.destroy();
          cell.number = null;
        }
      })
    );
  };

  renderGameOverPopup() {
    const gameOverPopup = new PopupView('Game over!'); // создание попапа геймовера
    gameOverPopup.renderBtn('Try Again', () => {
      // рендер кнопки при клике по которому уничтожается попап, все числа, обнуляется счет и игра стартует заново
      gameOverPopup.backDrop.destroy();
      this.destroyNumbers();
      this.renderScore(0);
      this.restartGame();
    });
  }

  renderWinPopup() {
    const winPopup = new PopupView('You won!'); // создание попапа выигрыша
    winPopup.renderBtn('Keep Going', () => {
      // рендер кнопки при клике по которому уничтожается попап и игра с таймером продолжаются
      winPopup.backDrop.destroy();
      this.continueTimer();
      this.continueGame();
    });
    winPopup.renderBtn('Try Again', () => {
      winPopup.backDrop.destroy(); // рендер кнопки при клике по которому уничтожается попап, все числа, обнуляется счет и игра стартует заново
      this.destroyNumbers();
      this.renderScore(0);
      this.restartGame();
    });
  }

  renderRecordsPopup(tableData: IRecord[], pageNumber: number) {
    const recordsPopup = new PopupView('Records table'); // создается попап с таблицей рекордов
    recordsPopup.backDrop.setListener('click', (e) => {
      // при клике на бэкдроп попап закрывается и игра продолжается
      if (
        e.target instanceof HTMLElement &&
        recordsPopup.backDrop.node.isEqualNode(e.target) // проверка на то, что кликнули на бэкдроп, а не на один из его потомков
      ) {
        recordsPopup.backDrop.destroy();
        this.continueGame();
      }
    });
    new Component(recordsPopup.popupHeader.node, 'button', 'popup-close-btn', 'x').setListener(
      'click',
      () => {
        recordsPopup.backDrop.destroy();
        this.continueGame();
      }
    ); // создается крестик при клике по которому уничтожается попап и игра продолжается
    if (!tableData.length) {
      new Component(recordsPopup.popup.node, 'div', 'popup-warn', 'There is no records'); // если в таблице нет данных о рекордах, то рендерится текст, что рекордов нет и функция завершает свою работу
      return;
    }
    this.tableWrapper = new Component(recordsPopup.popup.node, 'div', 'table-wrapper', ''); // создается обертка для таблицы
    this.renderTable(tableData, pageNumber); // рендерится таблица
    this.pagination = new PaginationView( // рендерится пагинация
      recordsPopup.popup.node,
      'div',
      'pagination',
      '',
      this.paginationClickHandle
    );
  }

  editPagination(pageNumber: number, countOfItems: number) {
    // редактируем пагинацию
    this.pagination.togglePaginationButton(this.pagination.prevButton, pageNumber === 1); // меняем атрибут кнопок в зависимости от номера страницы
    this.pagination.togglePaginationButton(
      this.pagination.nextButton,
      pageNumber === Math.ceil(countOfItems / COUNT_PER_PAGE)
    );
    this.pagination.setPageNumber(pageNumber); // устанавливаем номер страницы
  }

  renderTable(tableData: IRecord[], pageNumber: number) {
    this.table = new Component(this.tableWrapper.node, 'table', 'records-table', ''); // создается таблица
    const thead = new Component(this.table.node, 'thead', '', ''); // шапка таблицы
    new Component(thead.node, 'th', '', '№'); // первая колонка со значением номера
    const timeHead = new Component(thead.node, 'th', `table-header time-header`, 'Time').setListener('click', () => {
      this.tbody.destroy(); // при клике на ячейку уничтожается таблица и идет сортировка данных по времени
      this.toggleSortClass(timeHead); // меняется класс для ячейки
      this.onSort('time');
    });
    const valueHead = new Component(thead.node, 'th', `table-header value-header`, 'Value').setListener(
      'click',
      () => {
        this.tbody.destroy();
        this.toggleSortClass(valueHead);
        this.onSort('winValue'); // сортировка по значению
      }
    );
    this.renderTableBody(tableData, pageNumber);
  }

  renderTableBody(tableData: IRecord[], pageNumber: number) {
    this.tbody = new Component(this.table.node, 'tbody', '', ''); // рендер тела таблицы
    for (let i = 0; i < tableData.length; i++) {
      const tr = new Component(this.tbody.node, 'tr', '', ''); // создание строки таблицы
      new Component(tr.node, 'td', '', `${i + 1 + COUNT_PER_PAGE * (pageNumber - 1)}`); // создание ячейки текущего номера
      new Component(tr.node, 'td', '', `${getDate(tableData[i].time)}`); // рендер ячейки со временем
      new Component(tr.node, 'td', '', `${tableData[i].winValue}`); // рендер ячейки со значением
    }
  }

  toggleSortClass(tableHead: Component) {
    if (tableHead.hasClass('table-header_desc')) {
      // если переданный заголовок имеет класс desc, то меняется на asc и наоборот. Для остальных заголовков устанавливается класс по умолчанию
      tableHead.removeClass('table-header_desc');
      tableHead.setClass('table-header_asc');
    } else {
      tableHead.removeClass('table-header_asc');
      tableHead.setClass('table-header_desc');
    }
  }
}
