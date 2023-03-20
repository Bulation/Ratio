import Component from '../../common/component';
import { getDate } from '../../helperFunctions/getDate';

export default class Header {
  gameTitle: Component;
  scoreContainer: Component;
  score: Component;
  bestScore: Component;
  gameBtnsContainer: Component;
  restartBtn: Component;
  backBtn: Component;
  time: Component<HTMLElement>;
  constructor(
    parentNode: HTMLElement,
    destroyNumbers: () => void,
    restartGame: () => void,
    renderScore: (value: number) => void,
    isBackBtnEnable: () => boolean,
    onBack: () => void
  ) {
    this.gameTitle = new Component(parentNode, 'h1', 'game-title', '2048'); // создание тайтла
    this.scoreContainer = new Component(parentNode, 'div', 'score-container', ''); // создание контейнера для хранения счета и лучшего счета
    this.score = new Component(this.scoreContainer.node, 'div', 'score', 'Score: 0'); // создание счета
    this.bestScore = new Component(this.scoreContainer.node, 'div', 'best-score', 'Best Score: 0'); // создание лучшего счета
    this.gameBtnsContainer = new Component(parentNode, 'div', 'game-btns-container', ''); // создание контейнера для кнопок
    this.restartBtn = new Component( // создание кнопки для проведения новой игры
      this.gameBtnsContainer.node,
      'button',
      'btn restart-btn',
      'New Game'
    ).setListener('click', () => {
      // при клике на кнопку будут уничтожаться числа во вьюхе, обнуляться счет и будет рестарт игры
      destroyNumbers();
      renderScore(0);
      restartGame();
    });
    this.backBtn = new Component(this.gameBtnsContainer.node, 'button', 'btn back-btn', 'Back') // создание кнопки Back
      .setClass('back-btn_inactive') // Изначально неактивна
      .setListener('click', () => {
        if (isBackBtnEnable()) {
          // если клик возможен и кнопка активна
          destroyNumbers(); // уничтожаем числа
          onBack(); // вызываем метод onBack, который будет рендерить предыдущее игровое поле
        }
      });
    this.time = new Component(parentNode, 'div', 'time', 'Time: 00:00:00'); // создание таймера
  }

  toggleBackBtnClass(isActive: boolean) {
    // метод для изменения внешнего вида кнопки Back в зависимости от того, есть ли в стеке полей поле
    if (isActive) {
      this.backBtn.setClass('back-btn_active');
      this.backBtn.removeClass('back-btn_inactive');
    } else {
      this.backBtn.removeClass('back-btn_active');
      this.backBtn.setClass('back-btn_inactive');
    }
  }

  renderTime(time: number) {
    // установка нового значения времени
    this.time.setContent(`Time: ${getDate(time)}`);
  }

  renderBestScore(value: number) {
    // установка нового значения лучшего счета
    this.bestScore.setContent(`Best Score: ${String(value)}`);
  }
}
