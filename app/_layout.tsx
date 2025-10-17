import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { ActivityIndicator, View } from 'react-native';
import { theme } from '@/src/theme';
import { logger } from '@/src/lib/logger';

// Глобальный перехват необработанных ошибок
if (typeof ErrorUtils !== 'undefined') {
  // @ts-ignore
  const origHandler = ErrorUtils.getGlobalHandler?.();
  // @ts-ignore
  ErrorUtils.setGlobalHandler?.((error: any, isFatal?: boolean) => {
    // Логируем ошибку через наш логгер
    logger.error('GLOBAL ERROR', {
      isFatal,
      error: error?.message || 'Unknown error',
      stack: error?.stack,
    });

    // Также выводим в console.error для отладки
    console.error('GLOBAL ERROR', { isFatal, error });

    // Вызываем оригинальный обработчик
    origHandler?.(error, isFatal);
  });
}

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!loaded) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.bg,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
