import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useBootstrap } from '@/hooks/useBootstrap';
import { palette } from '@/ui/tokens';
import { Text } from '@/ui/components/Text';

export default function RootLayout() {
  const { ready, error } = useBootstrap();

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: palette.paper }]}>
        <Text variant="h3" tone="ochre">Erreur de démarrage</Text>
        <Text variant="body" style={{ marginTop: 12, textAlign: 'center', paddingHorizontal: 32 }}>{error}</Text>
      </View>
    );
  }

  if (!ready) {
    return (
      <View style={[styles.center, { backgroundColor: palette.paper }]}>
        <Text variant="label" uppercase tracking={4} tone="inkMuted">engram</Text>
        <View style={{ marginTop: 24 }}>
          <ActivityIndicator color={palette.ink} />
        </View>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: palette.paper }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, animation: 'fade', contentStyle: { backgroundColor: palette.paper } }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="session"
            options={{
              presentation: 'card',
              animation: 'slide_from_bottom',
              gestureEnabled: false,
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
