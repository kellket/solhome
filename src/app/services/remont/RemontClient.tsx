"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const renovationTypes = [
  {
    title: "Косметический ремонт",
    price: "от 18 370 ₽/м²",
    desc: "Обновление внешнего вида помещения без затрагивания коммуникаций",
    features: ["Покраска стен", "Поклейка обоев", "Замена напольного покрытия"],
  },
  {
    title: "Капитальный ремонт",
    price: "от 23 715 ₽/м²",
    desc: "Полная замена всех покрытий и коммуникаций",
    features: ["Замена электрики", "Замена сантехники", "Выравнивание поверхностей"],
  },
  {
    title: "Дизайнерский ремонт",
    price: "от 27 300 ₽/м²",
    desc: "Реализация индивидуального дизайн-проекта",
    features: ["Авторский дизайн", "Премиум-материалы", "Сложные решения"],
  },
  {
    title: "Ремонт под ключ",
    price: "от 33 050 ₽/м²",
    desc: "Полный цикл от проекта до финальной уборки",
    features: ["Всё включено", "Один подрядчик", "Гарантия результата"],
  },
];

const includedWorks = [
  "Демонтаж старых покрытий",
  "Электромонтажные работы",
  "Сантехнические работы",
  "Выравнивание стен и потолков",
  "Стяжка пола",
  "Укладка плитки",
  "Покраска/поклейка обоев",
  "Установка дверей",
  "Монтаж сантехники",
  "Установка электроприборов",
  "Финальная уборка",
];

const workStages = [
  { num: "01", title: "Консультация и замер", duration: "бесплатно", desc: "Выезжаем на объект, делаем замеры, обсуждаем ваши пожелания" },
  { num: "02", title: "Составление сметы", duration: "1-2 дня", desc: "Рассчитываем стоимость работ и материалов с точностью до рубля" },
  { num: "03", title: "Заключение договора", duration: "1 день", desc: "Фиксируем цены, сроки и гарантии в официальном договоре" },
  { num: "04", title: "Демонтажные работы", duration: "3-7 дней", desc: "Аккуратно удаляем старые покрытия, вывозим строительный мусор" },
  { num: "05", title: "Черновая отделка", duration: "2-4 недели", desc: "Электрика, сантехника, выравнивание стен, стяжка пола" },
  { num: "06", title: "Чистовая отделка", duration: "2-4 недели", desc: "Финишные покрытия, установка дверей, монтаж оборудования" },
  { num: "07", title: "Финальная уборка и сдача", duration: "1-2 дня", desc: "Генеральная уборка и приёмка работ по акту" },
];

const guarantees = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Фиксированная смета",
    desc: "Цена не изменится в процессе ремонта",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Гарантия на работы",
    desc: "До 5 лет гарантии на все виды работ",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Поэтапная оплата",
    desc: "Платите по факту завершения этапов",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-6 h-6">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Официальный договор",
    desc: "Все обязательства закреплены юридически",
  },
];

const faqData = [
  {
    question: "Сколько длится ремонт квартиры?",
    answer: "Сроки зависят от площади и объёма работ. Косметический ремонт занимает 1-2 недели, капитальный — 1-2 месяца, ремонт под ключ — 2-4 месяца. Точные сроки прописываем в договоре и несём ответственность за их соблюдение.",
  },
  {
    question: "Нужно ли мне покупать материалы?",
    answer: "Нет, мы можем взять закупку материалов полностью на себя. Работаем с проверенными поставщиками и получаем скидки до 20%. Вы также можете закупить материалы самостоятельно по нашей спецификации — выбор за вами.",
  },
  {
    question: "Как контролировать ход ремонта?",
    answer: "Персональный менеджер на связи 7 дней в неделю. Присылаем еженедельные фотоотчёты о выполненных работах. По вашему желанию можем организовать видеонаблюдение на объекте в режиме реального времени.",
  },
  {
    question: "Что если обнаружатся скрытые дефекты?",
    answer: "При обнаружении скрытых дефектов (проблемы с проводкой, трубами, несущими конструкциями) мы сразу уведомляем вас и согласовываем дополнительные работы. Без вашего одобрения никаких изменений в смете не происходит.",
  },
];

function FAQAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: { question: string; answer: string };
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
        aria-controls={`remont-faq-answer-${index}`}
      >
        <span className={`text-base sm:text-lg font-light tracking-wide pr-4 transition-colors duration-300 ${isOpen ? "text-gold" : "text-white group-hover:text-gold-light"}`}>
          {item.question}
        </span>
        <span className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? "border-gold bg-gold/10 rotate-45" : "border-white/30 group-hover:border-gold/50"}`}>
          <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${isOpen ? "text-gold" : "text-white/70 group-hover:text-gold-light"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <div ref={contentRef} id={`remont-faq-answer-${index}`} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div ref={innerRef} className="pb-5 sm:pb-6">
          <p className="text-white/70 text-sm sm:text-base font-extralight leading-relaxed pr-12">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RemontClient() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const stagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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
              end: "top top",
              scrub: true,
            },
          }
        );
      }

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
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

      stagesRef.current.forEach((stage, index) => {
        if (!stage) return;
        gsap.fromTo(
          stage,
          { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: index * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stage,
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
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[70vh] flex items-center">
        <div ref={bgRef} className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1714] via-[#1E1E1E] to-[#2A2A2A]" />
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <p className="text-gold text-xs font-normal tracking-[0.3em] uppercase mb-4 hero-text-line1">
              Sol Home
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extralight text-white tracking-wide mb-6 hero-text-line2">
              Ремонт квартир под ключ в Москве
            </h1>
            <p className="text-white/70 text-lg sm:text-xl font-extralight leading-relaxed mb-8 max-w-2xl">
              Берём на себя весь процесс — от демонтажа до финальной уборки
            </p>
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#8b5a3c] to-[#a67c5b] text-white text-base font-light tracking-wide rounded-full hover:from-[#a67c5b] hover:to-[#8b5a3c] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Рассчитать стоимость
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="bg-dark-bg py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-white text-2xl sm:text-3xl font-extralight tracking-wide mb-3">
              Что такое ремонт под ключ?
            </h2>
            <div className="w-16 h-[1.5px] mx-auto gold-gradient" />
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-white/80 text-base sm:text-lg font-extralight leading-relaxed mb-6">
              Ремонт под ключ — это комплексное решение, когда мы берём на себя все этапы: от демонтажа старых покрытий до финальной уборки и расстановки мебели. Вам не нужно искать разных подрядчиков, контролировать сроки и качество. Персональный менеджер координирует все работы, а вы получаете готовую квартиру точно в срок.
            </p>
            <p className="text-white/80 text-base sm:text-lg font-extralight leading-relaxed mb-6">
              В отличие от частичного ремонта, где вы самостоятельно решаете вопросы с электриками, сантехниками, штукатурами и отделочниками, ремонт под ключ предполагает единую команду профессионалов под управлением опытного прораба. Это исключает ситуации, когда один мастер переделывает работу за другим, а сроки растягиваются на месяцы.
            </p>
            <p className="text-white/80 text-base sm:text-lg font-extralight leading-relaxed mb-6">
              Мы работаем по фиксированной смете — цена, указанная в договоре, не изменится в процессе ремонта. Никаких «непредвиденных расходов» и дополнительных счетов. При обнаружении скрытых дефектов немедленно уведомляем вас и согласовываем решение.
            </p>
            <p className="text-white/80 text-base sm:text-lg font-extralight leading-relaxed">
              Команда Sol Home специализируется на ремонте квартир в Москве более 10 лет. За это время мы выработали чёткие стандарты качества и научились предвидеть типичные проблемы старого жилого фонда. Каждый проект — это внимание к деталям, честные сроки и результат, которым вы будете гордиться.
            </p>
          </div>
        </div>
      </section>

      {/* Renovation Types */}
      <section className="bg-[#1a1714] py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-white text-2xl sm:text-3xl font-extralight tracking-wide mb-3">
              Виды ремонта
            </h2>
            <div className="w-16 h-[1.5px] mx-auto gold-gradient" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {renovationTypes.map((type, index) => (
              <div
                key={type.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-gold/40 group-hover:-translate-y-2 transition-all duration-500" />
                <div className="relative p-6 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-white text-xl md:text-2xl font-light tracking-wide group-hover:text-gold transition-colors duration-300">
                      {type.title}
                    </h3>
                    <span className="text-gold text-lg md:text-xl font-light whitespace-nowrap ml-4">
                      {type.price}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm md:text-base font-extralight leading-relaxed mb-5">
                    {type.desc}
                  </p>
                  <ul className="space-y-2">
                    {type.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-white/70 text-sm font-extralight">
                        <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-dark-bg py-16 sm:py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-white text-2xl sm:text-3xl font-extralight tracking-wide mb-3">
              Что входит в ремонт под ключ
            </h2>
            <div className="w-16 h-[1.5px] mx-auto gold-gradient" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {includedWorks.map((work, index) => (
              <div
                key={work}
                ref={(el) => { cardsRef.current[renovationTypes.length + index] = el; }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/80 text-sm sm:text-base font-extralight">{work}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Stages */}
      <section className="bg-[#1a1714] py-16 sm:py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-white text-2xl sm:text-3xl font-extralight tracking-wide mb-3">
              Этапы работы
            </h2>
            <div className="w-16 h-[1.5px] mx-auto gold-gradient" />
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent" />

            <div className="space-y-8 md:space-y-0">
              {workStages.map((stage, index) => (
                <div
                  key={stage.num}
                  ref={(el) => { stagesRef.current[index] = el; }}
                  className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-4 md:gap-8 py-4 md:py-8`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className={`p-5 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300 ${index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"} max-w-md`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-gold text-xs font-normal tracking-widest">{stage.num}</span>
                        <span className="text-gold/60 text-xs font-extralight">{stage.duration}</span>
                      </div>
                      <h3 className="text-white text-lg font-light tracking-wide mb-2">{stage.title}</h3>
                      <p className="text-white/60 text-sm font-extralight leading-relaxed">{stage.desc}</p>
                    </div>
                  </div>

                  {/* Circle */}
                  <div className="hidden md:flex w-12 h-12 rounded-full bg-dark-bg border-2 border-gold items-center justify-center flex-shrink-0 z-10">
                    <span className="text-gold text-sm font-light">{stage.num}</span>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="bg-dark-bg py-16 sm:py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-white text-2xl sm:text-3xl font-extralight tracking-wide mb-3">
              Наши гарантии
            </h2>
            <div className="w-16 h-[1.5px] mx-auto gold-gradient" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((guarantee, index) => (
              <div
                key={guarantee.title}
                ref={(el) => { cardsRef.current[renovationTypes.length + includedWorks.length + index] = el; }}
                className="text-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:bg-gold/20 group-hover:border-gold/50 transition-all duration-300">
                  <div className="text-gold">{guarantee.icon}</div>
                </div>
                <h3 className="text-white text-base font-light tracking-wide mb-2">{guarantee.title}</h3>
                <p className="text-white/60 text-sm font-extralight leading-relaxed">{guarantee.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#1a1714] py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-white text-2xl sm:text-3xl font-extralight tracking-wide mb-3">
              Частые вопросы о ремонте
            </h2>
            <div className="w-16 h-[1.5px] mx-auto gold-gradient" />
          </div>

          <div className="divide-y divide-white/10">
            {faqData.map((item, index) => (
              <FAQAccordionItem
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

      {/* CTA Section */}
      <section className="bg-dark-bg py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-extralight tracking-wide mb-4">
            Рассчитайте стоимость ремонта за 1 минуту
          </h2>
          <p className="text-white/60 text-base sm:text-lg font-extralight mb-8 max-w-2xl mx-auto">
            Укажите площадь и тип ремонта — получите точную стоимость работ без скрытых платежей
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-[#8b5a3c] to-[#a67c5b] text-white text-lg font-light tracking-wide rounded-full hover:from-[#a67c5b] hover:to-[#8b5a3c] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Рассчитать стоимость
            <svg className="w-5 h-5 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
