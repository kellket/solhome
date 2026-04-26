"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    title: "Дизайн-проект",
    desc: "Разрабатываем полный дизайн-проект с планировкой, визуализациями и документацией.",
    descFull: "Разрабатываем полный дизайн-проект с планировкой, визуализациями и рабочей документацией.",
  },
  {
    title: "Ремонт «под ключ»",
    desc: "Берём на себя весь процесс реализации — от демонтажа до финальной уборки.",
  },
  {
    title: "Авторский надзор",
    desc: "Контролируем соответствие ремонта дизайн-проекту и качество выполнения работ.",
  },
  {
    title: "Комплектация",
    desc: "Подбираем, закупаем и координируем поставки всех материалов, мебели и оборудования.",
  },
];

// Mobile order: Ремонт «под ключ» → Дизайн-проект → Авторский надзор → Комплектация
const mobileServices = [services[1], services[0], services[2], services[3]];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });

      tl.fromTo(bgRef.current, { yPercent: -30 }, { yPercent: 0, ease: "none" }, 0);
      tl.fromTo(overlayRef.current, { yPercent: -30 }, { yPercent: 0, ease: "none" }, 0);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative overflow-hidden">
      <div ref={bgRef} className="absolute inset-[-30%_0]">
        <img
          src="/bg-mob1.jpg"
          alt=""
          className="w-full h-full object-cover object-center md:hidden"
        />
        <img
          src="/bg14.jpg"
          alt=""
          className="w-full h-full object-cover lg:object-contain object-center hidden md:block"
        />
      </div>
      <div ref={overlayRef} className="absolute inset-[-30%_0] bg-black/30" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 min-h-screen flex flex-col justify-center">
        <div className="mb-12 text-center">
          <span className="text-white text-2xl font-extralight tracking-wide">Наши услуги</span>
        </div>
        
        {/* Mobile: vertical stack, rectangular cards */}
        <div className="flex flex-col gap-4 md:hidden">
          {mobileServices.map((s) => (
            <div
              key={s.title}
              className="group relative w-full bg-gradient-to-br from-[#d0c4b8]/70 via-[#c4b8ad]/65 to-[#b8aa9d]/60 backdrop-blur-md rounded-2xl border border-white/40 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300"
            >
              <div className="p-4">
                <h3 className="text-white text-base font-light tracking-wide mb-2 group-hover:text-[#8b5a3c] transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-white/80 text-sm font-extralight leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: 2x2 grid */}
        <div className="hidden md:grid grid-cols-2 gap-6 lg:gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative bg-gradient-to-br from-[#d0c4b8]/90 via-[#c4b8ad]/85 to-[#b8aa9d]/80 backdrop-blur-md rounded-2xl border border-white/40 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300"
            >
              <div className="p-5">
                <h3 className="text-white text-xl font-light tracking-wide mb-3 group-hover:text-[#8b5a3c] transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-white/80 text-sm font-extralight leading-relaxed">
                  {('descFull' in s) ? s.descFull : s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
