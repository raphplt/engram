import { getDb } from '../db/client';
import { initialState, schedule } from './scheduler';
import { CardState, Rating } from './types';

export type QueueCard = {
  id: string;
  theme_id: string;
  front: string;
  back: string;
  hint: string | null;
  note: string | null;
  difficulty: number;
  tags: string | null;
  state: CardState;
  stability: number;
  difficulty_factor: number;
  due_at: number;
  reps: number;
  lapses: number;
};

export type QueueOptions = {
  limit?: number;
  themeIds?: string[];
  includeNew?: boolean;
  newLimit?: number;
};

export async function buildQueue(opts: QueueOptions = {}): Promise<QueueCard[]> {
  const db = await getDb();
  const now = Date.now();
  const limit = opts.limit ?? 25;
  const themeFilter =
    opts.themeIds && opts.themeIds.length > 0
      ? `AND c.theme_id IN (${opts.themeIds.map(() => '?').join(',')})`
      : '';
  const themeArgs = opts.themeIds ?? [];

  // Due cards (review or learning)
  const dueRows = await db.getAllAsync<QueueCard>(
    `SELECT c.id, c.theme_id, c.front, c.back, c.hint, c.note, c.difficulty, c.tags,
            s.state, s.stability, s.difficulty_factor, s.due_at, s.reps, s.lapses
     FROM cards c
     INNER JOIN card_state s ON s.card_id = c.id
     INNER JOIN themes t ON t.id = c.theme_id
     WHERE t.enabled = 1 AND s.due_at <= ? ${themeFilter}
     ORDER BY s.due_at ASC
     LIMIT ?`,
    [now, ...themeArgs, limit],
  );

  let newCards: QueueCard[] = [];
  const includeNew = opts.includeNew ?? true;
  const newLimit = Math.max(0, Math.min(opts.newLimit ?? 8, limit - dueRows.length));
  if (includeNew && newLimit > 0) {
    newCards = await db.getAllAsync<QueueCard>(
      `SELECT c.id, c.theme_id, c.front, c.back, c.hint, c.note, c.difficulty, c.tags,
              0 as state, 0 as stability, 5 as difficulty_factor, 0 as due_at, 0 as reps, 0 as lapses
       FROM cards c
       INNER JOIN themes t ON t.id = c.theme_id
       LEFT JOIN card_state s ON s.card_id = c.id
       WHERE t.enabled = 1 AND s.card_id IS NULL ${themeFilter}
       ORDER BY c.difficulty ASC, c.id ASC
       LIMIT ?`,
      [...themeArgs, newLimit],
    );
  }

  return interleave(dueRows, newCards);
}

function interleave<T>(a: T[], b: T[]): T[] {
  const out: T[] = [];
  const maxLen = Math.max(a.length, b.length);
  const ratio = b.length > 0 ? Math.max(1, Math.ceil(a.length / b.length)) : 1;
  let ai = 0;
  let bi = 0;
  while (ai < a.length || bi < b.length) {
    for (let i = 0; i < ratio && ai < a.length; i++) out.push(a[ai++]);
    if (bi < b.length) out.push(b[bi++]);
  }
  return out;
}

export async function applyReview(card: QueueCard, rating: Rating) {
  const db = await getDb();
  const now = Date.now();
  const current = card.state === CardState.New ? { ...initialState(), card_id: card.id } : {
    card_id: card.id,
    state: card.state,
    stability: card.stability,
    difficulty_factor: card.difficulty_factor,
    due_at: card.due_at,
    last_reviewed_at: null,
    reps: card.reps,
    lapses: card.lapses,
  };

  const result = schedule(current, rating, now);
  const newReps = current.reps + 1;
  const newLapses = rating === 1 && current.state === CardState.Review ? current.lapses + 1 : current.lapses;

  await db.runAsync(
    `INSERT INTO card_state (card_id, state, stability, difficulty_factor, due_at, last_reviewed_at, reps, lapses)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(card_id) DO UPDATE SET
       state=excluded.state,
       stability=excluded.stability,
       difficulty_factor=excluded.difficulty_factor,
       due_at=excluded.due_at,
       last_reviewed_at=excluded.last_reviewed_at,
       reps=excluded.reps,
       lapses=excluded.lapses`,
    [
      card.id,
      result.state,
      result.stability,
      result.difficulty_factor,
      result.due_at,
      now,
      newReps,
      newLapses,
    ],
  );

  await db.runAsync(
    'INSERT INTO reviews (card_id, reviewed_at, rating, prev_interval, next_interval) VALUES (?, ?, ?, ?, ?)',
    [card.id, now, rating, card.stability, result.interval_days],
  );

  return result;
}

export async function countDueCards(themeIds?: string[]): Promise<{ due: number; newCards: number }> {
  const db = await getDb();
  const now = Date.now();
  const themeFilter =
    themeIds && themeIds.length > 0 ? `AND c.theme_id IN (${themeIds.map(() => '?').join(',')})` : '';
  const themeArgs = themeIds ?? [];
  const due = await db.getFirstAsync<{ n: number }>(
    `SELECT COUNT(*) as n FROM cards c INNER JOIN card_state s ON s.card_id = c.id
     INNER JOIN themes t ON t.id = c.theme_id
     WHERE t.enabled = 1 AND s.due_at <= ? ${themeFilter}`,
    [now, ...themeArgs],
  );
  const nw = await db.getFirstAsync<{ n: number }>(
    `SELECT COUNT(*) as n FROM cards c
     LEFT JOIN card_state s ON s.card_id = c.id
     INNER JOIN themes t ON t.id = c.theme_id
     WHERE t.enabled = 1 AND s.card_id IS NULL ${themeFilter}`,
    [...themeArgs],
  );
  return { due: due?.n ?? 0, newCards: nw?.n ?? 0 };
}
