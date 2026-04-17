// Lightweight FSRS-inspired scheduler.
// Not a full FSRS implementation — simpler, tuned for a personal daily-use app.
// Rating: 1=Again, 2=Hard, 3=Good, 4=Easy.

import { CardState, CardStateRow, Rating, SchedulingResult } from './types';

const DAY = 24 * 60 * 60 * 1000;

// Learning steps in minutes for new / lapsed cards.
const LEARNING_STEPS_MIN = [1, 10];
const RELEARNING_STEPS_MIN = [10];
const GRADUATING_INTERVAL_DAYS = 1;
const EASY_INTERVAL_DAYS = 4;

const MIN_DIFFICULTY = 1.3;
const MAX_DIFFICULTY = 10;

function clampDifficulty(d: number) {
  return Math.min(MAX_DIFFICULTY, Math.max(MIN_DIFFICULTY, d));
}

function intervalFromStability(stability: number, rating: Rating): number {
  // Base multiplier per rating
  const mult = rating === 2 ? 1.2 : rating === 3 ? 2.5 : rating === 4 ? 3.6 : 0;
  const next = Math.max(1, Math.round(stability * mult));
  return next;
}

export function initialState(): Omit<CardStateRow, 'card_id'> {
  return {
    state: CardState.New,
    stability: 0,
    difficulty_factor: 5,
    due_at: Date.now(),
    last_reviewed_at: null,
    reps: 0,
    lapses: 0,
  };
}

export function schedule(
  current: CardStateRow | Omit<CardStateRow, 'card_id'>,
  rating: Rating,
  now: number = Date.now(),
): SchedulingResult {
  const st = current.state;
  let difficulty = current.difficulty_factor;
  let stability = current.stability;
  let nextState: CardState = st;
  let intervalDays = 0;
  let dueAt = now;

  if (st === CardState.New) {
    if (rating === 1) {
      nextState = CardState.Learning;
      dueAt = now + LEARNING_STEPS_MIN[0] * 60 * 1000;
      stability = 0;
      difficulty = clampDifficulty(difficulty + 0.4);
    } else if (rating === 2) {
      nextState = CardState.Learning;
      dueAt = now + LEARNING_STEPS_MIN[1] * 60 * 1000;
      stability = 0;
      difficulty = clampDifficulty(difficulty + 0.1);
    } else if (rating === 3) {
      nextState = CardState.Review;
      stability = GRADUATING_INTERVAL_DAYS;
      intervalDays = GRADUATING_INTERVAL_DAYS;
      dueAt = now + intervalDays * DAY;
    } else {
      nextState = CardState.Review;
      stability = EASY_INTERVAL_DAYS;
      intervalDays = EASY_INTERVAL_DAYS;
      difficulty = clampDifficulty(difficulty - 0.4);
      dueAt = now + intervalDays * DAY;
    }
  } else if (st === CardState.Learning || st === CardState.Relearning) {
    const steps = st === CardState.Learning ? LEARNING_STEPS_MIN : RELEARNING_STEPS_MIN;
    if (rating === 1) {
      dueAt = now + steps[0] * 60 * 1000;
      difficulty = clampDifficulty(difficulty + 0.3);
    } else if (rating === 2) {
      dueAt = now + steps[Math.min(1, steps.length - 1)] * 60 * 1000;
      difficulty = clampDifficulty(difficulty + 0.1);
    } else if (rating === 3) {
      nextState = CardState.Review;
      stability = GRADUATING_INTERVAL_DAYS;
      intervalDays = GRADUATING_INTERVAL_DAYS;
      dueAt = now + intervalDays * DAY;
    } else {
      nextState = CardState.Review;
      stability = EASY_INTERVAL_DAYS;
      intervalDays = EASY_INTERVAL_DAYS;
      difficulty = clampDifficulty(difficulty - 0.3);
      dueAt = now + intervalDays * DAY;
    }
  } else {
    // Review
    if (rating === 1) {
      nextState = CardState.Relearning;
      difficulty = clampDifficulty(difficulty + 1.0);
      stability = Math.max(1, stability * 0.3);
      dueAt = now + RELEARNING_STEPS_MIN[0] * 60 * 1000;
      intervalDays = 0;
    } else {
      // Adjust difficulty based on performance
      if (rating === 2) difficulty = clampDifficulty(difficulty + 0.15);
      else if (rating === 4) difficulty = clampDifficulty(difficulty - 0.2);
      // Stability grows based on rating; difficulty dampens growth
      const base = intervalFromStability(Math.max(1, stability), rating);
      const difficultyPenalty = 1 - (difficulty - MIN_DIFFICULTY) / (MAX_DIFFICULTY - MIN_DIFFICULTY) * 0.35;
      intervalDays = Math.max(1, Math.round(base * difficultyPenalty));
      // Add slight fuzz to avoid clustering (±5%)
      const fuzz = 1 + (pseudoRandom(stability + rating) - 0.5) * 0.1;
      intervalDays = Math.max(1, Math.round(intervalDays * fuzz));
      stability = intervalDays;
      dueAt = now + intervalDays * DAY;
    }
  }

  return {
    state: nextState,
    stability,
    difficulty_factor: difficulty,
    due_at: dueAt,
    interval_days: intervalDays,
  };
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 999.19) * 43758.5453;
  return x - Math.floor(x);
}
