import { Pressable, View } from 'react-native';
import Text from '@/components/ui/Text';
import { theme } from '@/src/theme';

/**
 * Компонент для тестирования глобального перехвата ошибок
 * Используется только в development для проверки ErrorBoundary
 */
export default function ErrorTester() {
  const throwError = () => {
    throw new Error('Тестовая ошибка для проверки глобального перехватчика');
  };

  const throwAsyncError = async () => {
    // Симулируем асинхронную ошибку
    setTimeout(() => {
      throw new Error('Асинхронная ошибка');
    }, 100);
  };

  return (
    <View style={{ gap: theme.spacing(2) }}>
      <Text variant="subtitle">Тест ошибок (только dev):</Text>

      <Pressable
        onPress={throwError}
        style={{
          backgroundColor: '#FEE2E2',
          padding: theme.spacing(2),
          borderRadius: theme.radius.md,
        }}
      >
        <Text style={{ color: '#991B1B' }}>Выбросить синхронную ошибку</Text>
      </Pressable>

      <Pressable
        onPress={throwAsyncError}
        style={{
          backgroundColor: '#FEF3C7',
          padding: theme.spacing(2),
          borderRadius: theme.radius.md,
        }}
      >
        <Text style={{ color: '#92400E' }}>Выбросить асинхронную ошибку</Text>
      </Pressable>
    </View>
  );
}
