import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Screen } from '@/ui/components/Screen';
import { Text } from '@/ui/components/Text';
import { Rule } from '@/ui/components/Rule';
import { SectionHeader } from '@/ui/components/SectionHeader';
import { Chip } from '@/ui/components/Chip';
import { palette, space } from '@/ui/tokens';
import { getUserStats, getRecentDays, type UserStats } from '@/game/session';
import { ACHIEVEMENTS, getUnlockedAchievements } from '@/game/achievements';
import { levelForXp, titleForLevel } from '@/game/xp';
import { getThemeSummaries } from '@/db/seed';
import { dayKey } from '@/game/streak';
import { toRoman } from '@/ui/components/Roman';

export default function StatsScreen() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [days, setDays] = useState<Array<{ day: string; reviews: number; xp_earned: number }>>([]);
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [themeCount, setThemeCount] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [mastered, setMastered] = useState(0);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const [s, d, u, th] = await Promise.all([
          getUserStats(),
          getRecentDays(90),
          getUnlockedAchievements(),
          getThemeSummaries(),
        ]);
        setStats(s);
        setDays(d);
        setUnlocked(u);
        setThemeCount(th.length);
        setTotalCards(th.reduce((a, t) => a + t.total, 0));
        setMastered(th.reduce((a, t) => a + t.mastered, 0));
      })();
    }, []),
  );

  if (!stats) return <Screen><View /></Screen>;
  const level = levelForXp(stats.xp);

  return (
    <Screen scroll>
      <View style={{ paddingTop: space.m, marginBottom: space.xl }}>
        <Text variant="mono" uppercase tracking={3} tone="inkMuted">Atlas</Text>
        <View style={{ marginTop: space.xs }}><Rule weight="heavy" /></View>
        <Text variant="h1" style={{ marginTop: space.l }}>Progression</Text>
      </View>

      {/* Main figures */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: space.xxl }}>
        <Fig label="XP" value={stats.xp.toLocaleString('fr-FR')} sub={titleForLevel(level.level)} />
        <Fig label="Niveau" value={toRoman(level.level)} sub={`Record ${stats.longest_streak} j.`} />
        <Fig label="Série" value={`${stats.streak_days} j.`} sub={`Actuelle`} />
        <Fig label="Révisions" value={stats.total_reviews.toLocaleString('fr-FR')} sub="Cumul" />
        <Fig label="Cartes" value={String(totalCards)} sub={`${mastered} maîtrisées`} />
        <Fig label="Thèmes" value={String(themeCount)} sub="Disponibles" />
      </View>

      {/* Calendar heatmap */}
      <View style={{ marginBottom: space.xxl }}>
        <SectionHeader index={1} overline="Calendrier" title="90 derniers jours" />
        <Calendar days={days} />
        <Text variant="caption" tone="inkMuted" style={{ marginTop: space.s }}>
          Intensité de la couleur = nombre de révisions du jour.
        </Text>
      </View>

      {/* Achievements */}
      <View style={{ marginBottom: space.xxl }}>
        <SectionHeader
          index={2}
          overline="Succès"
          title="Jalons"
          trailing={`${unlocked.size} / ${ACHIEVEMENTS.length}`}
        />
        {ACHIEVEMENTS.map((a, i) => {
          const got = unlocked.has(a.id);
          return (
            <View
              key={a.id}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: space.m,
                borderBottomWidth: i === ACHIEVEMENTS.length - 1 ? 0 : 1,
                borderColor: palette.ruleSoft,
                opacity: got ? 1 : 0.4,
              }}
            >
              <View style={{ flex: 1, paddingRight: space.m }}>
                <Text variant="h5">{a.title}</Text>
                <Text variant="caption" tone="inkMuted">{a.hint}</Text>
              </View>
              {got ? (
                <Chip label="Obtenu" tone="ink" />
              ) : (
                <Chip label="Verrouillé" tone="ghost" outlined />
              )}
            </View>
          );
        })}
      </View>
    </Screen>
  );
}

function Fig({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <View style={{ width: '50%', paddingVertical: space.m, paddingRight: space.m }}>
      <Text variant="label" uppercase tracking={2} tone="inkMuted">{label}</Text>
      <Text variant="h2" style={{ marginTop: space.xs }}>{value}</Text>
      {sub ? <Text variant="caption" tone="inkMuted">{sub}</Text> : null}
    </View>
  );
}

function Calendar({ days }: { days: Array<{ day: string; reviews: number; xp_earned: number }> }) {
  // Build a 7 (rows) x 13 (cols) grid of last 91 days.
  const map = new Map(days.map((d) => [d.day, d.reviews]));
  const cells: Array<{ key: string; day: string; reviews: number }> = [];
  const today = new Date();
  for (let i = 90; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = dayKey(d.getTime());
    cells.push({ key, day: key, reviews: map.get(key) ?? 0 });
  }
  const max = Math.max(1, ...cells.map((c) => c.reviews));
  // 7 rows per column
  const cols: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    cols.push(cells.slice(i, i + 7));
  }
  return (
    <View style={{ flexDirection: 'row', gap: 3 }}>
      {cols.map((col, ci) => (
        <View key={ci} style={{ gap: 3 }}>
          {col.map((c) => {
            const intensity = c.reviews / max;
            const bg =
              c.reviews === 0
                ? palette.paperDeep
                : intensity > 0.66
                ? palette.ochre
                : intensity > 0.33
                ? '#D68A65'
                : '#E6B89C';
            return <View key={c.key} style={{ width: 14, height: 14, backgroundColor: bg }} />;
          })}
        </View>
      ))}
    </View>
  );
}
