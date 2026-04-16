"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    num: "01",
    title: "Дизайн-проект",
    desc: "Разрабатываем полный дизайн-проект с планировкой, визуализациями и документацией.",
    descFull: "Разрабатываем полный дизайн-проект с планировкой, визуализациями и рабочей документацией.",
  },
  {
    num: "02",
    title: "Ремонт «под ключ»",
    desc: "Берём на себя весь процесс реализации — от демонтажа до финальной уборки.",
  },
  {
    num: "03",
    title: "Авторский надзор",
    desc: "Контролируем соответствие ремонта дизайн-проекту и качество выполнения работ.",
  },
  {
    num: "04",
    title: "Комплектация",
    desc: "Подбираем, закупаем и координируем поставки всех материалов, мебели и оборудования.",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        const isLeft = index % 2 === 0;
        const xStart = isLeft ? -150 : 150;
        
        gsap.fromTo(card, 
          { x: xStart, opacity: 0 }, 
          { x: 0, opacity: 1, ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              end: "top 30%",
              scrub: 1.5,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div ref={bgRef} className="absolute inset-[-30%_0]">
        <img
          src="/bg14.jpg"
          alt=""
          className="w-full h-full object-cover lg:object-contain object-center"
        />
      </div>
      <div ref={overlayRef} className="absolute inset-[-30%_0] bg-black/30" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="mb-12 text-center">
          <span className="text-white text-2xl font-extralight tracking-wide">Наши услуги</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3 md:gap-6 lg:gap-8">
          {services.map((s, index) => (
            <div
              key={s.num}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="relative aspect-square md:aspect-auto md:h-[180px] bg-gradient-to-br from-[#d0c4b8]/90 via-[#c4b8ad]/85 to-[#b8aa9d]/80 backdrop-blur-md rounded-2xl border border-white/40 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.1)]"
            >
              <div className="p-3 md:p-5">
                <span className="text-white/70 text-xs md:text-sm font-light">{s.num}</span>
                <h3 className="text-white text-sm md:text-xl font-light tracking-wide mb-2 md:mb-3">
                  {s.title}
                </h3>
                <p className="text-white/80 text-xs font-extralight leading-relaxed md:hidden">
                  {s.desc}
                </p>
                <p className="text-white/80 text-sm font-extralight leading-relaxed hidden md:block">
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
