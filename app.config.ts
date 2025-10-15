import 'dotenv/config';
import type { ExpoConfig } from 'expo/config';

// Маппинг каналов OTA -> окружений (можно менять под себя)
const CHANNEL_BY_ENV = {
  preview: 'preview',
  production: 'production',
} as const;

type AppEnv = keyof typeof CHANNEL_BY_ENV;

function getEnv(): AppEnv {
  const env = (process.env.APP_ENV || 'preview') as AppEnv;
  if (!(env in CHANNEL_BY_ENV)) return 'preview';
  return env;
}

const APP_ENV = getEnv();

const config: ExpoConfig = {
  name: 'Aylia',
  slug: 'aylia',
  scheme: 'aylia',
  version: '1.0.0',

  ios: { bundleIdentifier: 'com.aylia.finance' },
  android: { package: 'com.aylia.finance' },

  // EAS заполнит projectId и updates.url после `eas build:configure`.
  extra: {
    APP_ENV,
    API_URL: process.env.API_URL || 'https://api.example.com',
    // Для рантайма и TypeScript:
    _APP_EXTRA_TYPED: true,
  },

  updates: {
    enabled: true,
    checkAutomatically: 'ON_LOAD',
    fallbackToCacheTimeout: 0,
  },

  runtimeVersion: { policy: 'sdkVersion' },
};

export default config;
