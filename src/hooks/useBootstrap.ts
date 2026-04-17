import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { getDb } from '../db/client';
import { seedIfNeeded } from '../db/seed';
import { fontMap } from '../ui/fonts';

export function useBootstrap() {
  const [fontsLoaded] = useFonts(fontMap);
  const [dbReady, setDbReady] = useState(false);
  const [seedInfo, setSeedInfo] = useState<{ seeded: boolean; themes: number; cards: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await getDb();
        const info = await seedIfNeeded();
        if (!mounted) return;
        setSeedInfo(info);
        setDbReady(true);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message ?? String(e));
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return { ready: fontsLoaded && dbReady, fontsLoaded, dbReady, seedInfo, error };
}
