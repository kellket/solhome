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
  "Выравнивание стен",
  "Укладка плитки",
  "Покраска/поклейка обоев",
  "Установка дверей",
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
  const descSectionRef = useRef<HTMLElement>(null);
  const descBgRef = useRef<HTMLDivElement>(null);
  const includesSectionRef = useRef<HTMLDivElement>(null);
  const includesBgRef = useRef<HTMLDivElement>(null);
  const typesSectionRef = useRef<HTMLElement>(null);
  const typesBgRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const stagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleFaqToggle = useCallback((index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (bgRef.current && heroRef.current) {
        gsap.fromTo(
          bgRef.current,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      if (descBgRef.current && descSectionRef.current) {
        gsap.fromTo(
          descBgRef.current,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: descSectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      if (typesBgRef.current && typesSectionRef.current) {
        gsap.fromTo(
          typesBgRef.current,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: typesSectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      if (includesBgRef.current && includesSectionRef.current) {
        gsap.fromTo(
          includesBgRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: includesSectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
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
      <section ref={heroRef} className="relative overflow-hidden min-h-screen bg-[#1a1714]">
        <div ref={bgRef} className="absolute inset-[-15%_0] w-full h-[130%]">
          <img
            src="/bg38.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center relative">
            <div 
              className="absolute -inset-x-32 -inset-y-32 bg-black/25 backdrop-blur-[3px] pointer-events-none"
              style={{
                maskImage: "radial-gradient(ellipse 60% 60% at center, black 30%, transparent 65%)",
                WebkitMaskImage: "radial-gradient(ellipse 60% 60% at center, black 30%, transparent 65%)",
              }}
            />
            <div className="relative">
              <p className="text-gold text-xs font-normal tracking-[0.3em] uppercase mb-6 animate-fade-in-up">
                Услуги
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white tracking-wide mb-6">
                Ремонт квартир под ключ
                <span className="block text-gold mt-2">в Москве</span>
              </h1>
              <p className="text-white/70 text-lg sm:text-xl font-extralight max-w-2xl mx-auto mb-10 leading-relaxed">
                Берём на себя весь процесс — от демонтажа<br />
                до финальной уборки
              </p>
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-sm font-light tracking-[0.2em] uppercase rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300"
              >
                Рассчитать стоимость
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section ref={descSectionRef} className="relative overflow-hidden bg-[#1a1714]">
        <div ref={descBgRef} className="absolute inset-[-15%_0]">
          <img
            src="/bg39.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[10%_center] lg:object-left"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1714]/50 to-[#1a1714] lg:bg-gradient-to-r lg:from-transparent lg:via-[#1a1714]/60 lg:to-[#1a1714]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="lg:ml-auto lg:w-[45%]">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 lg:bg-transparent lg:backdrop-blur-none lg:p-0 lg:rounded-none">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-white tracking-wide mb-8">
                Что такое ремонт под ключ?
              </h2>

              <div className="space-y-6">
                <p className="text-white/80 font-extralight leading-relaxed text-base sm:text-lg">
                  Ремонт под ключ — это комплексное решение, когда мы берём на себя все этапы: 
                  от демонтажа до финальной уборки. Вам не нужно искать разных подрядчиков — 
                  персональный менеджер координирует все работы.
                </p>
                <p className="text-white/80 font-extralight leading-relaxed text-base sm:text-lg">
                  Единая команда профессионалов под управлением опытного прораба исключает ситуации, 
                  когда один мастер переделывает работу за другим. Чёткие сроки и контроль качества 
                  на каждом этапе.
                </p>
                <p className="text-white/80 font-extralight leading-relaxed text-base sm:text-lg">
                  Работаем по фиксированной смете — цена в договоре не изменится. Никаких 
                  «непредвиденных расходов». Sol Home более 10 лет специализируется на ремонте 
                  квартир в Москве.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Renovation Types */}
      <section ref={typesSectionRef} className="relative overflow-hidden bg-[#1a1714]">
        <div ref={typesBgRef} className="absolute inset-[-15%_0]">
          <img
            src="/bg41.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ imageRendering: 'auto', WebkitBackfaceVisibility: 'hidden' }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-white text-2xl sm:text-3xl font-extralight tracking-wide mb-3">
                Виды ремонта
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {renovationTypes.map((type, index) => (
                <div
                  key={type.title}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3a3734]/80 to-[#2f2c29]/80 backdrop-blur-sm rounded-2xl border border-white/5 group-hover:border-gold/40 group-hover:-translate-y-2 transition-all duration-500" />
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
        </div>
      </section>

      {/* Combined What's Included + Work Stages Section */}
      <div ref={includesSectionRef} className="relative overflow-hidden bg-[#1a1714]">
        <div ref={includesBgRef} className="absolute inset-[-8%_0]">
          <img
            src="/bg40.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ imageRendering: 'auto', WebkitBackfaceVisibility: 'hidden' }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* What's Included */}
        <div className="relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-white text-2xl sm:text-3xl font-extralight tracking-wide mb-3">
                Что входит в ремонт под ключ
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {includedWorks.map((work, index) => (
                <div
                  key={work}
                  ref={(el) => { cardsRef.current[renovationTypes.length + index] = el; }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-[#3a3734]/80 to-[#2f2c29]/80 border border-white/5 hover:border-gold/30 transition-all duration-300 w-full"
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
        </div>

        {/* Work Stages */}
        <div className="relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-white text-2xl sm:text-3xl font-extralight tracking-wide mb-3">
                Этапы работы
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/60 via-white/30 to-transparent hidden sm:block" />

              <div className="space-y-6 sm:space-y-0">
                {workStages.map((stage, index) => (
                  <div
                    key={stage.num}
                    ref={(el) => { stagesRef.current[index] = el; }}
                    className={`relative sm:flex ${index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"} items-center sm:pb-12`}
                  >
                    {/* Content */}
                    <div className={`sm:w-1/2 ${index % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                      <div className="bg-gradient-to-br from-[#3a3734]/80 to-[#2f2c29]/80 rounded-xl border border-white/5 p-5 sm:p-6 hover:border-gold/20 transition-all duration-300">
                        <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? "sm:justify-end" : ""}`}>
                          <span className="text-gold text-2xl sm:text-3xl font-extralight">{stage.num}</span>
                          <span className="text-white/40 text-sm font-extralight">{stage.duration}</span>
                        </div>
                        <h3 className="text-white text-lg sm:text-xl font-light mb-2">{stage.title}</h3>
                        <p className="text-white/60 text-sm font-extralight leading-relaxed">{stage.desc}</p>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#1a1714] border-2 border-white items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>

                    {/* Empty space for alternating layout */}
                    <div className="hidden sm:block sm:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guarantees */}
      <section className="bg-dark-bg py-16 sm:py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-white text-2xl sm:text-3xl font-extralight tracking-wide">
              Наши гарантии
            </h2>
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
      <section className="bg-dark-bg py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-extralight tracking-wide">
              Частые вопросы о ремонте
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/30 overflow-hidden"
              >
                <button
                  onClick={() => handleFaqToggle(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors duration-300 hover:bg-white/5"
                >
                  <span className="text-white text-base sm:text-lg font-light pr-4">{item.question}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${openFaqIndex === index ? "rotate-180" : ""}`}
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-white/60 text-sm sm:text-base font-extralight leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
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
            Укажите площадь и тип ремонта — получите примерную стоимость<br />работ без скрытых платежей
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-sm font-light tracking-[0.2em] uppercase rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300"
          >
            Рассчитать стоимость
          </Link>
        </div>
      </section>
    </>
  );
}
