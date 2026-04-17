import { Pressable, View, StyleSheet, PressableProps, ViewStyle } from 'react-native';
import { palette, space } from '../tokens';
import { Text } from './Text';

type Variant = 'primary' | 'ghost' | 'outline' | 'danger' | 'ink';
type Size = 'sm' | 'md' | 'lg';

type Props = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  variant?: Variant;
  size?: Size;
  block?: boolean;
  hint?: string;
  trailing?: string;
  style?: ViewStyle;
};

const bgFor = (v: Variant, pressed: boolean) => {
  switch (v) {
    case 'primary':
      return pressed ? palette.ochreDeep : palette.ochre;
    case 'ghost':
      return 'transparent';
    case 'outline':
      return pressed ? palette.paperDeep : 'transparent';
    case 'danger':
      return pressed ? '#7e2d20' : palette.danger;
    case 'ink':
      return pressed ? palette.inkSoft : palette.ink;
  }
};

const fgFor = (v: Variant) => {
  switch (v) {
    case 'primary':
    case 'danger':
    case 'ink':
      return palette.paper;
    case 'outline':
    case 'ghost':
      return palette.ink;
  }
};

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  block,
  hint,
  trailing,
  style,
  ...rest
}: Props) {
  const padH = size === 'sm' ? space.m : size === 'lg' ? space.xl : space.l;
  const padV = size === 'sm' ? space.s : size === 'lg' ? space.l : space.m;
  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [
        styles.base,
        {
          paddingHorizontal: padH,
          paddingVertical: padV,
          backgroundColor: bgFor(variant, pressed),
          borderColor: variant === 'outline' ? palette.rule : 'transparent',
          borderWidth: variant === 'outline' ? 1 : 0,
          alignSelf: block ? 'stretch' : 'flex-start',
          opacity: rest.disabled ? 0.45 : 1,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.s }}>
        {hint ? (
          <Text variant="mono" uppercase style={{ color: fgFor(variant), opacity: 0.6 }}>
            {hint}
          </Text>
        ) : null}
        <Text
          variant={size === 'lg' ? 'bodyL' : 'body'}
          style={{
            color: fgFor(variant),
            fontFamily: 'Inter_500Medium',
            letterSpacing: 0.2,
          }}
        >
          {label}
        </Text>
        {trailing ? (
          <Text variant="mono" style={{ color: fgFor(variant), opacity: 0.7, marginLeft: space.xs }}>
            {trailing}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
