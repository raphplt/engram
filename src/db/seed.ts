import { getDb } from './client';
import { ALL_PACKS } from '../data';

export async function seedIfNeeded(): Promise<{ seeded: boolean; themes: number; cards: number }> {
  const db = await getDb();
  const row = await db.getFirstAsync<{ n: number }>('SELECT COUNT(*) as n FROM themes');
  if ((row?.n ?? 0) > 0) {
    return { seeded: false, themes: row?.n ?? 0, cards: await countCards() };
  }
  await seed();
  return { seeded: true, themes: ALL_PACKS.length, cards: await countCards() };
}

async function countCards() {
  const db = await getDb();
  const row = await db.getFirstAsync<{ n: number }>('SELECT COUNT(*) as n FROM cards');
  return row?.n ?? 0;
}

export async function seed() {
  const db = await getDb();
  await db.withTransactionAsync(async () => {
    for (const pack of ALL_PACKS) {
      const t = pack.theme;
      await db.runAsync(
        `INSERT OR REPLACE INTO themes (id, parent_id, title, subtitle, category, description, color, sort_order, enabled)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`,
        [
          t.id,
          t.parentId ?? null,
          t.title,
          t.subtitle ?? null,
          t.category,
          t.description ?? null,
          t.color,
          t.sortOrder ?? 0,
        ],
      );
      for (const c of pack.cards) {
        await db.runAsync(
          `INSERT OR REPLACE INTO cards (id, theme_id, front, back, hint, note, difficulty, tags)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            c.id,
            c.themeId,
            c.front,
            c.back,
            c.hint ?? null,
            c.note ?? null,
            c.difficulty,
            c.tags ? JSON.stringify(c.tags) : null,
          ],
        );
      }
    }
  });
}

export async function getThemeSummaries() {
  const db = await getDb();
  return await db.getAllAsync<{
    id: string;
    title: string;
    subtitle: string | null;
    category: string;
    color: string;
    enabled: number;
    total: number;
    studied: number;
    mastered: number;
    due: number;
  }>(`
    SELECT t.id, t.title, t.subtitle, t.category, t.color, t.enabled,
           (SELECT COUNT(*) FROM cards c WHERE c.theme_id = t.id) as total,
           (SELECT COUNT(*) FROM cards c INNER JOIN card_state s ON s.card_id = c.id WHERE c.theme_id = t.id) as studied,
           (SELECT COUNT(*) FROM cards c INNER JOIN card_state s ON s.card_id = c.id WHERE c.theme_id = t.id AND s.stability >= 14) as mastered,
           (SELECT COUNT(*) FROM cards c INNER JOIN card_state s ON s.card_id = c.id WHERE c.theme_id = t.id AND s.due_at <= ?) as due
    FROM themes t
    ORDER BY t.sort_order ASC, t.title ASC
  `, [Date.now()]);
}

export async function setThemeEnabled(themeId: string, enabled: boolean) {
  const db = await getDb();
  await db.runAsync('UPDATE themes SET enabled = ? WHERE id = ?', [enabled ? 1 : 0, themeId]);
}
