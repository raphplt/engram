import { getDb } from '../db/client';

export type Achievement = {
  id: string;
  title: string;
  hint: string;
  check: (ctx: AchievementCtx) => boolean;
};

export type AchievementCtx = {
  xp: number;
  streakDays: number;
  longestStreak: number;
  totalReviews: number;
  themesMastered: number;
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_step', title: 'Premier pas', hint: 'Compléter 1 révision', check: (c) => c.totalReviews >= 1 },
  { id: 'session_25', title: 'Lecture du soir', hint: '25 révisions cumulées', check: (c) => c.totalReviews >= 25 },
  { id: 'session_100', title: 'Cartulaire', hint: '100 révisions cumulées', check: (c) => c.totalReviews >= 100 },
  { id: 'session_500', title: 'Copiste', hint: '500 révisions cumulées', check: (c) => c.totalReviews >= 500 },
  { id: 'session_2000', title: 'Bibliothèque', hint: '2000 révisions cumulées', check: (c) => c.totalReviews >= 2000 },
  { id: 'streak_3', title: 'Discipline', hint: '3 jours consécutifs', check: (c) => c.streakDays >= 3 || c.longestStreak >= 3 },
  { id: 'streak_7', title: 'Habitude', hint: 'Une semaine de suite', check: (c) => c.streakDays >= 7 || c.longestStreak >= 7 },
  { id: 'streak_30', title: 'Régularité', hint: '30 jours consécutifs', check: (c) => c.streakDays >= 30 || c.longestStreak >= 30 },
  { id: 'streak_100', title: 'Rituel', hint: '100 jours consécutifs', check: (c) => c.streakDays >= 100 || c.longestStreak >= 100 },
  { id: 'xp_500', title: 'Apprenti', hint: '500 XP', check: (c) => c.xp >= 500 },
  { id: 'xp_2500', title: 'Lettré', hint: '2 500 XP', check: (c) => c.xp >= 2500 },
  { id: 'xp_10000', title: 'Érudit', hint: '10 000 XP', check: (c) => c.xp >= 10000 },
  { id: 'theme_1', title: 'Premier thème', hint: 'Un thème maîtrisé à 50%', check: (c) => c.themesMastered >= 1 },
  { id: 'theme_3', title: 'Polymathe', hint: 'Trois thèmes maîtrisés à 50%', check: (c) => c.themesMastered >= 3 },
  { id: 'theme_6', title: 'Encyclopédiste', hint: 'Six thèmes maîtrisés à 50%', check: (c) => c.themesMastered >= 6 },
];

export async function evaluateAchievements(ctx: AchievementCtx): Promise<string[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<{ id: string }>('SELECT id FROM achievements');
  const owned = new Set(rows.map((r) => r.id));
  const newly: string[] = [];
  for (const a of ACHIEVEMENTS) {
    if (!owned.has(a.id) && a.check(ctx)) {
      await db.runAsync(
        'INSERT INTO achievements (id, unlocked_at) VALUES (?, ?) ON CONFLICT(id) DO NOTHING',
        [a.id, Date.now()],
      );
      newly.push(a.id);
    }
  }
  return newly;
}

export async function getUnlockedAchievements(): Promise<Set<string>> {
  const db = await getDb();
  const rows = await db.getAllAsync<{ id: string }>('SELECT id FROM achievements');
  return new Set(rows.map((r) => r.id));
}
