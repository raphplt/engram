export type Rating = 1 | 2 | 3 | 4; // Again / Hard / Good / Easy

export enum CardState {
  New = 0,
  Learning = 1,
  Review = 2,
  Relearning = 3,
}

export type CardStateRow = {
  card_id: string;
  state: CardState;
  stability: number;
  difficulty_factor: number;
  due_at: number;
  last_reviewed_at: number | null;
  reps: number;
  lapses: number;
};

export type SchedulingResult = {
  state: CardState;
  stability: number;
  difficulty_factor: number;
  due_at: number;
  interval_days: number;
};
