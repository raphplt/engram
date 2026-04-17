import { Rating } from '../srs/types';

// XP per rating. "Again" gives 1 for participation. Others grow.
export function xpForRating(rating: Rating, cardDifficulty: number): number {
  const baseTable: Record<Rating, number> = { 1: 1, 2: 4, 3: 7, 4: 10 };
  const diffBonus = cardDifficulty - 2; // difficulty 1..4 → -1..+2 bonus
  return Math.max(1, baseTable[rating] + Math.max(0, diffBonus));
}

// Level curve: slightly sublinear growth. Level 1 requires 0 XP, level N requires ~sum of 100 + 40 * (i-1).
// total_xp_for_level(1) = 0, level(2) = 100, level(3) = 240, level(4) = 420, level(5) = 640, ...
export function levelForXp(xp: number): { level: number; progress: number; next: number; floor: number } {
  let level = 1;
  let floor = 0;
  for (let i = 1; i < 200; i++) {
    const needed = xpToReach(i + 1);
    if (xp < needed) {
      const prev = xpToReach(i);
      return {
        level: i,
        progress: (xp - prev) / Math.max(1, needed - prev),
        next: needed,
        floor: prev,
      };
    }
    level = i + 1;
    floor = needed;
  }
  return { level, progress: 1, next: floor, floor };
}

export function xpToReach(level: number): number {
  // sum_{i=1}^{level-1} (100 + 40*(i-1))
  if (level <= 1) return 0;
  const n = level - 1;
  return n * 100 + 40 * (n * (n - 1)) / 2;
}

export const LEVEL_TITLES: Record<number, string> = {
  1: 'Novice',
  3: 'Apprenti',
  5: 'Curieux',
  8: 'Lettré',
  12: 'Érudit',
  18: 'Savant',
  25: 'Bibliothécaire',
  35: 'Cartographe',
  50: 'Polyglotte',
  70: 'Humaniste',
  100: 'Sage',
};

export function titleForLevel(level: number): string {
  let title = 'Novice';
  for (const k of Object.keys(LEVEL_TITLES)
    .map(Number)
    .sort((a, b) => a - b)) {
    if (level >= k) title = LEVEL_TITLES[k];
  }
  return title;
}
