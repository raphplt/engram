import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { palette, fonts } from '@/ui/tokens';
import { Text } from '@/ui/components/Text';
import { Rule } from '@/ui/components/Rule';

function TabLabel({ label, focused }: { label: string; focused: boolean }) {
  return (
    <View style={{ alignItems: 'center', paddingTop: 4, minWidth: 60 }}>
      <Text
        variant="mono"
        uppercase
        tracking={1.6}
        style={{
          color: focused ? palette.ink : palette.inkFaint,
          fontFamily: focused ? fonts.monoMedium : fonts.mono,
          fontSize: 10,
        }}
      >
        {label}
      </Text>
      <View style={{ height: 3, width: 18, marginTop: 6, backgroundColor: focused ? palette.ochre : 'transparent' }} />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: palette.paper,
          borderTopWidth: 1,
          borderTopColor: palette.rule,
          height: 68,
          paddingTop: 8,
        },
        tabBarBackground: () => <View style={{ flex: 1, backgroundColor: palette.paper }} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabLabel label="Jour" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="themes"
        options={{
          tabBarIcon: ({ focused }) => <TabLabel label="Thèmes" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          tabBarIcon: ({ focused }) => <TabLabel label="Atlas" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => <TabLabel label="Réglages" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
