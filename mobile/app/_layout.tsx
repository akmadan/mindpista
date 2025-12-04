import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { ThemeProvider } from '@/src/providers';
import { useAppTheme } from '@/src/hooks';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Delight-Thin': require('../assets/fonts/delight-thin.otf'),
    'Delight-ExtraLight': require('../assets/fonts/delight-extralight.otf'),
    'Delight-Light': require('../assets/fonts/delight-light.otf'),
    'Delight-Regular': require('../assets/fonts/delight-regular.otf'),
    'Delight-Medium': require('../assets/fonts/delight-medium.otf'),
    'Delight-SemiBold': require('../assets/fonts/delight-semibold.otf'),
    'Delight-Bold': require('../assets/fonts/delight-bold.otf'),
    'Delight-ExtraBold': require('../assets/fonts/delight-extrabold.otf'),
    'Delight-Black': require('../assets/fonts/delight-black.otf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { theme } = useAppTheme();

  return (
    <NavigationThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth/index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </NavigationThemeProvider>
  );
}

