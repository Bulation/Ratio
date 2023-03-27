import { IGameState } from '../../interfaces/IGameState';

export default class Timer {
  timer: NodeJS.Timer;
  time = 0; // количество секунд, прошедших с начала игры
  onUpdateTime: (time: number) => void;
  constructor() {}

  initTime(state: Partial<IGameState> = {}) {
    if (Object.keys(state).length) {
      // загрузка времени из локал стореджа
      this.time = Number(state.time);
    } else {
      this.time = 0;
    }
    this.stopTime(); // уничтожение интервала
    this.onUpdateTime(this.time); // апдейт времени во вьюхе
    this.startTime(); // старт интервала
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
}
