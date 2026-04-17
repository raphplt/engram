import { View } from 'react-native';
import { palette, space } from '../tokens';
import { Text } from './Text';
import { Rule } from './Rule';
import { toRoman } from './Roman';

type Props = {
  index?: number;
  overline?: string;
  title: string;
  trailing?: string;
};

export function SectionHeader({ index, overline, title, trailing }: Props) {
  return (
    <View style={{ marginBottom: space.m }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: space.s,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: space.s }}>
          {index !== undefined ? (
            <Text variant="mono" tone="ochre" uppercase tracking={1.8}>
              {toRoman(index)}
            </Text>
          ) : null}
          {overline ? (
            <Text variant="label" uppercase tracking={2} tone="inkMuted">
              {overline}
            </Text>
          ) : null}
        </View>
        {trailing ? (
          <Text variant="mono" tone="inkMuted">
            {trailing}
          </Text>
        ) : null}
      </View>
      <Text variant="h3" style={{ color: palette.ink }}>
        {title}
      </Text>
      <View style={{ marginTop: space.s }}>
        <Rule weight="regular" />
      </View>
    </View>
  );
}
