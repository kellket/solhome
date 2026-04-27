"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const checklistItems = [
  "Регулярные визиты на объект (2-3 раза в неделю)",
  "Проверка соответствия работ проекту",
  "Контроль качества материалов",
  "Проверка скрытых работ (электрика, сантехника)",
  "Консультации по выбору материалов",
  "Решение спорных вопросов с подрядчиком",
  "Фотоотчёты о ходе работ",
  "Приёмка выполненных этапов",
];

const whenNeeded = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: "Есть дизайн-проект",
    desc: "У вас есть дизайн-проект, но ремонт делает другая компания",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Контроль скрытых работ",
    desc: "Вы хотите быть уверены в качестве скрытых работ",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Независимый контроль",
    desc: "Нужен независимый контроль за подрядчиком",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8l-4 4-4-4" />
        <path d="M8 16l4-4 4 4" />
      </svg>
    ),
    title: "Избежать переделок",
    desc: "Хотите избежать переделок и дополнительных расходов",
  },
];

const prices = [
  {
    title: "Разовый визит",
    price: "от 5 000 ₽",
    desc: "Экспертная оценка текущего состояния работ",
  },
  {
    title: "Пакет 10 визитов",
    price: "от 40 000 ₽",
    desc: "Регулярный контроль ключевых этапов ремонта",
  },
  {
    title: "Полное сопровождение",
    price: "от 15 000 ₽/мес",
    desc: "Непрерывный авторский надзор на весь период",
  },
];

const faqItems = [
  {
    q: "Как часто дизайнер будет приезжать на объект?",
    a: "Частота визитов зависит от этапа работ и выбранного пакета услуг. На активных этапах (черновые работы, прокладка коммуникаций) рекомендуем 2-3 визита в неделю. На финишных этапах достаточно 1-2 визитов. При полном сопровождении мы составляем индивидуальный график под ваш проект.",
  },
  {
    q: "Можно ли заказать только проверку скрытых работ?",
    a: "Да, это один из самых востребованных форматов. Мы приезжаем на объект до закрытия стен и потолков, проверяем качество электрики, сантехники, вентиляции, гидроизоляции. Фиксируем всё в акте с фотоотчётом. Это минимальная, но критически важная проверка.",
  },
  {
    q: "Что если подрядчик не согласен с замечаниями?",
    a: "Мы работаем на вашей стороне и защищаем ваши интересы. Все замечания фиксируются документально с фото и ссылками на СНиПы, ГОСТы, технологические карты производителей. Это убедительная доказательная база. При необходимости участвуем в переговорах с подрядчиком.",
  },
  {
    q: "Нужен ли авторский надзор, если у меня надёжная бригада?",
    a: "Даже опытные мастера могут допускать ошибки или неточности в интерпретации проекта. Авторский надзор — это не недоверие к бригаде, а профессиональный контроль соответствия результата замыслу. Кроме того, мы отслеживаем качество материалов, которые могут подменить.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Авторский надзор за ремонтом",
  "description": "Профессиональный контроль за ходом ремонтных работ. Регулярные визиты на объект, проверка соответствия работ проекту, контроль качества материалов, приёмка этапов.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Sol Home",
    "telephone": "+7 901 901 84 43",
    "email": "info.solhome@yandex.ru",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Москва",
      "addressCountry": "RU",
    },
  },
  "areaServed": {
    "@type": "City",
    "name": "Москва",
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "Разовый визит",
      "price": "5000",
      "priceCurrency": "RUB",
    },
    {
      "@type": "Offer",
      "name": "Пакет 10 визитов",
      "price": "40000",
      "priceCurrency": "RUB",
    },
    {
      "@type": "Offer",
      "name": "Полное сопровождение",
      "price": "15000",
      "priceCurrency": "RUB",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "unitText": "месяц",
      },
    },
  ],
};

export default function NadzorClient() {
  const heroRef = useRef<HTMLElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current?.querySelectorAll(".hero-animate") || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        checklistRef.current?.querySelectorAll(".checklist-item") || [],
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: checklistRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center" style={{ background: "#1a1714" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-gold/3 blur-2xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <p className="hero-animate text-gold text-xs font-normal tracking-[0.3em] uppercase mb-6">
              Sol Home / Услуги
            </p>
            <h1 className="hero-animate text-3xl sm:text-4xl lg:text-5xl font-extralight text-white tracking-wide leading-tight mb-6">
              Авторский надзор за ремонтом в Москве
            </h1>
            <p className="hero-animate text-white/70 text-lg sm:text-xl font-extralight leading-relaxed mb-10">
              Контролируем качество и соответствие дизайн-проекту на каждом этапе
            </p>
            <Link
              href="/contacts"
              className="hero-animate inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gold-dark to-gold text-white text-base font-light tracking-wide rounded-full hover:from-gold hover:to-gold-light transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Заказать авторский надзор
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24" style={{ background: "#1a1714" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-base sm:text-lg font-extralight leading-relaxed mb-6">
              Авторский надзор — это профессиональный контроль за ходом ремонтных работ, который гарантирует соответствие результата вашему дизайн-проекту. Наш дизайнер или прораб регулярно посещает объект, проверяет качество исполнения каждого этапа и контролирует использование материалов.
            </p>
            <p className="text-white/80 text-base sm:text-lg font-extralight leading-relaxed mb-6">
              Это особенно важно, если вы делаете ремонт с другой бригадой, но хотите быть уверены, что всё выполняется правильно. Даже опытные мастера могут по-своему интерпретировать чертежи, использовать другие материалы или отступать от технологий. Авторский надзор исключает такие риски.
            </p>
            <p className="text-white/80 text-base sm:text-lg font-extralight leading-relaxed mb-6">
              Мы фиксируем каждый визит в акте с детальным фотоотчётом. Проверяем скрытые работы до их закрытия — электропроводку, сантехнику, вентиляцию, гидроизоляцию. Контролируем соблюдение технологий: правильность грунтовки, армирования, выравнивания, укладки. Следим за качеством и подлинностью материалов.
            </p>
            <p className="text-white/80 text-base sm:text-lg font-extralight leading-relaxed">
              Авторский надзор помогает избежать ошибок, которые дорого исправлять. По статистике, стоимость переделок после некачественного ремонта составляет до 30% от бюджета. Профессиональный контроль окупается многократно — вы экономите деньги, время и нервы, получая результат, который точно соответствует вашим ожиданиям.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 border-t border-white/10" style={{ background: "#1a1714" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs font-normal tracking-[0.3em] uppercase mb-4">
              Комплекс услуг
            </p>
            <h2 className="text-2xl sm:text-3xl font-extralight text-white tracking-wide">
              Что включает авторский надзор
            </h2>
          </div>

          <div ref={checklistRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {checklistItems.map((item, index) => (
              <div key={index} className="checklist-item flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gold">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-white/90 text-sm sm:text-base font-light">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 border-t border-white/10" style={{ background: "#1a1714" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs font-normal tracking-[0.3em] uppercase mb-4">
              Когда нужен
            </p>
            <h2 className="text-2xl sm:text-3xl font-extralight text-white tracking-wide">
              Когда нужен авторский надзор
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whenNeeded.map((item, index) => (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-gold/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/30 transition-colors">
                  <div className="text-gold">{item.icon}</div>
                </div>
                <h3 className="text-white text-lg font-light tracking-wide mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm font-extralight leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 border-t border-white/10" style={{ background: "#1a1714" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs font-normal tracking-[0.3em] uppercase mb-4">
              Стоимость
            </p>
            <h2 className="text-2xl sm:text-3xl font-extralight text-white tracking-wide">
              Цены на авторский надзор
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {prices.map((item, index) => (
              <div
                key={index}
                ref={(el) => { cardsRef.current[whenNeeded.length + index] = el; }}
                className="group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-gold/40 transition-all duration-300 text-center"
              >
                <h3 className="text-white text-lg font-light tracking-wide mb-4">{item.title}</h3>
                <div className="text-gold text-2xl sm:text-3xl font-light mb-4">{item.price}</div>
                <p className="text-white/60 text-sm font-extralight leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 border-t border-white/10" style={{ background: "#1a1714" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs font-normal tracking-[0.3em] uppercase mb-4">
              Вопросы и ответы
            </p>
            <h2 className="text-2xl sm:text-3xl font-extralight text-white tracking-wide">
              FAQ по авторскому надзору
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span className="text-white font-light pr-4">{item.q}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="p-5 pt-0 text-white/70 text-sm font-extralight leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 border-t border-white/10" style={{ background: "#1a1714" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-gold/20 via-gold/10 to-transparent border border-gold/30">
            <div className="absolute inset-0 rounded-3xl bg-gold/5 blur-xl -z-10" />
            
            <h2 className="text-2xl sm:text-3xl font-extralight text-white tracking-wide mb-4">
              Закажите консультацию по авторскому надзору
            </h2>
            <p className="text-white/70 text-base font-extralight mb-8 max-w-2xl mx-auto">
              Обсудим ваш проект, определим объём работ и составим индивидуальный график посещений
            </p>
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-gold-dark to-gold text-white text-base font-light tracking-wide rounded-full hover:from-gold hover:to-gold-light transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Получить консультацию
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
