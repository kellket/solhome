"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const designIncludes = [
  { title: "Обмерный план помещения", desc: "Точные замеры всех помещений с учётом конструктивных особенностей" },
  { title: "Планировочное решение", desc: "2-3 варианта планировки с оптимальной расстановкой зон" },
  { title: "3D-визуализация", desc: "Фотореалистичные изображения каждого помещения" },
  { title: "Развёртки стен", desc: "Детальные чертежи с указанием отделки и декора" },
  { title: "План расстановки мебели", desc: "Оптимальное размещение мебели с размерами" },
  { title: "План электрики и освещения", desc: "Схема розеток, выключателей и светильников" },
  { title: "План сантехники", desc: "Расположение всех сантехнических точек" },
  { title: "Ведомость отделочных материалов", desc: "Полный перечень с артикулами и количеством" },
  { title: "Спецификация мебели и оборудования", desc: "Каталог с ценами и ссылками на поставщиков" },
];

const stages = [
  { step: "01", title: "Знакомство и бриф", duration: "1-2 дня", desc: "Обсуждаем ваши пожелания, образ жизни, бюджет и сроки" },
  { step: "02", title: "Обмеры и анализ", duration: "1 день", desc: "Выезд на объект, замеры, фото- и видеофиксация" },
  { step: "03", title: "Планировочные решения", duration: "3-5 дней", desc: "Разрабатываем 2-3 варианта функционального зонирования" },
  { step: "04", title: "3D-визуализация", duration: "5-7 дней", desc: "Создаём фотореалистичные изображения интерьера" },
  { step: "05", title: "Рабочая документация", duration: "3-5 дней", desc: "Подготовка чертежей для строительной бригады" },
  { step: "06", title: "Подбор материалов", duration: "2-3 дня", desc: "Комплектация с учётом бюджета и сроков поставки" },
];

const packages = [
  {
    name: "Базовый",
    price: "от 1 900 ₽/м²",
    features: ["Планировочное решение", "3D-визуализация гостиной", "Подбор стилистики", "Коллаж материалов"],
    highlight: false,
  },
  {
    name: "Полный",
    price: "от 3 500 ₽/м²",
    features: ["Всё из базового пакета", "3D-визуализация всех комнат", "Рабочая документация", "Ведомость материалов", "Авторское сопровождение"],
    highlight: true,
  },
  {
    name: "Премиум",
    price: "от 4 700 ₽/м²",
    features: ["Всё из полного пакета", "Эксклюзивные решения", "Подбор мебели и декора", "Комплектация под ключ", "Выезды на объект"],
    highlight: false,
  },
];

const faqs = [
  {
    question: "Сколько времени занимает разработка дизайн-проекта?",
    answer: "Срок разработки зависит от площади помещения и выбранного пакета. В среднем, базовый проект занимает 2-3 недели, полный — 4-6 недель, премиум — 6-8 недель. Мы составляем детальный график и придерживаемся его на каждом этапе.",
  },
  {
    question: "Можно ли вносить правки в проект?",
    answer: "Да, внесение правок — обязательная часть нашего процесса. На этапе планировочных решений вы получаете 2-3 варианта и выбираете оптимальный. 3D-визуализация также проходит согласование. В базовый пакет входит 2 раунда правок, в полный — 3, в премиум — без ограничений.",
  },
  {
    question: "Обязательно ли делать ремонт у вас после дизайн-проекта?",
    answer: "Нет, вы не обязаны заказывать ремонт именно у нас. Дизайн-проект — это самостоятельный продукт с полным комплектом документации, который можно передать любой строительной бригаде. Однако при заказе ремонта в Sol Home вы получаете скидку 15% на дизайн-проект и гарантию точного воплощения.",
  },
  {
    question: "Что делать, если бюджет ограничен?",
    answer: "Мы работаем с разными бюджетами и всегда предлагаем оптимальные решения. На этапе брифа обсуждаем ваши финансовые рамки и подбираем материалы и мебель в соответствующем ценовом сегменте. Качественный дизайн не обязательно означает дорогой — важен профессиональный подход.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Дизайн-проект квартиры",
  "description": "Разработка дизайн-проекта интерьера квартиры в Москве. 3D-визуализация, планировка, рабочая документация, подбор материалов.",
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
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "RUB",
    "lowPrice": "1500",
    "highPrice": "4000",
    "offerCount": "3",
  },
};

export default function DesignClient() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const descSectionRef = useRef<HTMLElement>(null);
  const descBgRef = useRef<HTMLDivElement>(null);
  const includesSectionRef = useRef<HTMLDivElement>(null);
  const includesBgRef = useRef<HTMLDivElement>(null);
  const pricingSectionRef = useRef<HTMLElement>(null);
  const pricingBgRef = useRef<HTMLDivElement>(null);
  const includesRef = useRef<(HTMLDivElement | null)[]>([]);
  const stagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const packagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero background parallax
      if (bgRef.current) {
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

      // Includes cards stagger
      includesRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Stages timeline animation
      stagesRef.current.forEach((stage, index) => {
        if (!stage) return;
        gsap.fromTo(
          stage,
          { opacity: 0, x: index % 2 === 0 ? -60 : 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stage,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Packages cards
      packagesRef.current.forEach((pkg, index) => {
        if (!pkg) return;
        gsap.fromTo(
          pkg,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: pkg,
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
        {/* Background Image */}
        <div ref={bgRef} className="absolute inset-[-15%_0] w-full h-[130%]">
          <img
            src="/bg36.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center relative">
            {/* Blur effect under text */}
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
                Дизайн-проект квартиры
                <span className="block text-gold mt-2">в Москве</span>
              </h1>
              <p className="text-white/70 text-lg sm:text-xl font-extralight max-w-2xl mx-auto mb-10 leading-relaxed">
                Создаём уникальный интерьер с учётом ваших пожеланий<br className="hidden sm:block" />
                и бюджета. От идеи до полного комплекта документации<br className="hidden sm:block" />
                для строителей.
              </p>
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-sm font-light tracking-[0.2em] uppercase rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300"
              >
                Заказать дизайн-проект
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section ref={descSectionRef} className="relative overflow-hidden bg-[#1a1714]">
        <div ref={descBgRef} className="absolute inset-[-15%_0]">
          <img
            src="/bg30.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[center_130%] lg:object-left"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1714]/70 to-[#1a1714] lg:bg-gradient-to-r lg:from-transparent lg:via-[#1a1714]/80 lg:to-[#1a1714]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="lg:ml-auto lg:w-[45%]">
            <div className="p-6 lg:p-0">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-white tracking-wide mb-8">
                Что такое дизайн-проект?
              </h2>

              <div className="space-y-6">
                <p className="text-white/80 font-extralight leading-relaxed text-base sm:text-lg">
                  Дизайн-проект — это фундамент успешного ремонта и залог того, что результат превзойдёт 
                  ваши ожидания. Мы создаём функциональные интерьеры, учитывая особенности помещения, 
                  ваш образ жизни и бюджет. Каждый сантиметр продуман.
                </p>
                <p className="text-white/80 font-extralight leading-relaxed text-base sm:text-lg">
                  В проект входит полный комплект документации: планировочные решения, фотореалистичные 
                  3D-визуализации, чертежи для строителей и спецификации материалов с артикулами. 
                  Это позволяет избежать ошибок и точно рассчитать бюджет.
                </p>
                <p className="text-white/80 font-extralight leading-relaxed text-base sm:text-lg">
                  Работа начинается с погружения в ваши потребности. Мы создаём пространство, которое 
                  будет не просто красивым, но и удобным для повседневной жизни. Каждый проект уникален.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Combined Includes + Stages Section */}
      <div ref={includesSectionRef} className="relative overflow-hidden bg-[#1a1714]">
        <div ref={includesBgRef} className="absolute inset-0">
          <img
            src="/bg40.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* What's Included */}
        <div className="relative section-padding">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-white tracking-wide">
              Что входит в дизайн-проект
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {designIncludes.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => { includesRef.current[index] = el; }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#3a3734]/80 to-[#2f2c29]/80 rounded-xl border border-white/5 group-hover:border-gold/30 transition-all duration-500" />
                <div className="relative p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gold/10 border border-gold/20 group-hover:bg-gold/20 group-hover:border-gold/40 transition-all duration-300">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gold">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white text-base sm:text-lg font-light mb-1 group-hover:text-gold transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-white/50 text-sm font-extralight leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* Stages */}
        <div className="relative section-padding">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-white tracking-wide">
                Этапы работы
              </h2>
            </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/60 via-white/30 to-transparent hidden sm:block" />

            <div className="space-y-6 sm:space-y-0">
              {stages.map((stage, index) => (
                <div
                  key={stage.step}
                  ref={(el) => { stagesRef.current[index] = el; }}
                  className={`relative sm:flex ${index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"} items-center sm:pb-12`}
                >
                  {/* Content */}
                  <div className={`sm:w-1/2 ${index % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                    <div className="bg-gradient-to-br from-[#3a3734]/80 to-[#2f2c29]/80 rounded-xl border border-white/5 p-5 sm:p-6 hover:border-gold/20 transition-all duration-300">
                      <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? "sm:justify-end" : ""}`}>
                        <span className="text-gold text-2xl sm:text-3xl font-extralight">{stage.step}</span>
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

      {/* Pricing Section */}
      <section ref={pricingSectionRef} className="relative overflow-hidden section-padding bg-[#1a1714]">
        <div ref={pricingBgRef} className="absolute inset-[-15%_0]">
          <img
            src="/bg31.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-white tracking-wide mb-4">
              Стоимость дизайн-проекта
            </h2>
            <p className="text-white/60 font-extralight text-base sm:text-lg max-w-2xl mx-auto">
              Выберите пакет, который соответствует вашим задачам
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg, index) => (
              <div
                key={pkg.name}
                ref={(el) => { packagesRef.current[index] = el; }}
                className={`relative group ${pkg.highlight ? "md:-mt-4 md:mb-4" : ""}`}
              >
                <div
                  className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                    pkg.highlight
                      ? "bg-gradient-to-br from-gold/20 via-[#8b5a3c]/15 to-[#1f1c19] border-2 border-gold/40 group-hover:border-gold/60"
                      : "bg-gradient-to-br from-[#2a2724]/90 to-[#1f1c19]/90 border border-white/10 group-hover:border-gold/30"
                  }`}
                />
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#8b5a3c] to-[#a67c5b] text-white text-xs tracking-wider rounded-full">
                    Популярный
                  </div>
                )}
                <div className="relative p-6 sm:p-8 h-full flex flex-col">
                  <h3 className="text-white text-xl sm:text-2xl font-light mb-2">{pkg.name}</h3>
                  <p className="text-gold text-2xl sm:text-3xl font-extralight mb-6">{pkg.price}</p>
                  <ul className="space-y-3 flex-grow">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gold flex-shrink-0 mt-0.5">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-white/70 text-sm font-extralight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contacts"
                    className="block w-full text-center py-3 mt-8 rounded-full text-sm font-light tracking-wide transition-all duration-300 bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                  >
                    Заказать
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-dark-bg section-padding">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-white tracking-wide mb-4">
              Частые вопросы
            </h2>
            <p className="text-white/60 font-extralight text-base sm:text-lg">
              Ответы на популярные вопросы о дизайн-проектах
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/30 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors duration-300 hover:bg-white/5"
                >
                  <span className="text-white text-base sm:text-lg font-light pr-4">{faq.question}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-white/60 text-sm sm:text-base font-extralight leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-dark-bg section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-white tracking-wide mb-4">
            Закажите бесплатную консультацию
          </h2>
          <p className="text-white/60 font-extralight text-base sm:text-lg max-w-xl mx-auto mb-8">
            Обсудим ваш проект, ответим на вопросы и подберём оптимальный пакет услуг
          </p>
          <Link
            href="/contacts"
            className="inline-flex items-center justify-center px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-sm font-light tracking-[0.2em] uppercase rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300"
          >
            Связаться с нами
          </Link>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
