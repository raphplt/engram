import { View } from 'react-native';
import { palette, space } from '../tokens';
import { Text } from './Text';
import { Rule } from './Rule';

type Props = {
  label: string;
  value: string | number;
  sub?: string;
  align?: 'left' | 'right';
  bordered?: boolean;
};

export function Stat({ label, value, sub, align = 'left', bordered }: Props) {
  return (
    <View
      style={{
        paddingVertical: space.s,
        alignItems: align === 'right' ? 'flex-end' : 'flex-start',
        borderTopWidth: bordered ? 1 : 0,
        borderBottomWidth: bordered ? 1 : 0,
        borderColor: palette.rule,
      }}
    >
      <Text variant="label" tone="inkMuted" uppercase tracking={1.6}>
        {label}
      </Text>
      <Text variant="h2" style={{ marginTop: space.xs, color: palette.ink }}>
        {value}
      </Text>
      {sub ? (
        <Text variant="caption" tone="inkMuted" style={{ marginTop: 2 }}>
          {sub}
        </Text>
      ) : null}
    </View>
  );
}

export function StatRow({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'stretch', gap: 0 }}>
      {children}
    </View>
  );
}
