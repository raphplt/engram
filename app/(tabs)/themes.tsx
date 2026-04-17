import { useCallback, useState } from 'react';
import { View, Pressable } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Screen } from '@/ui/components/Screen';
import { Text } from '@/ui/components/Text';
import { Rule } from '@/ui/components/Rule';
import { Chip } from '@/ui/components/Chip';
import { ProgressBar } from '@/ui/components/ProgressBar';
import { SectionHeader } from '@/ui/components/SectionHeader';
import { palette, space } from '@/ui/tokens';
import { getThemeSummaries } from '@/db/seed';
import { CATEGORY_LABELS } from '@/data';

type ThemeRow = Awaited<ReturnType<typeof getThemeSummaries>>[number];

export default function ThemesScreen() {
  const router = useRouter();
  const [themes, setThemes] = useState<ThemeRow[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => setThemes(await getThemeSummaries()))();
    }, []),
  );

  const byCat: Record<string, ThemeRow[]> = {};
  themes.forEach((t) => {
    (byCat[t.category] ??= []).push(t);
  });

  const categoryOrder = ['geography', 'history', 'philosophy', 'books'];

  return (
    <Screen scroll>
      <View style={{ paddingTop: space.m, marginBottom: space.xl }}>
        <Text variant="mono" uppercase tracking={3} tone="inkMuted">Corpus</Text>
        <View style={{ marginTop: space.xs }}><Rule weight="heavy" /></View>
        <Text variant="h1" style={{ marginTop: space.l }}>Thèmes</Text>
        <Text variant="lead" tone="inkMuted" style={{ marginTop: space.s }}>
          Choisis un thème pour ouvrir une session ciblée. Les % indiquent la maîtrise.
        </Text>
      </View>

      {categoryOrder.map((cat, i) => {
        const ts = byCat[cat] ?? [];
        if (ts.length === 0) return null;
        const meta = CATEGORY_LABELS[cat];
        return (
          <View key={cat} style={{ marginBottom: space.xxl }}>
            <SectionHeader index={i + 1} overline={meta.title} title={meta.subtitle} />
            {ts.map((t, idx) => {
              const masteredPct = t.total > 0 ? t.mastered / t.total : 0;
              return (
                <Pressable
                  key={t.id}
                  onPress={() =>
                    router.push({ pathname: '/session', params: { themeId: t.id, limit: '25' } })
                  }
                  style={{
                    paddingVertical: space.l,
                    borderBottomWidth: idx === ts.length - 1 ? 0 : 1,
                    borderColor: palette.ruleSoft,
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: space.xs }}>
                    <View style={{ flex: 1, paddingRight: space.s }}>
                      <Text variant="h4">{t.title}</Text>
                      {t.subtitle ? (
                        <Text variant="caption" tone="inkMuted" style={{ marginTop: 2 }}>
                          {t.subtitle}
                        </Text>
                      ) : null}
                    </View>
                    <Text variant="mono" tone="inkMuted">{t.total}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.m, marginTop: space.s }}>
                    <View style={{ flex: 1 }}>
                      <ProgressBar value={masteredPct} height={2} tone={masteredPct >= 0.5 ? 'forest' : 'ink'} />
                    </View>
                    <Text variant="mono" tone="inkMuted">{Math.round(masteredPct * 100)}%</Text>
                    {t.due > 0 ? <Chip label={`${t.due} dues`} tone="ochre" /> : null}
                    {t.studied === 0 ? <Chip label="Nouveau" tone="ghost" outlined /> : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
        );
      })}
    </Screen>
  );
}
