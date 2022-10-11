import { IDirections } from "./IDirections";

export interface IKeyCodes {
  'ArrowUp': keyof IDirections,
  'ArrowRight': keyof IDirections,
  'ArrowDown': keyof IDirections,
  'ArrowLeft': keyof IDirections
}