import { View, Text } from 'react-native';
import Screen from '@/components/ui/Screen';

export default function Home() {
  return (
    <Screen>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Home</Text>
      <Text>Добро пожаловать! Это стартовый экран.</Text>
    </Screen>
  );
}
