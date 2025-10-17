# 📋 Система логирования и обработки ошибок

## 🎯 Обзор

В приложении реализована комплексная система логирования и перехвата ошибок:

1. **Логгер** (`src/lib/logger.ts`) - структурированное логирование
2. **API-логирование** - автоматическое логирование всех HTTP-запросов
3. **Глобальный перехват ошибок** - перехват необработанных ошибок
4. **Экран Health** - мониторинг состояния API

## 🔧 Логгер

### **Использование:**

```typescript
import { logger } from '@/src/lib/logger';

// Различные уровни логирования
logger.debug('Отладочная информация');
logger.info('Информационное сообщение');
logger.warn('Предупреждение');
logger.error('Ошибка');

// С дополнительными данными
logger.info('Пользователь вошел', {
  userId: '12345',
  timestamp: new Date().toISOString(),
});
```

### **Уровни логирования:**

| Уровень | Development | Production | Назначение            |
| ------- | ----------- | ---------- | --------------------- |
| `debug` | ✅ Видно    | ❌ Скрыто  | Отладочная информация |
| `info`  | ✅ Видно    | ❌ Скрыто  | Общая информация      |
| `warn`  | ✅ Видно    | ✅ Видно   | Предупреждения        |
| `error` | ✅ Видно    | ✅ Видно   | Ошибки                |

## 🌐 API-логирование

Все HTTP-запросы автоматически логируются:

```typescript
// Автоматически логируется:
logger.debug('API Request: GET https://api.aylia.ai/health', {
  body: undefined,
  headers: { 'Content-Type': 'application/json' },
});

// При успехе:
logger.debug('API Success: GET https://api.aylia.ai/health', {
  data: { ok: true },
});

// При ошибке:
logger.error('API Error: GET https://api.aylia.ai/health', {
  status: 404,
  statusText: 'Not Found',
  body: 'Not Found',
});
```

## ⚠️ Глобальный перехват ошибок

Настроен в `app/_layout.tsx` для перехвата всех необработанных ошибок:

```typescript
// Перехватывает:
- Синхронные ошибки (throw new Error())
- Асинхронные ошибки (setTimeout(() => throw new Error()))
- Ошибки в компонентах React
- Ошибки в нативном коде
```

### **Что происходит при ошибке:**

1. **Логирование** через `logger.error()`
2. **Console.error** для отладки
3. **Вызов оригинального обработчика** (не блокирует приложение)

## 🏥 Экран Health

Экран `app/(tabs)/health.tsx` предоставляет:

### **Мониторинг API:**

- ✅ Проверка доступности `/health` эндпоинта
- ✅ Отображение статуса подключения
- ✅ Кнопка для повторной проверки
- ✅ Логирование всех проверок

### **Тестирование ошибок:**

- 🔴 Кнопка для синхронной ошибки
- 🔴 Кнопка для асинхронной ошибки
- 🔍 Проверка работы глобального перехватчика

### **Отображение конфигурации:**

- 📊 Окружение (preview/production)
- 🔗 URL API
- 📱 Версия приложения

## 📊 Формат логов

Все логи имеют единый формат:

```
[2024-01-15T10:30:45.123Z] [INFO] Home screen mounted { env: 'preview', apiUrl: 'https://api.dev.aylia.ai' }
[2024-01-15T10:30:45.456Z] [DEBUG] API Request: GET https://api.dev.aylia.ai/health { body: undefined }
[2024-01-15T10:30:45.789Z] [ERROR] API Error: GET https://api.dev.aylia.ai/health { status: 404, statusText: 'Not Found' }
```

## 🔮 Будущие улучшения

### **Интеграция с Sentry:**

```typescript
// В будущем можно добавить:
import * as Sentry from '@sentry/react-native';

// В глобальном обработчике:
Sentry.captureException(error, {
  tags: { isFatal },
  extra: { timestamp: new Date().toISOString() },
});
```

### **Отправка логов на сервер:**

```typescript
// Можно добавить отправку критических ошибок:
if (level === 'error') {
  await sendToServer({ level, message, extra, timestamp });
}
```

### **Локальное хранение логов:**

```typescript
// Для отладки можно сохранять логи в AsyncStorage:
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveLog = async (log) => {
  const logs = (await AsyncStorage.getItem('app_logs')) || '[]';
  const parsed = JSON.parse(logs);
  parsed.push(log);
  await AsyncStorage.setItem('app_logs', JSON.stringify(parsed.slice(-100))); // последние 100
};
```

## 🎯 Рекомендации

### **Что логировать:**

- ✅ Критические ошибки
- ✅ Пользовательские действия (логин, покупки)
- ✅ API-запросы и ответы
- ✅ Изменения состояния приложения

### **Что НЕ логировать:**

- ❌ Пароли и токены
- ❌ Персональные данные
- ❌ Слишком частые события (каждый рендер)

### **В production:**

- 🔇 Отключить debug/info логи
- 📊 Настроить отправку ошибок в Sentry
- 📈 Добавить метрики производительности

## 🔗 Ссылки

- [React Native Error Handling](https://reactnative.dev/docs/error-handling)
- [Sentry React Native](https://docs.sentry.io/platforms/react-native/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
