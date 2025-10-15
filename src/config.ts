import Constants from 'expo-constants';

// Безопасный доступ к extra
export function getExtra() {
  const extra = (Constants.expoConfig?.extra || {}) as Partial<AppConfig.Extra>;
  if (!extra._APP_EXTRA_TYPED) {
    console.warn('Extra typing flag missing. Did you load app.config.ts?');
  }
  return extra as AppConfig.Extra;
}
