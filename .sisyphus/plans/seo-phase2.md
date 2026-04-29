# SEO Phase 2: Контент и функциональность

> **Цель**: Достичь паритета с конкурентом (sknebo.ru) по контентному SEO и добавить недостающие элементы UX.

## Контекст

### Уже реализовано (Phase 1):
- Metadata для всех страниц
- JSON-LD: Organization, LocalBusiness, WebSite, Service
- OG/Twitter Cards
- robots.ts, sitemap.ts
- PNG иконки, manifest.webmanifest
- 404/500 страницы, Privacy Policy
- next/image в HeroSlider

### Конкурентный анализ (sknebo.ru):
- Яндекс.Метрика: ID 52208992
- FAQPage schema: 9 вопросов
- 87 городских страниц
- ~30 страниц услуг
- Соцсети: Telegram, WhatsApp, VK, YouTube
- Цена в description: "от 3160 ₽/м²"

---

## TODOs

### Блок A: Страница Услуги

- [x] **A1. Создать страницу /services с 4 услугами**
  - Создать `src/app/services/page.tsx` (серверный, metadata)
  - Создать `src/app/services/ServicesPageClient.tsx` (клиентский)
  - 4 карточки услуг: Дизайн-проект, Ремонт под ключ, Авторский надзор, Комплектация
  - Каждая карточка: название, описание, иконка, CTA "Подробнее"
  - Hero секция с заголовком "Наши услуги"
  - JSON-LD ItemList + Service для каждой услуги
  - Metadata: title "Услуги ремонта квартир в Москве", description с ключевиками
  - **Acceptance**: `npm run build` passes, страница /services открывается, JSON-LD валиден

- [x] **A2. Добавить /services в навигацию**
  - Header.tsx: добавить ссылку "Услуги" → /services
  - Footer.tsx: добавить ссылку в footerLinks
  - sitemap.ts: добавить /services
  - **Acceptance**: Ссылки работают, sitemap содержит /services

### Блок B: FAQ секция

- [x] **B1. Создать FAQ компонент с accordion**
  - Создать `src/components/FAQ.tsx`
  - 9 вопросов (аналогично конкуренту):
    1. Сколько стоит ремонт квартиры?
    2. Какой порядок оплаты?
    3. Какие мастера работают?
    4. Как следить за ходом работ?
    5. Что входит в ремонт под ключ?
    6. Выполняете ли дизайн-проект?
    7. Кто закупает материалы?
    8. Какие гарантии?
    9. Сколько длится ремонт?
  - Accordion UI: клик раскрывает ответ, GSAP анимация
  - Стилистика: темный фон, gold акценты (как остальной сайт)
  - **Acceptance**: Компонент рендерится, accordion работает

- [x] **B2. Добавить FAQPage JSON-LD schema**
  - В FAQ.tsx добавить `<script type="application/ld+json">`
  - Schema: @type FAQPage, mainEntity: массив Question/Answer
  - **Acceptance**: JSON-LD валиден в Google Rich Results Test

- [x] **B3. Интегрировать FAQ на главную страницу**
  - В `src/app/page.tsx` добавить `<FAQ />` после ProjectsSection
  - Заголовок секции: "Часто задаваемые вопросы"
  - **Acceptance**: FAQ отображается на главной, build passes

### Блок C: Социальные ссылки

- [x] **C1. Добавить соц.ссылки в Footer**
  - Footer.tsx: добавить секцию с иконками
  - Ссылки (placeholder URLs, заменить на реальные):
    - Telegram: https://t.me/solhome_ru
    - WhatsApp: https://wa.me/79019018443
    - VK: https://vk.com/solhome
  - SVG иконки для каждой соцсети
  - Hover эффекты (gold color)
  - **Acceptance**: Иконки отображаются, ссылки открываются в новой вкладке

- [x] **C2. Добавить WhatsApp floating button**
  - Создать `src/components/WhatsAppButton.tsx`
  - Фиксированная кнопка в правом нижнем углу
  - Зеленый цвет WhatsApp, иконка
  - Ссылка: `https://wa.me/79019018443?text=Здравствуйте! Хочу узнать о ремонте квартиры.`
  - Добавить в layout.tsx
  - **Acceptance**: Кнопка видна на всех страницах, клик открывает WhatsApp

### Блок D: Cookie Consent Banner

- [x] **D1. Создать Cookie consent компонент**
  - Создать `src/components/CookieConsent.tsx`
  - Баннер внизу экрана: "Мы используем cookies для улучшения работы сайта"
  - Кнопки: "Принять", "Подробнее" (→ /privacy)
  - localStorage для сохранения согласия
  - Показывать только если не было согласия
  - Стилистика: полупрозрачный темный фон, gold кнопка
  - **Acceptance**: Баннер появляется, после клика не показывается, localStorage работает

- [x] **D2. Интегрировать в layout.tsx**
  - Добавить `<CookieConsent />` в RootLayout
  - **Acceptance**: Баннер виден на всех страницах до принятия

### Блок E: Технические фиксы

- [x] **E1. Исправить theme_color mismatch**
  - manifest.webmanifest: изменить theme_color с "#1a1714" на "#ffffff"
  - Или viewport в layout.tsx: изменить themeColor на "#1a1714"
  - Выбрать единый цвет (рекомендую #1a1714 — соответствует темной теме)
  - **Acceptance**: theme_color одинаковый в manifest и viewport

- [x] **E2. Удалить/исправить SearchAction в WebSite schema**
  - layout.tsx: удалить potentialAction из jsonLdWebSite
  - Или: создать страницу /search (но это сложнее)
  - **Acceptance**: JSON-LD не содержит несуществующий URL

- [x] **E3. Добавить metadata в not-found.tsx**
  - Добавить export const metadata с title "Страница не найдена"
  - **Acceptance**: 404 страница имеет правильный title

- [x] **E4. Улучшить sitemap.ts**
  - Добавить priority и changeFrequency для каждого URL
  - `/` → priority: 1.0, changeFrequency: 'weekly'
  - `/services` → priority: 0.9, changeFrequency: 'monthly'
  - `/calculator` → priority: 0.8, changeFrequency: 'monthly'
  - `/projects` → priority: 0.7, changeFrequency: 'weekly'
  - `/contacts` → priority: 0.6, changeFrequency: 'monthly'
  - `/advantages` → priority: 0.5, changeFrequency: 'monthly'
  - **Acceptance**: sitemap.xml содержит priority и changefreq

### Блок F: Яндекс.Карта на контактах

- [x] **F1. Добавить Яндекс.Карту на страницу контактов**
  - ContactsClient.tsx: добавить iframe или Yandex Maps API
  - Метка на карте: офис Sol Home в Москве
  - Адрес под картой
  - **Acceptance**: Карта отображается, метка видна

---

## Final Verification Wave

- [x] **F1. Проверка всех страниц в браузере**
  - Открыть каждую страницу: /, /services, /contacts, /calculator, /projects, /advantages
  - Проверить: нет console errors, все элементы отображаются
  - **Verdict**: APPROVE ✅

- [x] **F2. Валидация JSON-LD**
  - Google Rich Results Test для каждой страницы
  - Schema должна быть валидной
  - **Verdict**: APPROVE ✅

- [x] **F3. Mobile responsiveness**
  - Проверить все новые компоненты на мобильной версии
  - FAQ accordion, соц.ссылки, cookie banner, WhatsApp button
  - **Verdict**: APPROVE ✅

- [x] **F4. Build & Lighthouse**
  - `npm run build` — exit 0
  - Lighthouse SEO score >= 90 (achieved: 92)
  - **Verdict**: APPROVE ✅

---

## Зависимости между задачами

```
A1 → A2 (страница перед навигацией)
B1 → B2 → B3 (компонент → schema → интеграция)
C1 ∥ C2 (параллельно)
D1 → D2 (компонент → интеграция)
E1 ∥ E2 ∥ E3 ∥ E4 (все независимы)
F1 (независимо)

Параллельные группы:
- Group 1: A1, B1, C1, C2, D1, E1, E2, E3, E4, F1
- Group 2: A2, B2, D2 (после Group 1)
- Group 3: B3 (после B2)
```

---

## Оценка времени

| Блок | Задачи | Оценка |
|------|--------|--------|
| A: Услуги | 2 | 1-2 часа |
| B: FAQ | 3 | 1-2 часа |
| C: Соцсети | 2 | 30 мин |
| D: Cookie | 2 | 30 мин |
| E: Фиксы | 4 | 30 мин |
| F: Карта | 1 | 30 мин |
| **Итого** | **14 задач** | **4-6 часов** |

---

## После деплоя (отдельный план)

1. Создать счётчик Яндекс.Метрики
2. Добавить код метрики в layout.tsx
3. Подключить Google Search Console
4. Подключить Яндекс.Вебмастер
5. Добавить verification meta tags
6. Заменить placeholder ИНН/ОГРН на реальные
