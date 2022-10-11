import { IGameState } from "../interfaces/IGameState";

export class StorageModel {
  state: IGameState = {
    'bestScore': '',
    'score': '',
    'time': '',
    'board': '',
    'boardsStack': '',
    'scoresStack': '',
    'winValue': '',
    'isWin': '',
    'results': '',
    'records': ''
  };
  constructor() {}

  save(state: IGameState) {
    Object.keys(state).forEach((stateKey) => {
      localStorage.setItem(stateKey, state[stateKey as keyof typeof state]);
    })
  }

  has(keys: string[]) {
    return keys.every((key) => localStorage.getItem(key) !== null);
  }

  load(keys: string[]) {
    if (!this.has(keys)) {
      return {};
    }
    keys.forEach((stateKey) => {
      this.state[stateKey as keyof IGameState] = localStorage.getItem(stateKey);
    })
    return this.state;
  }
}