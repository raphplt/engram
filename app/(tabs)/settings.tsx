import { useCallback, useState } from 'react';
import { View, Switch, Pressable, Alert } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Screen } from '@/ui/components/Screen';
import { Text } from '@/ui/components/Text';
import { Rule } from '@/ui/components/Rule';
import { Button } from '@/ui/components/Button';
import { SectionHeader } from '@/ui/components/SectionHeader';
import { palette, space } from '@/ui/tokens';
import { getUserStats, setDailyGoal } from '@/game/session';
import { getThemeSummaries, setThemeEnabled } from '@/db/seed';
import { resetDb } from '@/db/client';
import { CATEGORY_LABELS } from '@/data';

type ThemeRow = Awaited<ReturnType<typeof getThemeSummaries>>[number];

const GOALS = [10, 15, 20, 25, 35, 50];

export default function SettingsScreen() {
  const [goal, setGoal] = useState(25);
  const [themes, setThemes] = useState<ThemeRow[]>([]);

  const refresh = useCallback(async () => {
    const [s, t] = await Promise.all([getUserStats(), getThemeSummaries()]);
    setGoal(s.daily_goal);
    setThemes(t);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const updateGoal = async (v: number) => {
    await setDailyGoal(v);
    setGoal(v);
  };

  const toggleTheme = async (id: string, current: boolean) => {
    await setThemeEnabled(id, !current);
    refresh();
  };

  const confirmReset = () => {
    Alert.alert(
      'Réinitialiser la progression ?',
      'Toutes les cartes seront de nouveau neuves. Irréversible.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: async () => {
            await resetDb();
            refresh();
          },
        },
      ],
    );
  };

  const byCat: Record<string, ThemeRow[]> = {};
  themes.forEach((t) => ((byCat[t.category] ??= []).push(t)));

  return (
    <Screen scroll>
      <View style={{ paddingTop: space.m, marginBottom: space.xl }}>
        <Text variant="mono" uppercase tracking={3} tone="inkMuted">Marges</Text>
        <View style={{ marginTop: space.xs }}><Rule weight="heavy" /></View>
        <Text variant="h1" style={{ marginTop: space.l }}>Réglages</Text>
      </View>

      {/* Daily goal */}
      <View style={{ marginBottom: space.xxl }}>
        <SectionHeader index={1} overline="Quotidien" title="Objectif" trailing={`${goal} cartes`} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.s }}>
          {GOALS.map((g) => (
            <Pressable
              key={g}
              onPress={() => updateGoal(g)}
              style={{
                paddingHorizontal: space.l,
                paddingVertical: space.s,
                borderWidth: 1,
                borderColor: g === goal ? palette.ink : palette.ruleSoft,
                backgroundColor: g === goal ? palette.ink : 'transparent',
              }}
            >
              <Text variant="mono" tracking={0.8} style={{ color: g === goal ? palette.paper : palette.ink }}>
                {g}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Theme toggles */}
      <View style={{ marginBottom: space.xxl }}>
        <SectionHeader index={2} overline="Corpus" title="Thèmes actifs" />
        {Object.keys(CATEGORY_LABELS).map((cat) => {
          const ts = byCat[cat] ?? [];
          if (ts.length === 0) return null;
          return (
            <View key={cat} style={{ marginBottom: space.l }}>
              <Text variant="label" uppercase tracking={2} tone="inkMuted" style={{ marginBottom: space.s }}>
                {CATEGORY_LABELS[cat].title}
              </Text>
              {ts.map((t) => (
                <View
                  key={t.id}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: space.s,
                    borderBottomWidth: 1,
                    borderColor: palette.ruleSoft,
                  }}
                >
                  <View style={{ flex: 1, paddingRight: space.m }}>
                    <Text variant="body">{t.title}</Text>
                    <Text variant="caption" tone="inkMuted">{t.total} cartes</Text>
                  </View>
                  <Switch
                    value={t.enabled === 1}
                    onValueChange={() => toggleTheme(t.id, t.enabled === 1)}
                    trackColor={{ false: palette.ruleSoft, true: palette.ochre }}
                    thumbColor={palette.paper}
                  />
                </View>
              ))}
            </View>
          );
        })}
      </View>

      {/* Danger zone */}
      <View style={{ marginBottom: space.xxl }}>
        <SectionHeader index={3} overline="Remise à zéro" title="Zone dangereuse" />
        <Text variant="caption" tone="inkMuted" style={{ marginBottom: space.m }}>
          Efface tous les progrès (révisions, séries, succès) mais conserve les cartes.
        </Text>
        <Button label="Réinitialiser la progression" variant="outline" onPress={confirmReset} />
      </View>

      <View style={{ alignItems: 'center', marginTop: space.xl, paddingTop: space.xl, borderTopWidth: 1, borderColor: palette.ruleSoft }}>
        <Text variant="mono" uppercase tracking={4} tone="inkFaint">
          engram · 0.1
        </Text>
      </View>
    </Screen>
  );
}
