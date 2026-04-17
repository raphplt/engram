import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { palette, space } from '../tokens';
import { Text } from './Text';

type Tone = 'ink' | 'ochre' | 'paper' | 'forest' | 'slate' | 'bordeaux' | 'ghost';

type Props = {
  label: string;
  tone?: Tone;
  outlined?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
};

const bg = (t: Tone): string => {
  switch (t) {
    case 'ink':
      return palette.ink;
    case 'ochre':
      return palette.ochre;
    case 'paper':
      return palette.paperDeep;
    case 'forest':
      return palette.forest;
    case 'slate':
      return palette.slate;
    case 'bordeaux':
      return palette.bordeaux;
    case 'ghost':
      return 'transparent';
  }
};

const fg = (t: Tone): string =>
  t === 'paper' || t === 'ghost' ? palette.ink : palette.paper;

export function Chip({ label, tone = 'ink', outlined, onPress, style }: Props) {
  const Comp: any = onPress ? Pressable : View;
  return (
    <Comp
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: outlined ? 'transparent' : bg(tone),
          borderColor: outlined ? palette.rule : 'transparent',
          borderWidth: outlined ? 1 : 0,
        },
        style,
      ]}
    >
      <Text
        variant="mono"
        uppercase
        tracking={1.4}
        style={{ color: outlined ? palette.ink : fg(tone), fontSize: 10 }}
      >
        {label}
      </Text>
    </Comp>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: space.s,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
});
