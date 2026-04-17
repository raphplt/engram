import { View, ViewStyle } from 'react-native';
import { palette } from '../tokens';

type Props = {
  weight?: 'hair' | 'regular' | 'heavy';
  tone?: 'ink' | 'soft' | 'paper';
  vertical?: boolean;
  style?: ViewStyle;
};

export function Rule({ weight = 'hair', tone = 'ink', vertical, style }: Props) {
  const thick = weight === 'heavy' ? 2 : weight === 'regular' ? 1 : StyleHair();
  const color = tone === 'ink' ? palette.rule : tone === 'paper' ? palette.paper : palette.ruleSoft;
  return (
    <View
      style={[
        vertical
          ? { width: thick, alignSelf: 'stretch', backgroundColor: color }
          : { height: thick, alignSelf: 'stretch', backgroundColor: color },
        style,
      ]}
    />
  );
}

function StyleHair() {
  return 1;
}
