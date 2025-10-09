import { Text } from 'react-native';
import Screen from '@/components/ui/Screen';

export default function Settings() {
  return (
    <Screen>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Settings</Text>
      <Text>Экран настроек.</Text>
    </Screen>
  );
}
