export interface Step {
  id: number;
  name: string;
  isActive: boolean;
  isDone: boolean;
  onClick: (eventData) => void;
}

export interface Config {
  orientation: Orientations;
}

export enum Orientations {
  horizontal,
  vertical
}
