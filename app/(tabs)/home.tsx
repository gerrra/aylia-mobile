import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Screen from '@/components/ui/Screen';
import Text from '@/components/ui/Text';
import { theme } from '@/src/theme';
import { getExtra } from '@/src/config';
import { api } from '@/src/api/client';
import { logger } from '@/src/lib/logger';

export default function Home() {
  const config = getExtra();
  const [status, setStatus] = useState('...');

  useEffect(() => {
    logger.info('Home screen mounted', {
      env: config.APP_ENV,
      apiUrl: config.API_URL,
    });

    api
      .get<{ ok: boolean }>('/health')
      .then(() => {
        logger.info('Health check successful');
        setStatus('API OK');
      })
      .catch((e) => {
        logger.warn('Health check failed', { error: e.message });
        setStatus(`API ERR: ${e.message}`);
      });
  }, [config.APP_ENV, config.API_URL]);

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
