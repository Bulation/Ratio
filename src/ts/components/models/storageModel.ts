import { IGameState } from "../../interfaces/IGameState";

export class StorageModel {
  state: IGameState = {
    'bestScore': '',
    'score': '',
    'time': '',
    'board': '',
    'boardsStack': '',
    'scoresStack': '',
    'winValue': '',
    'is2048Reached': '',
    'records': ''
  };
  constructor() {}

  save(state: IGameState) { // сохранение данных в локал сторедж
    Object.keys(state).forEach((stateKey) => {
      localStorage.setItem(stateKey, state[stateKey as keyof typeof state]);
    })
  }

  has(keys: string[]) { // проверка на то, есть ли ключи в локал сторедже
    return keys.every((key) => localStorage.getItem(key) !== null);
  }

  load(keys: string[]) { // загрузка данных из локал стореджа
    if (!this.has(keys)) {
      return {};
    }
    keys.forEach((stateKey) => {
      this.state[stateKey as keyof IGameState] = localStorage.getItem(stateKey);
    })
    return this.state;
  }
}