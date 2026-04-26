"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    title: "Дизайн-проект",
    desc: "Разрабатываем полный дизайн-проект с планировкой, визуализациями и рабочей документацией.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    title: "Ремонт «под ключ»",
    desc: "Берём на себя весь процесс реализации — от демонтажа до финальной уборки.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Авторский надзор",
    desc: "Контролируем соответствие ремонта дизайн-проекту и качество выполнения работ.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    title: "Комплектация",
    desc: "Подбираем, закупаем и координируем поставки всех материалов, мебели и оборудования.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
      </svg>
    ),
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": services.map((service, index) => ({
    "@type": "Service",
    "position": index + 1,
    "name": service.title,
    "description": service.desc,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Sol Home",
      "telephone": "+7 901 901 84 43",
      "email": "info.solhome@yandex.ru",
    },
    "areaServed": "Москва",
  })),
};

export default function ServicesPageClient() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.fromTo(bgRef.current,
          { scale: 1.1 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );
      }

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
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
      <section ref={sectionRef} className="relative overflow-hidden min-h-screen">
        <div ref={bgRef} className="absolute inset-0 w-full h-full">
          <img
            src="/bg14.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative min-h-screen flex flex-col justify-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-gold text-xs font-normal tracking-[0.3em] uppercase mb-4">
              Sol Home
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-white tracking-wide">
              Наши услуги
            </h1>
            <p className="text-white/70 text-base sm:text-lg font-extralight mt-4 max-w-2xl mx-auto">
              Полный цикл работ от разработки дизайн-проекта до сдачи готового объекта
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#d0c4b8]/80 via-[#c4b8ad]/75 to-[#b8aa9d]/70 backdrop-blur-md rounded-2xl border border-white/40 group-hover:bg-gradient-to-br group-hover:from-[#d0c4b8]/90 group-hover:via-[#c4b8ad]/85 group-hover:to-[#b8aa9d]/80 group-hover:border-gold/50 group-hover:-translate-y-2 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.3)]" />
                <div className="relative p-6 md:p-8">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/30 mb-4 group-hover:bg-[#8b5a3c]/30 group-hover:border-[#8b5a3c]/60 group-hover:scale-110 transition-all duration-500">
                    <div className="text-white transition-colors duration-500">{service.icon}</div>
                  </div>
                  <h2 className="text-white text-xl md:text-2xl font-light tracking-wide mb-3 group-hover:text-[#8b5a3c] transition-colors duration-500">
                    {service.title}
                  </h2>
                  <p className="text-white/80 text-sm md:text-base font-extralight leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <Link
                    href="/calculator"
                    className="inline-flex items-center gap-2 text-gold text-sm font-normal tracking-wide group-hover:text-[#8b5a3c] transition-colors duration-300"
                  >
                    Рассчитать стоимость
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#8b5a3c] to-[#a67c5b] text-white text-base font-light tracking-wide rounded-full hover:from-[#a67c5b] hover:to-[#8b5a3c] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Рассчитать стоимость ремонта
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
