import Screen from '@/components/ui/Screen';
import Text from '@/components/ui/Text';
import { theme } from '@/src/theme';
import { View } from 'react-native';

export default function Settings() {
  return (
    <Screen>
      <Text variant="title">Settings</Text>
      <Text variant="subtitle">Базовые настройки приложения</Text>
      <View style={{ height: theme.spacing(4) }} />
      <Text>Здесь позже появятся переключатели и параметры.</Text>
    </Screen>
  );
}
