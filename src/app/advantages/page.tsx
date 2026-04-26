"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkSteps from "@/components/WorkSteps";

const advantages = [
  {
    title: "Многоуровневый контроль качества",
    desc: "Каждый шаг вашего ремонта проходит 5 уровней контроля качества — от прораба до технического директора.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M9 12l2 2 4-4" />
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      </svg>
    ),
  },
  {
    title: "Оплата по факту",
    desc: "Вы платите отдельно за каждый этап ремонта и только после подписания акта приёмки выполненных работ.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <rect x="2" y="6" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    title: "Поставка материалов",
    desc: "Возьмём на себя поставку всех материалов. Вам не придётся заниматься закупками и подбором стройматериалов.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
      </svg>
    ),
  },
  {
    title: "Ремонт по технологическим картам",
    desc: "Выполняем ремонтные работы строго по технологическим картам, обеспечивая стабильное качество.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
  },
];

export default function AdvantagesPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.fromTo(bgRef.current,
          { scale: 1.1 },
          { scale: 1, ease: "none",
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
        const isLeft = index % 2 === 0;
        const xStart = isLeft ? -150 : 150;
        gsap.fromTo(card,
          { x: xStart },
          { x: 0, ease: "power1.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "top 15%",
              scrub: 2.5,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="relative overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 w-full h-full">
          <img src="/bg18.jpg" alt="" className="w-full h-full object-cover object-center lg:hidden" />
          <img src="/bg17.jpg" alt="" className="w-full h-full object-cover object-center hidden lg:block" />
        </div>

        <div className="relative min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36">
          <div className="text-center mb-10 sm:mb-16 -mt-8">
            <p className="text-[#FFFAF0] text-xs font-normal tracking-[0.3em] uppercase mb-4">
              Преимущества
            </p>
            <h1 className="text-3xl sm:text-4xl font-extralight text-white tracking-wide">
              Почему выбирают нас
            </h1>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3 md:gap-8">
            {advantages.map((a, index) => (
              <div
                key={a.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-[#9a8a80]/70 backdrop-blur-md rounded-2xl border border-white/30 group-hover:bg-[#9a8a80]/80 group-hover:border-gold/50 group-hover:-translate-y-1 transition-all duration-500" />
                <div className="relative p-3 md:p-6">
                  <div className="w-11 h-11 hidden md:flex items-center justify-center rounded-full bg-white/10 border border-white/30 mb-3 group-hover:bg-[#8b5a3c]/30 group-hover:border-[#8b5a3c]/60 group-hover:scale-110 transition-all duration-500">
                    <div className="text-white transition-colors duration-500">{a.icon}</div>
                  </div>
                  <h3 className="text-white text-sm md:text-lg font-normal tracking-wide mb-2 transition-colors duration-500">
                    {a.title}
                  </h3>
                  <p className="text-white/80 text-xs md:text-sm font-extralight leading-relaxed">
                    {a.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-[#bf9b88] text-xs font-normal tracking-[0.3em] uppercase mb-4">
              Процесс
            </p>
            <h2 className="text-3xl sm:text-4xl font-extralight text-dark tracking-wide">
              Как мы работаем
            </h2>
          </div>
          <WorkSteps />
        </div>
      </section>
    </>
  );
}
