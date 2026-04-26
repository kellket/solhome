# Learnings — SEO Phase 2

## Конкурентный анализ sknebo.ru

### Их сильные стороны:
- FAQPage schema с 9 вопросами → rich snippets в поиске
- 87 городских страниц для геотаргетинга МО
- Соцсети в футере: Telegram, WhatsApp, VK, YouTube
- Яндекс.Метрика (ID: 52208992)
- Цена в meta description: "от 3160 ₽/м²"

### Их слабые стороны:
- НЕТ JSON-LD (используют устаревший Microdata)
- НЕТ Twitter Cards
- НЕТ Google Analytics/GTM
- НЕТ верификационных тегов

### Наши преимущества:
- JSON-LD лучше чем Microdata (Google рекомендует)
- Twitter Cards настроены
- Современный стек (Next.js 16 App Router)

---

## Паттерны проекта

### Структура страниц:
- `page.tsx` — серверный компонент с export metadata
- `*Client.tsx` — клиентский компонент с "use client"

### JSON-LD:
- Добавляется через `<script type="application/ld+json" dangerouslySetInnerHTML={{...}}/>`
- В клиентских компонентах работает (Calculator.tsx пример)

### Стилистика:
- Темный фон: #1a1714
- Gold акцент: градиент gold-gradient-text
- Шрифты: Onest (основной), Jost (акценты)
- Анимации: GSAP + ScrollTrigger

---

## Страница /services (A1)

### Созданные файлы:
- `src/app/services/page.tsx` — серверный компонент с metadata
- `src/app/services/ServicesPageClient.tsx` — клиентский компонент

### Паттерн JSON-LD для услуг:
- ItemList с Service элементами
- Каждый Service включает: name, description, provider (LocalBusiness), areaServed
- Добавляется через `<script type="application/ld+json" dangerouslySetInnerHTML={{...}}/>`

### Стилистика карточек услуг:
- bg-gradient-to-br from-[#d0c4b8]/80 via-[#c4b8ad]/75 to-[#b8aa9d]/70
- backdrop-blur-md, border border-white/40
- hover: border-gold/50, -translate-y-2
- Иконки в круглых контейнерах с hover эффектом
