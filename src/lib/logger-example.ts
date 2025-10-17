// Пример использования логгера
import { logger } from '@/src/lib/logger';

// Демонстрация различных уровней логирования
export function demonstrateLogger() {
  logger.debug('Это debug сообщение - видно только в dev');
  logger.info('Это info сообщение - видно только в dev');
  logger.warn('Это warning - видно везде');
  logger.error('Это error - видно везде');

  // Логирование с дополнительными данными
  logger.info('Пользователь вошел в систему', {
    userId: '12345',
    timestamp: new Date().toISOString(),
    device: 'iPhone 15',
  });

  // Логирование ошибок с контекстом
  try {
    throw new Error('Что-то пошло не так');
  } catch (error) {
    logger.error('Ошибка при обработке запроса', {
      error: error.message,
      stack: error.stack,
      context: { userId: '12345', action: 'login' },
    });
  }
}

// В production (NODE_ENV=production) будут видны только warn и error
// В development видны все уровни
