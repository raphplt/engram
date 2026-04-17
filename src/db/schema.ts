export const SCHEMA_VERSION = 1;

export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS themes (
  id TEXT PRIMARY KEY,
  parent_id TEXT,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL,
  description TEXT,
  color TEXT,
  sort_order INTEGER DEFAULT 0,
  enabled INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS cards (
  id TEXT PRIMARY KEY,
  theme_id TEXT NOT NULL,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  hint TEXT,
  note TEXT,
  difficulty INTEGER NOT NULL DEFAULT 2,
  tags TEXT,
  FOREIGN KEY (theme_id) REFERENCES themes(id)
);

CREATE INDEX IF NOT EXISTS idx_cards_theme ON cards(theme_id);
CREATE INDEX IF NOT EXISTS idx_cards_diff ON cards(difficulty);

CREATE TABLE IF NOT EXISTS card_state (
  card_id TEXT PRIMARY KEY,
  state INTEGER NOT NULL DEFAULT 0,
  stability REAL NOT NULL DEFAULT 0,
  difficulty_factor REAL NOT NULL DEFAULT 5,
  due_at INTEGER NOT NULL DEFAULT 0,
  last_reviewed_at INTEGER,
  reps INTEGER NOT NULL DEFAULT 0,
  lapses INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (card_id) REFERENCES cards(id)
);

CREATE INDEX IF NOT EXISTS idx_card_state_due ON card_state(due_at);

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  card_id TEXT NOT NULL,
  reviewed_at INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  prev_interval REAL,
  next_interval REAL,
  FOREIGN KEY (card_id) REFERENCES cards(id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_date ON reviews(reviewed_at);

CREATE TABLE IF NOT EXISTS user_stats (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  xp INTEGER NOT NULL DEFAULT 0,
  streak_days INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_active_day TEXT,
  daily_goal INTEGER NOT NULL DEFAULT 25,
  total_reviews INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS daily_progress (
  day TEXT PRIMARY KEY,
  reviews INTEGER NOT NULL DEFAULT 0,
  xp_earned INTEGER NOT NULL DEFAULT 0,
  new_cards INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS achievements (
  id TEXT PRIMARY KEY,
  unlocked_at INTEGER
);
`;
