"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Сколько стоит ремонт квартиры в Москве?",
    answer:
      "Стоимость ремонта зависит от площади, выбранного типа отделки и материалов. Базовые цены: косметический ремонт от 18 370 ₽/м², капитальный от 23 715 ₽/м², дизайнерский от 27 300 ₽/м², под ключ от 33 050 ₽/м². Рассчитайте точную стоимость в нашем калькуляторе.",
  },
  {
    question: "Какой порядок оплаты?",
    answer:
      "Работаем без предоплаты. Оплата поэтапная: после завершения каждого этапа работ (демонтаж, черновая отделка, чистовая отделка). Принимаем наличные, банковские карты и безналичный расчёт.",
  },
  {
    question: "Какие мастера работают на объекте?",
    answer:
      "На объекте работают узкопрофильные специалисты: электрики, сантехники, штукатуры, плиточники, маляры. Все мастера проходят строгий отбор и имеют подтверждённую квалификацию.",
  },
  {
    question: "Как следить за ходом ремонта?",
    answer:
      "Предоставляем еженедельные фотоотчёты. По запросу можем организовать видеонаблюдение на объекте. Персональный менеджер на связи 7 дней в неделю.",
  },
  {
    question: "Что входит в ремонт под ключ?",
    answer:
      "Полный цикл работ: демонтаж, электрика, сантехника, выравнивание стен/полов/потолков, укладка плитки, покраска, поклейка обоев, установка дверей, монтаж сантехники и электроприборов, финальная уборка.",
  },
  {
    question: "Выполняете ли вы дизайн-проект?",
    answer:
      "Да, у нас собственный отдел дизайна. Разрабатываем полный дизайн-проект с планировкой, 3D-визуализациями и рабочей документацией. Первичная консультация дизайнера бесплатно.",
  },
  {
    question: "Кто закупает материалы?",
    answer:
      "Можем взять закупку материалов на себя — работаем с проверенными поставщиками и получаем скидки. Или вы можете закупить материалы самостоятельно по нашей спецификации.",
  },
  {
    question: "Какие гарантии вы даёте?",
    answer:
      "Гарантия на все выполненные работы — до 5 лет. Заключаем официальный договор с фиксированной сметой. При обнаружении дефектов устраняем бесплатно.",
  },
  {
    question: "Сколько длится ремонт квартиры?",
    answer:
      "Сроки зависят от площади и объёма работ. Ориентировочно: косметический ремонт 1-2 недели, капитальный 1-2 месяца, ремонт под ключ 2-4 месяца. Точные сроки фиксируем в договоре.",
  },
];

function FAQSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

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
    <div
      className={`border-b border-white/10 transition-colors duration-300 ${
        isOpen ? "border-gold/30" : ""
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 sm:py-6 text-left group"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span
          className={`text-base sm:text-lg font-light tracking-wide pr-4 transition-colors duration-300 ${
            isOpen ? "text-gold" : "text-white group-hover:text-gold-light"
          }`}
        >
          {item.question}
        </span>
        <span
          className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "border-gold bg-gold/10 rotate-45"
              : "border-white/30 group-hover:border-gold/50"
          }`}
        >
          <svg
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
              isOpen ? "text-gold" : "text-white/70 group-hover:text-gold-light"
            }`}
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
        id={`faq-answer-${index}`}
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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section id="faq" className="bg-dark-bg py-16 sm:py-20 lg:py-24">
      <FAQSchema />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-white text-2xl sm:text-3xl font-extralight tracking-wide mb-3">
            Частые вопросы
          </h2>
          <div className="w-16 h-[1.5px] mx-auto gold-gradient" />
        </div>

        <div className="divide-y divide-white/10">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
