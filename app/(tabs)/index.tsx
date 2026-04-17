import { useCallback, useState } from 'react';
import { View, Pressable } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Screen } from '@/ui/components/Screen';
import { Text } from '@/ui/components/Text';
import { Button } from '@/ui/components/Button';
import { Rule } from '@/ui/components/Rule';
import { SectionHeader } from '@/ui/components/SectionHeader';
import { ProgressBar } from '@/ui/components/ProgressBar';
import { Chip } from '@/ui/components/Chip';
import { palette, space } from '@/ui/tokens';
import { getUserStats, getTodayProgress, type UserStats } from '@/game/session';
import { countDueCards } from '@/srs/queue';
import { getThemeSummaries } from '@/db/seed';
import { levelForXp, titleForLevel } from '@/game/xp';
import { toRoman } from '@/ui/components/Roman';

type ThemeRow = Awaited<ReturnType<typeof getThemeSummaries>>[number];

export default function HomeScreen() {
  const router = useRouter();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [today, setToday] = useState<{ reviews: number; xp_earned: number }>({ reviews: 0, xp_earned: 0 });
  const [queue, setQueue] = useState<{ due: number; newCards: number }>({ due: 0, newCards: 0 });
  const [themes, setThemes] = useState<ThemeRow[]>([]);

  const refresh = useCallback(async () => {
    const [s, t, q, th] = await Promise.all([
      getUserStats(),
      getTodayProgress(),
      countDueCards(),
      getThemeSummaries(),
    ]);
    setStats(s);
    setToday(t);
    setQueue(q);
    setThemes(th);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  if (!stats) return <Screen><View /></Screen>;

  const levelInfo = levelForXp(stats.xp);
  const title = titleForLevel(levelInfo.level);
  const dailyGoal = stats.daily_goal;
  const todayPct = Math.min(1, today.reviews / dailyGoal);
  const sessionTarget = Math.min(queue.due + queue.newCards, dailyGoal);
  const canStudy = queue.due > 0 || queue.newCards > 0;

  const hotThemes = themes
    .filter((t) => t.enabled === 1 && t.due > 0)
    .sort((a, b) => b.due - a.due)
    .slice(0, 3);

  return (
    <Screen scroll>
      {/* Masthead */}
      <View style={{ paddingTop: space.m, marginBottom: space.xl }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Text variant="mono" uppercase tracking={3} tone="inkMuted">
            ENGRAM · N° {toRoman(levelInfo.level).toLowerCase()}
          </Text>
          <Text variant="mono" tone="inkMuted">{formatDate()}</Text>
        </View>
        <View style={{ marginTop: space.xs }}>
          <Rule weight="heavy" />
        </View>

        <View style={{ marginTop: space.xl, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <Text variant="label" uppercase tracking={2} tone="inkMuted">Aujourd’hui</Text>
            <Text variant="h1" style={{ marginTop: space.xs }}>
              {queue.due + queue.newCards > 0 ? `${queue.due + queue.newCards} cartes` : 'Rien d’urgent'}
            </Text>
            <Text variant="lead" tone="inkSoft" style={{ marginTop: space.xs }}>
              {queue.due > 0
                ? `${queue.due} à revoir, ${queue.newCards} nouvelles.`
                : queue.newCards > 0
                ? `${queue.newCards} cartes fraîches prêtes à apprendre.`
                : 'Tu es à jour. Reviens demain ou pioche un thème.'}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: space.xl }}>
          <Button
            label={canStudy ? `Lancer la session — ${sessionTarget}` : 'Ouvrir un thème'}
            variant={canStudy ? 'primary' : 'ink'}
            size="lg"
            block
            hint={canStudy ? 'I' : undefined}
            onPress={() =>
              canStudy
                ? router.push({ pathname: '/session', params: { limit: String(dailyGoal) } })
                : router.push('/themes')
            }
          />
        </View>
      </View>

      {/* Daily goal bar */}
      <View style={{ marginBottom: space.xl }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: space.s }}>
          <Text variant="label" uppercase tracking={2} tone="inkMuted">Objectif du jour</Text>
          <Text variant="mono" tone="inkMuted">
            {today.reviews} / {dailyGoal}
          </Text>
        </View>
        <ProgressBar value={todayPct} height={4} tone={todayPct >= 1 ? 'forest' : 'ochre'} />
        {todayPct >= 1 ? (
          <Text variant="italic" tone="inkMuted" style={{ marginTop: space.s }}>
            Objectif tenu. Continuer ne fait pas de mal.
          </Text>
        ) : null}
      </View>

      {/* Level / Streak */}
      <View style={{ flexDirection: 'row', marginBottom: space.xl }}>
        <View style={{ flex: 1 }}>
          <Text variant="label" uppercase tracking={2} tone="inkMuted">Niveau</Text>
          <Text variant="h2" style={{ marginTop: space.xs }}>{toRoman(levelInfo.level)}</Text>
          <Text variant="italic" tone="inkMuted" style={{ marginTop: space.xxs }}>{title}</Text>
          <View style={{ marginTop: space.m, marginRight: space.l }}>
            <ProgressBar value={levelInfo.progress} height={2} />
            <Text variant="mono" tone="inkMuted" style={{ marginTop: space.xs }}>
              {stats.xp - levelInfo.floor} / {levelInfo.next - levelInfo.floor} xp
            </Text>
          </View>
        </View>
        <View style={{ width: 1, backgroundColor: palette.rule, marginVertical: space.xs }} />
        <View style={{ flex: 1, paddingLeft: space.l }}>
          <Text variant="label" uppercase tracking={2} tone="inkMuted">Série</Text>
          <Text variant="h2" style={{ marginTop: space.xs }}>
            {stats.streak_days}
            <Text variant="body" tone="inkMuted"> j.</Text>
          </Text>
          <Text variant="italic" tone="inkMuted" style={{ marginTop: space.xxs }}>
            record {stats.longest_streak}
          </Text>
          {stats.streak_days > 0 ? (
            <View style={{ marginTop: space.m, flexDirection: 'row', gap: space.xs }}>
              {[...Array(Math.min(7, stats.streak_days))].map((_, i) => (
                <View key={i} style={{ width: 8, height: 8, backgroundColor: palette.ochre }} />
              ))}
            </View>
          ) : (
            <Text variant="caption" tone="inkFaint" style={{ marginTop: space.m }}>
              Une première révision aujourd’hui démarre la série.
            </Text>
          )}
        </View>
      </View>

      {/* Hot themes */}
      {hotThemes.length > 0 ? (
        <View style={{ marginBottom: space.xl }}>
          <SectionHeader index={1} overline="À revoir" title="Thèmes en attente" trailing={`${hotThemes.reduce((a, t) => a + t.due, 0)} cartes`} />
          {hotThemes.map((t, idx) => (
            <Pressable
              key={t.id}
              onPress={() => router.push({ pathname: '/session', params: { themeId: t.id, limit: String(Math.min(25, t.due + 3)) } })}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: space.m,
                borderBottomWidth: idx === hotThemes.length - 1 ? 0 : 1,
                borderColor: palette.ruleSoft,
              }}
            >
              <View style={{ flex: 1, paddingRight: space.m }}>
                <Text variant="h5">{t.title}</Text>
                <Text variant="caption" tone="inkMuted">
                  {t.total} cartes · {Math.round((t.mastered / Math.max(1, t.total)) * 100)}% maîtrisées
                </Text>
              </View>
              <Chip label={`${t.due} dues`} tone="ochre" />
            </Pressable>
          ))}
        </View>
      ) : null}

      {/* Quote */}
      <View style={{ marginTop: space.xl, paddingTop: space.l, borderTopWidth: 1, borderColor: palette.ruleSoft }}>
        <Text variant="italic" tone="inkSoft" center>
          « {rotatingQuote()} »
        </Text>
      </View>
    </Screen>
  );
}

function formatDate() {
  const d = new Date();
  const months = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC'];
  return `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

const QUOTES = [
  'Ce n’est pas parce que les choses sont difficiles que nous n’osons pas, c’est parce que nous n’osons pas qu’elles sont difficiles. — Sénèque',
  'Nous sommes ce que nous répétons chaque jour. L’excellence n’est donc pas un acte mais une habitude. — Aristote',
  'Celui qui déplace une montagne commence par déplacer les petites pierres. — Confucius',
  'La mémoire est la sentinelle de l’esprit. — Shakespeare',
  'Ce que vous savez par cœur, personne ne peut vous le prendre. — Marc Aurèle (attribué)',
  'Savoir ce que l’on sait et ne pas savoir ce que l’on ne sait pas — voilà la vraie science. — Confucius',
  'L’homme cultivé est un voyageur qui a visité plusieurs siècles. — Sainte-Beuve',
];

function rotatingQuote() {
  const d = new Date();
  const idx = (d.getFullYear() * 366 + d.getMonth() * 31 + d.getDate()) % QUOTES.length;
  return QUOTES[idx];
}
