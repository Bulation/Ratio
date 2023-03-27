import { IGameState } from "../../interfaces/IGameState";

export default class Score {
  scoreValue = 0;
  bestScoreValue = 0;
  scoresStack: number[] = [];
  onUpdateBestScore: (score: number) => void;
  onUpdateScore: (score: number) => void;

  constructor() {}

  initScore(state: Partial<IGameState> = {}) {
    if (Object.keys(state).length) { // установка стартовых значений из локал стореджа
      this.scoresStack = JSON.parse(state.scoresStack);
      this.scoreValue = Number(state.score);
      this.bestScoreValue = Number(state.bestScore);
    } else {
      this.scoresStack = [];
      this.scoreValue = 0;
    }
    this.onUpdateScore(this.scoreValue); // апдейт вьюхи
    this.onUpdateBestScore(this.bestScoreValue);
  }
  
  updateScore(value: number) {
    this.scoreValue += value * 2; // обновление счета
    this.onUpdateScore(this.scoreValue); // апдейт вьюхи
    if (this.scoreValue > this.bestScoreValue) { // если текущий счет превысил лучший
      this.bestScoreValue = this.scoreValue; // обновляем лучший счет
      this.onUpdateBestScore(this.bestScoreValue); // апдейтим вьюху лучшего счета
    }
  }

  updateScoresStack(scoreValue: number) {
    this.scoresStack.push(scoreValue);
  }
}