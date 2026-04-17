export function dayKey(ts: number = Date.now()): string {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function daysBetween(a: string, b: string): number {
  const da = new Date(a + 'T00:00:00').getTime();
  const db = new Date(b + 'T00:00:00').getTime();
  return Math.round((db - da) / (24 * 60 * 60 * 1000));
}

export function computeStreak(lastActive: string | null, today: string, currentStreak: number): number {
  if (!lastActive) return 1;
  if (lastActive === today) return currentStreak;
  const d = daysBetween(lastActive, today);
  if (d === 1) return currentStreak + 1;
  return 1;
}
