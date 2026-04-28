"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const checklistItems = [
  "Подбор отделочных материалов по проекту",
  "Расчёт необходимого количества",
  "Поиск лучших цен у поставщиков",
  "Закупка и логистика",
  "Доставка на объект",
  "Контроль качества при приёмке",
  "Подбор мебели и техники",
  "Подбор сантехники и освещения",
  "Координация поставок по графику ремонта",
];

const advantages = [
  {
    title: "Скидки до 30%",
    desc: "от розничных цен благодаря оптовым закупкам",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    title: "Проверенные поставщики",
    desc: "только надёжные партнёры с многолетней репутацией",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Гарантия качества",
    desc: "проверяем каждую партию материалов при приёмке",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Доставка по графику",
    desc: "материалы приезжают точно к нужному этапу ремонта",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Замена брака",
    desc: "бракованные материалы меняем за наш счёт",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M1 4v6h6M23 20v-6h-6" />
        <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
      </svg>
    ),
  },
];

const categories = [
  { name: "Строительные и отделочные материалы", icon: "🧱" },
  { name: "Сантехника и смесители", icon: "🚿" },
  { name: "Электрика и освещение", icon: "💡" },
  { name: "Двери и напольные покрытия", icon: "🚪" },
  { name: "Плитка и керамогранит", icon: "◻️" },
  { name: "Мебель и кухни", icon: "🪑" },
  { name: "Бытовая техника", icon: "🔌" },
  { name: "Декор и текстиль", icon: "🎨" },
];

const pricing = [
  {
    title: "Комплектация материалов",
    price: "5-10%",
    desc: "от стоимости закупки",
  },
  {
    title: "Комплектация мебели",
    price: "10-15%",
    desc: "от стоимости",
  },
  {
    title: "Полная комплектация",
    price: "индивидуально",
    desc: "расчёт по проекту",
  },
];

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Могу ли я сам выбрать бренды и магазины?",
    answer: "Конечно. Мы работаем как с вашими пожеланиями по конкретным брендам, так и предлагаем альтернативы с оптимальным соотношением цены и качества. Вы участвуете в выборе на каждом этапе.",
  },
  {
    question: "Как формируется ваше вознаграждение?",
    answer: "Наша комиссия — процент от стоимости закупки (5-15% в зависимости от категории). При этом благодаря оптовым скидкам итоговая стоимость для вас часто оказывается ниже розничной даже с учётом нашей комиссии.",
  },
  {
    question: "Что если товар не подойдёт или будет брак?",
    answer: "Мы берём на себя все вопросы с возвратом и обменом. Бракованные материалы заменяются за наш счёт. Перед отправкой на объект проводим контроль качества каждой партии.",
  },
  {
    question: "Работаете ли вы с дизайн-проектом от другой студии?",
    answer: "Да, мы работаем с любыми дизайн-проектами. Получив документацию, составим полную спецификацию материалов и организуем закупку согласно проекту.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Комплектация объекта",
  description: "Комплектация квартиры под ремонт в Москве. Подбор и закупка материалов, мебели, техники со скидками до 30%. Доставка на объект.",
  provider: {
    "@type": "LocalBusiness",
    name: "Sol Home",
    telephone: "+7 901 901 84 43",
    email: "info.solhome@yandex.ru",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Москва",
      addressCountry: "RU",
    },
  },
  areaServed: {
    "@type": "City",
    name: "Москва",
  },
  serviceType: "Комплектация объекта",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "RUB",
    offerCount: 3,
  },
};

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !innerRef.current) return;

    const content = contentRef.current;
    const inner = innerRef.current;

    if (isOpen) {
      const height = inner.offsetHeight;
      gsap.fromTo(
        content,
        { height: 0, opacity: 0 },
        { height, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    } else {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isOpen]);

  return (
    <div className={`border-b border-white/10 transition-colors duration-300 ${isOpen ? "border-gold/30" : ""}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 sm:py-6 text-left group"
        aria-expanded={isOpen}
        aria-controls={`faq-komplektaciya-${index}`}
      >
        <span className={`text-base sm:text-lg font-light tracking-wide pr-4 transition-colors duration-300 ${isOpen ? "text-gold" : "text-white group-hover:text-gold-light"}`}>
          {item.question}
        </span>
        <span className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? "border-gold bg-gold/10 rotate-45" : "border-white/30 group-hover:border-gold/50"}`}>
          <svg
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${isOpen ? "text-gold" : "text-white/70 group-hover:text-gold-light"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <div
        ref={contentRef}
        id={`faq-komplektaciya-${index}`}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div ref={innerRef} className="pb-5 sm:pb-6">
          <p className="text-white/70 text-sm sm:text-base font-extralight leading-relaxed pr-12">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function KomplektaciyaClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);
  const advantagesRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const handleFaqToggle = useCallback((index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.1 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      if (checklistRef.current) {
        const items = checklistRef.current.querySelectorAll(".checklist-item");
        gsap.fromTo(
          items,
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
      }

      if (advantagesRef.current) {
        const cards = advantagesRef.current.querySelectorAll(".advantage-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: advantagesRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (categoriesRef.current) {
        const items = categoriesRef.current.querySelectorAll(".category-item");
        gsap.fromTo(
          items,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (pricingRef.current) {
        const cards = pricingRef.current.querySelectorAll(".pricing-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: pricingRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={heroRef} className="relative overflow-hidden min-h-[70vh] flex items-center">
        <div ref={bgRef} className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-[#1a1714]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1714] via-[#1a1714]/95 to-[#2a2520]/90" />
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
            <div className="absolute inset-0 bg-gradient-to-l from-gold/30 to-transparent" />
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="text-gold text-xs font-normal tracking-[0.3em] uppercase mb-6">
              Услуги
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-white tracking-wide mb-6">
              Комплектация объекта{" "}
              <span className="text-gold">в Москве</span>
            </h1>
            <p className="text-white/70 text-lg sm:text-xl font-extralight leading-relaxed mb-10">
              Подберём, закупим и доставим все материалы, мебель и технику для вашего ремонта
            </p>
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-sm font-light tracking-[0.2em] uppercase rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              Заказать комплектацию
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#1a1714] py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-white text-2xl sm:text-3xl font-extralight tracking-wide mb-4">
              Что такое комплектация объекта
            </h2>
            <div className="w-16 h-[1.5px] mx-auto gold-gradient" />
          </div>

          <div className="text-white/80 text-base sm:text-lg font-extralight leading-relaxed space-y-6">
            <p>
              Комплектация объекта — это полный цикл подбора и закупки всего необходимого
              для вашего ремонта: от строительных материалов до мебели и декора. Мы берём
              на себя всю рутину, связанную с поиском, сравнением цен, логистикой и контролем
              качества.
            </p>
            <p>
              Мы работаем с проверенными поставщиками и получаем оптовые скидки, которые
              передаём вам. Вам не нужно тратить время на поездки по магазинам и сравнение
              цен — мы всё сделаем за вас. Наши специалисты знают рынок отделочных материалов,
              мебели и техники, поэтому могут предложить оптимальные решения для любого
              бюджета.
            </p>
            <p>
              Комплектация включает не только закупку, но и координацию поставок согласно
              графику ремонтных работ. Материалы приезжают на объект именно тогда, когда
              они нужны — не раньше и не позже. Это экономит место на объекте и исключает
              риск порчи материалов при хранении.
            </p>
            <p>
              При приёмке каждой партии мы проводим контроль качества: проверяем соответствие
              заказанным позициям, отсутствие брака и повреждений. Если что-то не так —
              решаем вопрос с поставщиком самостоятельно, без вашего участия.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-dark-bg py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-white text-2xl sm:text-3xl font-extralight tracking-wide mb-4">
              Что включает комплектация
            </h2>
            <div className="w-16 h-[1.5px] mx-auto gold-gradient" />
          </div>

          <div ref={checklistRef} className="space-y-4">
            {checklistItems.map((item, index) => (
              <div
                key={index}
                className="checklist-item flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/90 text-base font-light">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1a1714] py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-white text-2xl sm:text-3xl font-extralight tracking-wide mb-4">
              Преимущества нашей комплектации
            </h2>
            <div className="w-16 h-[1.5px] mx-auto gold-gradient" />
          </div>

          <div ref={advantagesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, index) => (
              <div
                key={index}
                className="advantage-card group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/40 hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                  <div className="text-gold">{adv.icon}</div>
                </div>
                <h3 className="text-white text-lg font-light tracking-wide mb-2">
                  {adv.title}
                </h3>
                <p className="text-white/60 text-sm font-extralight leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark-bg py-16 sm:py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-white text-2xl sm:text-3xl font-extralight tracking-wide mb-4">
              Категории товаров
            </h2>
            <div className="w-16 h-[1.5px] mx-auto gold-gradient" />
          </div>

          <div ref={categoriesRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="category-item flex flex-col items-center justify-center p-5 rounded-xl bg-white/5 border border-white/10 hover:border-gold/40 hover:bg-white/[0.07] transition-all duration-300 group"
              >
                <span className="text-2xl mb-3 grayscale group-hover:grayscale-0 transition-all duration-300">
                  {cat.icon}
                </span>
                <span className="text-white/80 text-sm font-light text-center leading-tight">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1a1714] py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-white text-2xl sm:text-3xl font-extralight tracking-wide mb-4">
              Стоимость услуги
            </h2>
            <div className="w-16 h-[1.5px] mx-auto gold-gradient" />
          </div>

          <div ref={pricingRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {pricing.map((item, index) => (
              <div
                key={index}
                className="pricing-card p-6 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 hover:border-gold/40 transition-all duration-300 text-center"
              >
                <h3 className="text-white/90 text-base font-light tracking-wide mb-4">
                  {item.title}
                </h3>
                <p className="text-gold text-3xl sm:text-4xl font-extralight mb-2">
                  {item.price}
                </p>
                <p className="text-white/50 text-sm font-extralight">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark-bg py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-white text-2xl sm:text-3xl font-extralight tracking-wide mb-3">
              Частые вопросы
            </h2>
            <div className="w-16 h-[1.5px] mx-auto gold-gradient" />
          </div>

          <div className="divide-y divide-white/10">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                index={index}
                isOpen={openFaqIndex === index}
                onToggle={() => handleFaqToggle(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1a1714] py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-2xl sm:text-3xl font-extralight tracking-wide mb-4">
            Получите расчёт стоимости комплектации
          </h2>
          <p className="text-white/60 text-base sm:text-lg font-extralight mb-8">
            Отправьте нам дизайн-проект или список материалов — подготовим смету с учётом скидок
          </p>
          <Link
            href="/contacts"
            className="inline-flex items-center justify-center px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-sm font-light tracking-[0.2em] uppercase rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300"
          >
            Связаться с нами
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
