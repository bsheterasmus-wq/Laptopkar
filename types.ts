export enum TimerState {
  STOPPED = 'STOPPED',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
}

export interface Team {
  name: string;
  score: number;
}

export interface Penalty {
  playerNumber: string;
  timeLeft: number;
  teamName: string;
}

export interface Substitution {
  teamName: string;
  playerOut: string;
  playerIn: string;
  gameTime: number; // The time on the main clock when sub happened
  score: string;
}

export interface ScoreLogEntry {
  teamName: string;
  score: string;
  gameTime: number;
}
