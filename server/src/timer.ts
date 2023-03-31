export default class Timer {
  time: number;
  timer: NodeJS.Timer;
  constructor() {}

  startTimer(time: number = 0) {
    this.time = time;
    this.timer = setInterval(() => {
      this.time++;
    }, 1000);
  }

  stopTimer() {
    const timer = this.timer;
    clearInterval(timer);
    return this.time;
  }
}
