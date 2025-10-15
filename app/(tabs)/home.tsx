import { View } from 'react-native';
import Screen from '@/components/ui/Screen';
import Text from '@/components/ui/Text';
import { theme } from '@/src/theme';

export default function Home() {
  return (
    <Screen>
      <Text variant="title">Home</Text>
      <Text>Добро пожаловать! Это стартовый экран.</Text>
      <View style={{ height: theme.spacing(4) }} />
      <Text variant="muted">Версия: 1.0.0</Text>
    </Screen>
  );
}
