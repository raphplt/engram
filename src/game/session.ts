import { getDb } from '../db/client';
import { computeStreak, dayKey } from './streak';
import { xpForRating } from './xp';
import { Rating } from '../srs/types';

export type UserStats = {
  xp: number;
  streak_days: number;
  longest_streak: number;
  last_active_day: string | null;
  daily_goal: number;
  total_reviews: number;
  created_at: number;
};

export async function getUserStats(): Promise<UserStats> {
  const db = await getDb();
  const row = await db.getFirstAsync<UserStats>(
    'SELECT xp, streak_days, longest_streak, last_active_day, daily_goal, total_reviews, created_at FROM user_stats WHERE id = 1',
  );
  return (
    row ?? {
      xp: 0,
      streak_days: 0,
      longest_streak: 0,
      last_active_day: null,
      daily_goal: 25,
      total_reviews: 0,
      created_at: Date.now(),
    }
  );
}

export async function registerReview(rating: Rating, cardDifficulty: number): Promise<{
  xpGained: number;
  newStats: UserStats;
  streakIncreased: boolean;
}> {
  const db = await getDb();
  const today = dayKey();
  const stats = await getUserStats();
  const xpGained = xpForRating(rating, cardDifficulty);
  const newStreak = computeStreak(stats.last_active_day, today, stats.streak_days);
  const streakIncreased = newStreak > stats.streak_days;
  const newLongest = Math.max(stats.longest_streak, newStreak);

  await db.runAsync(
    `UPDATE user_stats SET
       xp = xp + ?,
       streak_days = ?,
       longest_streak = ?,
       last_active_day = ?,
       total_reviews = total_reviews + 1
     WHERE id = 1`,
    [xpGained, newStreak, newLongest, today],
  );

  await db.runAsync(
    `INSERT INTO daily_progress (day, reviews, xp_earned, new_cards)
     VALUES (?, 1, ?, 0)
     ON CONFLICT(day) DO UPDATE SET
       reviews = reviews + 1,
       xp_earned = xp_earned + ?`,
    [today, xpGained, xpGained],
  );

  const updated = await getUserStats();
  return { xpGained, newStats: updated, streakIncreased };
}

export async function getTodayProgress() {
  const db = await getDb();
  const today = dayKey();
  const row = await db.getFirstAsync<{ reviews: number; xp_earned: number }>(
    'SELECT reviews, xp_earned FROM daily_progress WHERE day = ?',
    [today],
  );
  return row ?? { reviews: 0, xp_earned: 0 };
}

export async function setDailyGoal(goal: number) {
  const db = await getDb();
  await db.runAsync('UPDATE user_stats SET daily_goal = ? WHERE id = 1', [Math.max(5, goal)]);
}

export async function getRecentDays(days: number = 30) {
  const db = await getDb();
  return await db.getAllAsync<{ day: string; reviews: number; xp_earned: number }>(
    'SELECT day, reviews, xp_earned FROM daily_progress ORDER BY day DESC LIMIT ?',
    [days],
  );
}
