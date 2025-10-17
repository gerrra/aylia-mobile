/* Лёгкий логгер: одинаковый формат в dev/prod, без внешних зависимостей */
type Level = 'debug' | 'info' | 'warn' | 'error';

function log(level: Level, message: string, extra?: unknown) {
  const ts = new Date().toISOString();
  // В проде оставим только warn/error
  if (
    process.env.NODE_ENV === 'production' &&
    (level === 'debug' || level === 'info')
  ) {
    return;
  }
  // eslint-disable-next-line no-console
  console[level === 'debug' ? 'log' : level](
    `[${ts}] [${level.toUpperCase()}] ${message}`,
    extra ?? ''
  );
}

export const logger = {
  debug: (msg: string, extra?: unknown) => log('debug', msg, extra),
  info: (msg: string, extra?: unknown) => log('info', msg, extra),
  warn: (msg: string, extra?: unknown) => log('warn', msg, extra),
  error: (msg: string, extra?: unknown) => log('error', msg, extra),
};
