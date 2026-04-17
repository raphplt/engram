import { View } from 'react-native';
import { palette } from '../tokens';

type Props = {
  value: number;
  height?: number;
  tone?: 'ochre' | 'ink' | 'forest';
  track?: 'paper' | 'ink';
};

export function ProgressBar({ value, height = 3, tone = 'ochre', track = 'paper' }: Props) {
  const v = Math.max(0, Math.min(1, value));
  const fill = tone === 'ochre' ? palette.ochre : tone === 'forest' ? palette.forest : palette.ink;
  const bg = track === 'ink' ? palette.inkSoft : palette.paperDeep;
  return (
    <View style={{ height, backgroundColor: bg, overflow: 'hidden' }}>
      <View style={{ width: `${v * 100}%`, height, backgroundColor: fill }} />
    </View>
  );
}
