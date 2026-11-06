# Jupiter HR Landing

Маркетинговый лендинг корпоративной HR-платформы Jupiter HR.

## Запуск

```bash
pnpm install
pnpm run dev
```

Откройте [http://localhost:3002](http://localhost:3002).

## Структура

- `app/page.tsx` — главная
- `app/modules/[slug]/page.tsx` — страницы модулей
- `app/api/lead/route.ts` — приём заявок на демо
- `components/sections/` — секции лендинга
- `components/modules/` — шаблон страницы модуля
- `content/landing.ts` — тексты главной (RU)
- `content/modules.ts` — каталог модулей и детальные описания
- `content/productScreens.ts` — каталог экранов продукта
- `public/screenshots/` — скриншоты UI (при отсутствии файла показывается placeholder)

## Переменные окружения

Скопируйте [`.env.example`](.env.example) в `.env.local` и заполните:

| Переменная | Назначение |
|------------|------------|
| `NEXT_PUBLIC_SITE_URL` | Канонический URL сайта (sitemap, OG, JSON-LD) |
| `TELEGRAM_BOT_TOKEN` | Токен бота от [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID` | ID чата (или несколько через запятую), куда слать заявки |
| `NEXT_PUBLIC_YM_ID` | ID счётчика Яндекс Метрики (вебвизор включён) |
| `NEXT_PUBLIC_GA_ID` | Опционально: Measurement ID GA4 (`G-…`) |

Без `TELEGRAM_*` `POST /api/lead` отвечает `503`. Email (Resend) не используется — только Telegram.

Цели Метрики / события GA4: `demo_click`, `lead_submit`, `telegram_click`.

Форма на `#demo` валидируется zod на клиенте и сервере, есть honeypot и простой rate limit по IP (5 заявок / 10 минут).

## Модули

| URL | Модуль |
|-----|--------|
| `/modules/organization` | Организация |
| `/modules/recruiting` | Рекрутинг |
| `/modules/time` | Учёт времени |
| `/modules/engagement` | Вовлечённость |
| `/modules/lms` | Обучение (LMS) |
| `/modules/tasks-docs` | Задачи и документооборот |
