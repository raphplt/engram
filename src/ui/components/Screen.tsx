import { ReactNode } from 'react';
import { View, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette, space } from '../tokens';

type Props = {
  children: ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  background?: 'paper' | 'paperDeep' | 'ink';
  edgeToEdge?: boolean;
};

export function Screen({ children, scroll, style, contentStyle, background = 'paper', edgeToEdge }: Props) {
  const insets = useSafeAreaInsets();
  const bg =
    background === 'paper' ? palette.paper : background === 'paperDeep' ? palette.paperDeep : palette.ink;
  const pad = edgeToEdge ? 0 : space.page;
  const content = (
    <View
      style={[
        { paddingHorizontal: pad, paddingTop: insets.top + space.m, paddingBottom: insets.bottom + space.xl, flexGrow: 1 },
        contentStyle,
      ]}
    >
      {children}
    </View>
  );
  if (scroll) {
    return (
      <ScrollView
        style={[{ backgroundColor: bg, flex: 1 }, style]}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {content}
      </ScrollView>
    );
  }
  return <View style={[{ backgroundColor: bg, flex: 1 }, style]}>{content}</View>;
}

export const screenStyles = StyleSheet.create({
  headerRule: {
    height: 1,
    backgroundColor: palette.rule,
  },
});
