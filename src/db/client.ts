import * as SQLite from 'expo-sqlite';
import { SCHEMA_SQL, SCHEMA_VERSION } from './schema';

let _db: SQLite.SQLiteDatabase | null = null;

export async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (_db) return _db;
  _db = await SQLite.openDatabaseAsync('engram.db');
  await _db.execAsync('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');
  await _db.execAsync(SCHEMA_SQL);
  await ensureMeta(_db);
  return _db;
}

async function ensureMeta(db: SQLite.SQLiteDatabase) {
  const row = await db.getFirstAsync<{ value: string }>(
    'SELECT value FROM meta WHERE key = ?',
    ['schema_version'],
  );
  if (!row) {
    await db.runAsync(
      'INSERT INTO meta (key, value) VALUES (?, ?)',
      ['schema_version', String(SCHEMA_VERSION)],
    );
  }
  const stats = await db.getFirstAsync<{ id: number }>(
    'SELECT id FROM user_stats WHERE id = 1',
  );
  if (!stats) {
    await db.runAsync(
      'INSERT INTO user_stats (id, xp, streak_days, longest_streak, daily_goal, total_reviews, created_at) VALUES (1, 0, 0, 0, 25, 0, ?)',
      [Date.now()],
    );
  }
}

export async function resetDb() {
  const db = await getDb();
  await db.execAsync(`
    DELETE FROM reviews;
    DELETE FROM card_state;
    DELETE FROM daily_progress;
    DELETE FROM achievements;
    UPDATE user_stats SET xp = 0, streak_days = 0, longest_streak = 0, last_active_day = NULL, total_reviews = 0 WHERE id = 1;
  `);
}
