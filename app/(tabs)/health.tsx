import { useEffect, useState } from 'react';
import { View, Pressable } from 'react-native';
import Screen from '@/components/ui/Screen';
import Text from '@/components/ui/Text';
import { api } from '@/src/api/client';
import { getExtra } from '@/src/config';
import { theme } from '@/src/theme';
import { logger } from '@/src/lib/logger';
import ErrorTester from '@/components/ErrorTester';

type Health = { ok: boolean; version?: string };

export default function HealthScreen() {
  const [apiStatus, setApiStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const [errMsg, setErrMsg] = useState<string>('');
  const { APP_ENV, API_URL } = getExtra();

  async function check() {
    setApiStatus('idle');
    setErrMsg('');
    try {
      logger.info('Health check start', { API_URL, APP_ENV });
      const data = await api.get<Health>('/health'); // ожидается эндпоинт на бэке
      if (data?.ok) {
        setApiStatus('ok');
        logger.info('Health check OK', data);
      } else {
        setApiStatus('err');
        setErrMsg('Ответ без ok=true');
        logger.warn('Health check WARN', data);
      }
    } catch (e: any) {
      setApiStatus('err');
      setErrMsg(e?.message ?? 'Unknown error');
      logger.error('Health check ERROR', e);
    }
  }

  useEffect(() => {
    check();
  }, []);

  const badgeStyleBase = {
    paddingVertical: theme.spacing(1),
    paddingHorizontal: theme.spacing(2),
    borderRadius: theme.radius.md,
  };

  return (
    <Screen>
      <Text variant="title">System Health</Text>
      <Text variant="subtitle">ENV: {APP_ENV}</Text>
      <Text>API_URL: {API_URL}</Text>

      <View style={{ height: theme.spacing(4) }} />

      {apiStatus === 'ok' && (
        <View style={[badgeStyleBase, { backgroundColor: '#DCFCE7' }]}>
          <Text style={{ color: '#166534' }}>API: OK</Text>
        </View>
      )}
      {apiStatus === 'idle' && (
        <View style={[badgeStyleBase, { backgroundColor: '#E0E7FF' }]}>
          <Text style={{ color: '#3730A3' }}>Проверка…</Text>
        </View>
      )}
      {apiStatus === 'err' && (
        <View style={[badgeStyleBase, { backgroundColor: '#FEE2E2' }]}>
          <Text style={{ color: '#991B1B' }}>API: ERROR — {errMsg}</Text>
        </View>
      )}

      <View style={{ height: theme.spacing(4) }} />

      <Pressable
        onPress={check}
        style={{
          backgroundColor: theme.colors.primary,
          paddingVertical: theme.spacing(3),
          paddingHorizontal: theme.spacing(4),
          borderRadius: theme.radius.lg,
          alignSelf: 'flex-start',
        }}
      >
        <Text style={{ color: 'white' }} variant="button">
          Проверить ещё раз
        </Text>
      </Pressable>

      <View style={{ height: theme.spacing(4) }} />

      <ErrorTester />
    </Screen>
  );
}
