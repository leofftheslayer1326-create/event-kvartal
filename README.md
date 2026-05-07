# Event Квартал

Лендинг + CRM-админка для агентства детских праздников. Пет-проект для друга.

## Стек

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind v4** — стилизация, токены через `@theme`
- **Framer Motion** + **GSAP** + **Lenis** — анимации и smooth scroll
- **Prisma 6** + **SQLite** — CRM-база
- **Cookie-based auth** — простая защита админки

## Запуск

```bash
npm install
npx prisma db push
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000) — лендинг, [http://localhost:3000/admin](http://localhost:3000/admin) — админка.

## Конфиг

Все переменные — в `.env`:

```env
DATABASE_URL="file:./prisma/dev.db"

# Пароль админки. Поменяй перед деплоем.
ADMIN_PASSWORD="admin"
ADMIN_SESSION_SECRET="change-me-in-prod-very-secret-string-32+chars"

# Telegram-уведомления о новых заявках (опционально)
TELEGRAM_BOT_TOKEN=""
TELEGRAM_CHAT_ID=""

# Канонический URL для sitemap/robots
NEXT_PUBLIC_SITE_URL="https://event-kvartal.ru"
```

### Telegram-уведомления

1. Создать бота через [@BotFather](https://t.me/BotFather), получить токен.
2. Добавить бота в чат (или написать ему лично) — отправить любое сообщение.
3. Узнать chat_id: `https://api.telegram.org/bot<TOKEN>/getUpdates`.
4. Заполнить `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`.

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
    nav, hero, services, cases,
    process, lead-form, faq,
    footer, marquee-line,
    floating-decor, smooth-scroll
  lib/
    config.ts                      # бренд, услуги, кейсы, FAQ
    db.ts                          # singleton PrismaClient
    auth.ts                        # cookie + HMAC
    notify.ts                      # Telegram
    cn.ts                          # tailwind classnames helper
  middleware.ts                    # защита /admin/*
prisma/
  schema.prisma                    # модель Lead
```

## Контент

Все тексты, услуги, цены, FAQ — в `src/lib/config.ts`. Поменять название/контакты/услуги — там одно место.

## Деплой

Подходит Vercel или любой Node-хост. Для Beget (как Арника) лучше пересобрать в статику + отдельный API на Node, либо взять VPS.

Перед деплоем:

- сгенерить новый `ADMIN_SESSION_SECRET` (32+ случайных символа);
- задать сильный `ADMIN_PASSWORD`;
- сменить `NEXT_PUBLIC_SITE_URL` на боевой домен;
- настроить Telegram-уведомления.
