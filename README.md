# Event Квартал

Лендинг + CRM-админка для агентства детских праздников.

## 🚀 Деплой одной кнопкой

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fleofftheslayer1326-create%2Fevent-kvartal%2Ftree%2Fproduction&env=ADMIN_PASSWORD,ADMIN_SESSION_SECRET&envDescription=ADMIN_PASSWORD%20—%20пароль%20админки.%20ADMIN_SESSION_SECRET%20—%20случайная%20строка%2032%2B%20символов&stores=%5B%7B%22type%22%3A%22postgres%22%7D%5D&project-name=event-kvartal&repository-name=event-kvartal)

После клика Vercel:

1. Склонирует ветку `production` в ваш аккаунт.
2. Попросит создать **Vercel Postgres** (один клик, бесплатный free-tier).
3. Запросит `ADMIN_PASSWORD` и `ADMIN_SESSION_SECRET`.
4. Задеплоит и выдаст URL вида `https://event-kvartal-xxxx.vercel.app`.

Билд автоматически выполнит `prisma migrate deploy` и создаст таблицу `Lead` в Postgres.

## Стек

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind v4** — стилизация, токены через `@theme`
- **Framer Motion** + **GSAP** + **Lenis** — анимации и smooth scroll
- **Prisma 6** + **Postgres** (production) / **SQLite** (ветка `main`, для local dev)
- **Cookie-based auth** — простая защита админки

## Локальный запуск

Ветка `main` — настроена под SQLite, никаких внешних БД:

```bash
git checkout main
npm install
npx prisma db push
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000) — лендинг,
[http://localhost:3000/admin](http://localhost:3000/admin) — админка (пароль `admin`).

## Переменные окружения

| Переменная | Назначение | Где задать |
|---|---|---|
| `DATABASE_URL` | Postgres connection string | Vercel Postgres подставит сам |
| `ADMIN_PASSWORD` | пароль админки | Vercel UI при импорте |
| `ADMIN_SESSION_SECRET` | секрет для подписи cookie (32+ симв.) | Vercel UI при импорте |
| `TELEGRAM_BOT_TOKEN` | (опц.) уведомления о заявках | Vercel UI настройки |
| `TELEGRAM_CHAT_ID` | (опц.) куда слать уведомления | Vercel UI настройки |
| `NEXT_PUBLIC_SITE_URL` | (опц.) канон-домен для sitemap | Vercel UI настройки |

### Telegram-уведомления

1. Создать бота через [@BotFather](https://t.me/BotFather), получить токен.
2. Написать боту любое сообщение.
3. Узнать `chat_id`: `https://api.telegram.org/bot<TOKEN>/getUpdates`.
4. В Vercel → Settings → Environment Variables — добавить `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`.

Если переменные пустые — уведомления молча пропускаются.

## Структура

```
src/
  app/
    page.tsx                       # лендинг
    layout.tsx                     # шрифты, метатеги, Toaster
    globals.css                    # дизайн-токены, утилиты, анимации
    services/[slug]/page.tsx       # страницы услуг
    admin/
      page.tsx                     # канбан-доска заявок
      admin-board.tsx              # клиентский UI
      login/page.tsx               # вход
    api/
      lead/route.ts                # приём заявок с лендинга
      admin/
        login/route.ts             # авторизация
        logout/route.ts
        leads/route.ts             # список (защищено middleware)
        leads/[id]/route.ts        # PATCH/DELETE
        leads/export/route.ts      # CSV-экспорт
    sitemap.ts, robots.ts
  components/
    nav, hero, services, cases, gallery,
    process, advantages, testimonials,
    lead-form, faq, footer, marquee-line,
    floating-decor, smooth-scroll
  lib/
    config.ts                      # бренд, услуги, кейсы, отзывы, FAQ
    db.ts                          # singleton PrismaClient
    auth.ts                        # cookie + HMAC
    notify.ts                      # Telegram
    cn.ts                          # tailwind classnames helper
  middleware.ts                    # защита /admin/*
prisma/
  schema.prisma                    # модель Lead
  migrations/0_init/migration.sql  # начальная Postgres-миграция
```

## Контент

Все тексты, услуги, цены, отзывы, FAQ — в `src/lib/config.ts`. Менять
название / контакты / услуги — там одно место.

## После деплоя

- Откройте `/admin/login`, войдите с `ADMIN_PASSWORD`.
- Отправьте тестовую заявку через форму на лендинге.
- Карточка появится в канбане «Новые».
- Можно покликать статусы, добавить заметку, экспортировать CSV.
