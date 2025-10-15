import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Screen from '@/components/ui/Screen';
import Text from '@/components/ui/Text';
import { theme } from '@/src/theme';
import { getExtra } from '@/src/config';
import { api } from '@/src/api/client';

export default function Home() {
  const config = getExtra();
  const [status, setStatus] = useState('...');

  useEffect(() => {
    api
      .get<{ ok: boolean }>('/health')
      .then(() => setStatus('API OK'))
      .catch((e) => setStatus(`API ERR: ${e.message}`));
  }, []);

  return (
    <Screen>
      <Text variant="title">Home</Text>
      <Text>Добро пожаловать! Это стартовый экран.</Text>
      <View style={{ height: theme.spacing(4) }} />
      <Text variant="muted">Версия: 1.0.0</Text>
      <View style={{ height: theme.spacing(2) }} />
      <Text variant="muted">Окружение: {config.APP_ENV}</Text>
      <Text variant="muted">API: {config.API_URL}</Text>
      <View style={{ height: theme.spacing(2) }} />
      <Text variant="muted">Статус API: {status}</Text>
    </Screen>
  );
}
