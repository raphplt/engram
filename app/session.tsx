import { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, {
  FadeInDown,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  FadeIn,
} from 'react-native-reanimated';
import { Screen } from '@/ui/components/Screen';
import { Text } from '@/ui/components/Text';
import { Button } from '@/ui/components/Button';
import { Rule } from '@/ui/components/Rule';
import { ProgressBar } from '@/ui/components/ProgressBar';
import { Chip } from '@/ui/components/Chip';
import { palette, space } from '@/ui/tokens';
import { buildQueue, applyReview, type QueueCard } from '@/srs/queue';
import { registerReview, getUserStats } from '@/game/session';
import { evaluateAchievements, ACHIEVEMENTS, getUnlockedAchievements } from '@/game/achievements';
import { Rating } from '@/srs/types';
import { getThemeSummaries } from '@/db/seed';
import { toRoman } from '@/ui/components/Roman';

type Phase = 'loading' | 'studying' | 'done' | 'empty';

export default function SessionScreen() {
  const params = useLocalSearchParams<{ themeId?: string; limit?: string }>();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('loading');
  const [queue, setQueue] = useState<QueueCard[]>([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [xpTotal, setXpTotal] = useState(0);
  const [correctTotal, setCorrectTotal] = useState(0);
  const [againTotal, setAgainTotal] = useState(0);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);

  const load = useCallback(async () => {
    setPhase('loading');
    const limit = params.limit ? parseInt(params.limit, 10) : 25;
    const themeIds = params.themeId ? [params.themeId] : undefined;
    const q = await buildQueue({ limit, themeIds });
    if (q.length === 0) {
      setPhase('empty');
      return;
    }
    setQueue(q);
    setIndex(0);
    setRevealed(false);
    setPhase('studying');
  }, [params.limit, params.themeId]);

  useEffect(() => {
    load();
  }, [load]);

  const current = queue[index];

  const handleRating = useCallback(
    async (rating: Rating) => {
      if (!current) return;
      await applyReview(current, rating);
      const { xpGained } = await registerReview(rating, current.difficulty);
      setXpTotal((v) => v + xpGained);
      if (rating === 1) setAgainTotal((v) => v + 1);
      else setCorrectTotal((v) => v + 1);

      if (index + 1 >= queue.length) {
        // Check for new achievements at end
        const stats = await getUserStats();
        const themes = await getThemeSummaries();
        const mastered = themes.filter((t) => t.total > 0 && t.mastered / t.total >= 0.5).length;
        const before = await getUnlockedAchievements();
        const newly = await evaluateAchievements({
          xp: stats.xp,
          streakDays: stats.streak_days,
          longestStreak: stats.longest_streak,
          totalReviews: stats.total_reviews,
          themesMastered: mastered,
        });
        setNewAchievements(newly.filter((n) => !before.has(n)));
        setPhase('done');
      } else {
        setIndex((i) => i + 1);
        setRevealed(false);
      }
    },
    [current, index, queue.length],
  );

  if (phase === 'loading') {
    return (
      <Screen>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color={palette.ink} />
        </View>
      </Screen>
    );
  }

  if (phase === 'empty') {
    return (
      <Screen>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: space.xl }}>
          <Text variant="mono" uppercase tracking={3} tone="inkMuted">file vide</Text>
          <View style={{ marginTop: space.l, width: 120 }}><Rule /></View>
          <Text variant="h2" center style={{ marginTop: space.l }}>Rien à revoir.</Text>
          <Text variant="lead" tone="inkMuted" center style={{ marginTop: space.m }}>
            Pas de cartes dues et pas de nouvelles à introduire pour ce filtre.
          </Text>
          <View style={{ marginTop: space.xl }}>
            <Button label="Retour" variant="outline" onPress={() => router.back()} />
          </View>
        </View>
      </Screen>
    );
  }

  if (phase === 'done') {
    return (
      <Screen>
        <View style={{ flex: 1, padding: space.l }}>
          <View style={{ marginTop: space.xl }}>
            <Text variant="mono" uppercase tracking={3} tone="inkMuted">Fin de session</Text>
            <View style={{ marginTop: space.s }}><Rule weight="heavy" /></View>
          </View>
          <Animated.View entering={FadeInDown.duration(420)} style={{ marginTop: space.xl }}>
            <Text variant="h1">{correctTotal + againTotal} cartes.</Text>
            <Text variant="lead" tone="inkSoft" style={{ marginTop: space.s }}>
              {correctTotal} réussies, {againTotal} à reprendre.
            </Text>
          </Animated.View>

          <View style={{ marginTop: space.xxl, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text variant="label" uppercase tracking={2} tone="inkMuted">XP gagnées</Text>
              <Text variant="h2" style={{ marginTop: space.xs, color: palette.ochre }}>+{xpTotal}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="label" uppercase tracking={2} tone="inkMuted">Précision</Text>
              <Text variant="h2" style={{ marginTop: space.xs }}>
                {correctTotal + againTotal === 0
                  ? '—'
                  : Math.round((correctTotal / (correctTotal + againTotal)) * 100) + '%'}
              </Text>
            </View>
          </View>

          {newAchievements.length > 0 ? (
            <View style={{ marginTop: space.xxl, paddingTop: space.l, borderTopWidth: 1, borderColor: palette.rule }}>
              <Text variant="label" uppercase tracking={2} tone="ochre">Nouveaux succès</Text>
              {newAchievements.map((id) => {
                const a = ACHIEVEMENTS.find((x) => x.id === id);
                if (!a) return null;
                return (
                  <View key={id} style={{ marginTop: space.m }}>
                    <Text variant="h5">{a.title}</Text>
                    <Text variant="caption" tone="inkMuted">{a.hint}</Text>
                  </View>
                );
              })}
            </View>
          ) : null}

          <View style={{ flex: 1 }} />
          <View style={{ flexDirection: 'row', gap: space.m }}>
            <Button label="Rejouer" variant="outline" onPress={load} block style={{ flex: 1 }} />
            <Button label="Terminer" variant="ink" onPress={() => router.back()} block style={{ flex: 1 }} />
          </View>
        </View>
      </Screen>
    );
  }

  // studying
  if (!current) return null;
  const progress = index / queue.length;

  return (
    <Screen edgeToEdge>
      <View style={{ paddingHorizontal: space.l, paddingTop: space.xxl, paddingBottom: space.l }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Pressable onPress={() => router.back()}>
            <Text variant="mono" uppercase tracking={2} tone="inkMuted">← quitter</Text>
          </Pressable>
          <Text variant="mono" tone="inkMuted">
            {toRoman(index + 1)} / {toRoman(queue.length)}
          </Text>
        </View>
        <View style={{ marginTop: space.m }}>
          <ProgressBar value={progress} height={2} />
        </View>
      </View>

      <CardFace card={current} revealed={revealed} onReveal={() => setRevealed(true)} />

      <View style={{ paddingHorizontal: space.l, paddingBottom: space.xl, paddingTop: space.l }}>
        {revealed ? (
          <Animated.View entering={FadeInDown.duration(220)} style={{ flexDirection: 'row', gap: space.s }}>
            <RateButton label="À revoir" hint="1" rating={1} onPress={handleRating} color={palette.danger} />
            <RateButton label="Difficile" hint="2" rating={2} onPress={handleRating} color={palette.warn} />
            <RateButton label="Bon" hint="3" rating={3} onPress={handleRating} color={palette.ink} />
            <RateButton label="Facile" hint="4" rating={4} onPress={handleRating} color={palette.forest} />
          </Animated.View>
        ) : (
          <Button label="Afficher la réponse" hint="espace" variant="ink" size="lg" block onPress={() => setRevealed(true)} />
        )}
      </View>
    </Screen>
  );
}

function CardFace({ card, revealed, onReveal }: { card: QueueCard; revealed: boolean; onReveal: () => void }) {
  const key = card.id + String(revealed);
  return (
    <Pressable onPress={onReveal} style={{ flex: 1, paddingHorizontal: space.l, paddingVertical: space.l }}>
      <Animated.View key={key} entering={FadeIn.duration(200)} style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.s, marginBottom: space.m }}>
          <Chip label={card.hint ?? 'Carte'} tone="ghost" outlined />
          <DifficultyDots value={card.difficulty} />
        </View>

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text variant="display" style={{ fontSize: 56, lineHeight: 62 }}>
            {card.front}
          </Text>

          {revealed ? (
            <Animated.View entering={FadeInDown.duration(260)} style={{ marginTop: space.xl }}>
              <View style={{ width: 48, height: 3, backgroundColor: palette.ochre, marginBottom: space.m }} />
              <Text variant="h2" style={{ color: palette.ink }}>{card.back}</Text>
              {card.note ? (
                <Text variant="lead" tone="inkSoft" style={{ marginTop: space.m }}>
                  {card.note}
                </Text>
              ) : null}
            </Animated.View>
          ) : null}
        </View>

        {!revealed ? (
          <Text variant="italic" tone="inkFaint" center style={{ marginTop: space.l }}>
            Toucher pour révéler
          </Text>
        ) : null}
      </Animated.View>
    </Pressable>
  );
}

function RateButton({
  label,
  hint,
  rating,
  onPress,
  color,
}: {
  label: string;
  hint: string;
  rating: Rating;
  onPress: (r: Rating) => void;
  color: string;
}) {
  return (
    <Pressable
      onPress={() => onPress(rating)}
      style={({ pressed }) => [
        rateStyles.btn,
        { backgroundColor: pressed ? palette.paperDeep : 'transparent', borderColor: color },
      ]}
    >
      <Text variant="mono" uppercase tracking={1.2} style={{ color, fontSize: 10 }}>{hint}</Text>
      <Text
        variant="body"
        style={{ color: palette.ink, fontFamily: 'Inter_500Medium', marginTop: 2, fontSize: 13, letterSpacing: 0.3 }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function DifficultyDots({ value }: { value: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 3 }}>
      {[1, 2, 3, 4].map((i) => (
        <View
          key={i}
          style={{
            width: 6,
            height: 6,
            backgroundColor: i <= value ? palette.ink : palette.ruleSoft,
          }}
        />
      ))}
    </View>
  );
}

const rateStyles = StyleSheet.create({
  btn: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: space.m,
    alignItems: 'center',
  },
});
