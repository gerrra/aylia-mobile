# 📋 Стратегия версионирования Aylia Mobile

## 🎯 Основные правила

### 1. **`version` vs `runtimeVersion`**

```typescript
// app.config.ts
{
  version: '1.0.0',        // Версия, видимая пользователю (в сторах)
  runtimeVersion: '1.0.0'  // Версия для OTA-совместимости
}
```

### 2. **Когда менять `version`:**

- ✅ Каждый релиз в App Store / Google Play
- ✅ Следуем [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`
  - `MAJOR`: Несовместимые изменения API
  - `MINOR`: Новые фичи (обратно совместимые)
  - `PATCH`: Исправления багов

### 3. **Когда менять `runtimeVersion`:**

⚠️ **ТОЛЬКО** при изменении нативного кода:

- ✅ Обновление Expo SDK (`expo upgrade`)
- ✅ Добавление/удаление нативных модулей
- ✅ Изменение `android/` или `ios/` папок
- ✅ Изменение нативных зависимостей

❌ **НЕ МЕНЯТЬ** при:

- JavaScript/TypeScript изменениях
- Стилях, компонентах, экранах
- Изменениях API-клиента

## 🔄 Workflow

### **Обычная разработка (только JS/TS):**

```bash
# 1. Делаем изменения в коде
# 2. Коммитим в develop
git add .
git commit -m "feat: add new feature"
git push origin develop

# 3. GitHub Actions публикует OTA → обновление через 2-3 минуты
# 4. version и runtimeVersion НЕ МЕНЯЮТСЯ
```

### **Релиз с нативными изменениями:**

```bash
# 1. Обновили Expo SDK или добавили нативный модуль
# 2. Обновляем ОБЕИХ версии в app.config.ts:

version: '1.1.0'        // Новая версия для сторов
runtimeVersion: '1.1.0' // Новая версия для OTA

# 3. Коммитим
git add .
git commit -m "chore: bump to 1.1.0 (native changes)"
git push origin develop

# 4. Сливаем в main
git checkout main
git merge develop
git push origin main

# 5. GitHub Actions собирает новый APK
# 6. Все последующие OTA будут с runtimeVersion: '1.1.0'
```

## 📊 Примеры

### ✅ **Правильно:**

| Сценарий                | version | runtimeVersion | Действие          |
| ----------------------- | ------- | -------------- | ----------------- |
| Начальная сборка        | 1.0.0   | 1.0.0          | Полная сборка APK |
| Добавили новый экран    | 1.0.0   | 1.0.0          | OTA-обновление    |
| Фикс бага в JS          | 1.0.0   | 1.0.0          | OTA-обновление    |
| Обновили Expo SDK 54→55 | 1.1.0   | 1.1.0          | Полная сборка APK |
| Добавили expo-camera    | 1.1.0   | 1.1.0          | Полная сборка APK |
| Новая фича (только JS)  | 1.1.0   | 1.1.0          | OTA-обновление    |

### ❌ **Неправильно:**

```typescript
// Изменили только JS-код, но поменяли runtimeVersion
version: '1.0.0';
runtimeVersion: '1.0.1'; // ❌ Сломает OTA для существующих пользователей!
```

## 🎯 **Итог:**

1. **`runtimeVersion`** должен меняться **редко** (только при нативных изменениях)
2. **Явная строка** (`'1.0.0'`) лучше, чем `{ policy: 'sdkVersion' }`
3. **Всегда** делайте полную пересборку APK после изменения `runtimeVersion`
4. **Документируйте** каждое изменение `runtimeVersion` в CHANGELOG

## 🔗 Ссылки

- [Expo Runtime Versions](https://docs.expo.dev/eas-update/runtime-versions/)
- [Semantic Versioning](https://semver.org/)
