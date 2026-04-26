"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
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

type ProjectType = "apartment" | "studio" | "house";

interface Project {
  id: number;
  type: ProjectType;
  title: string;
  location: string;
  area: number;
  rooms: string;
  repairType: string;
  price: number;
  gradient: string;
}

const projects: Project[] = [
  { id: 1, type: "apartment", title: "Ремонт 2-комн. квартиры", location: "ЖК Московский", area: 65, rooms: "2 комнаты", repairType: "Капитальный", price: 890000, gradient: "from-stone-300 to-stone-400" },
  { id: 2, type: "studio", title: "Ремонт студии", location: "ЖК Парковый", area: 28, rooms: "Студия", repairType: "Дизайнерский", price: 520000, gradient: "from-amber-200/60 to-amber-300/60" },
  { id: 3, type: "apartment", title: "Ремонт 3-комн. квартиры", location: "ЖК Солнечный", area: 95, rooms: "3 комнаты", repairType: "Под ключ", price: 1850000, gradient: "from-zinc-300 to-zinc-400" },
  { id: 4, type: "apartment", title: "Ремонт 1-комн. квартиры", location: "ЖК Центральный", area: 42, rooms: "1 комната", repairType: "Косметический", price: 380000, gradient: "from-neutral-200 to-neutral-300" },
  { id: 5, type: "apartment", title: "Ремонт 4-комн. квартиры", location: "ЖК Премиум", area: 150, rooms: "4 комнаты", repairType: "Дизайнерский", price: 3200000, gradient: "from-stone-200 to-stone-300" },
  { id: 6, type: "studio", title: "Ремонт студии", location: "ЖК Новый", area: 32, rooms: "Студия", repairType: "Капитальный", price: 450000, gradient: "from-zinc-200 to-zinc-300" },
  { id: 7, type: "apartment", title: "Ремонт 2-комн. квартиры", location: "ЖК Речной", area: 58, rooms: "2 комнаты", repairType: "Под ключ", price: 1100000, gradient: "from-amber-100/60 to-amber-200/60" },
  { id: 8, type: "house", title: "Ремонт коттеджа", location: "пос. Лесной", area: 200, rooms: "Дом", repairType: "Капитальный", price: 4500000, gradient: "from-neutral-300 to-neutral-400" },
  { id: 9, type: "apartment", title: "Ремонт 3-комн. квартиры", location: "ЖК Городской", area: 78, rooms: "3 комнаты", repairType: "Дизайнерский", price: 1600000, gradient: "from-stone-300 to-stone-400" },
];

const filters: { id: ProjectType | "all"; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "apartment", label: "Квартиры" },
  { id: "studio", label: "Студии" },
  { id: "house", label: "Дома" },
];

function formatPrice(n: number): string {
  return n.toLocaleString("ru-RU");
}

export default function ProjectsClient() {
  const [filter, setFilter] = useState<ProjectType | "all">("all");
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const advantagesSectionRef = useRef<HTMLElement>(null);
  const advantagesBgRef = useRef<HTMLDivElement>(null);
  const advantagesOverlayRef = useRef<HTMLDivElement>(null);
  const advantagesCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      heroTl.fromTo(heroBgRef.current, { yPercent: -15 }, { yPercent: 30, ease: "none" }, 0);
      heroTl.fromTo(heroOverlayRef.current, { yPercent: -15 }, { yPercent: 30, ease: "none" }, 0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: advantagesSectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });

      tl.fromTo(advantagesBgRef.current, { yPercent: -30 }, { yPercent: 0, ease: "none" }, 0);
      tl.fromTo(advantagesOverlayRef.current, { yPercent: -30 }, { yPercent: 0, ease: "none" }, 0);

      advantagesCardsRef.current.forEach((card, index) => {
        if (!card) return;
        const isLeft = index % 2 === 0;
        const xStart = isLeft ? -150 : 150;
        gsap.fromTo(card,
          { x: xStart },
          { x: 0, ease: "power1.out",
            scrollTrigger: {
              trigger: advantagesSectionRef.current,
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

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <>
      <section ref={heroSectionRef} className="relative overflow-hidden">
        <div ref={heroBgRef} className="absolute inset-[-30%_0]">
          <img
            src="/bg-mob1.jpg"
            alt=""
            className="w-full h-full object-cover object-center lg:hidden"
          />
          <img
            src="/bg4.jpg"
            alt=""
            className="w-full h-full object-cover object-center hidden lg:block"
          />
        </div>
        <div ref={heroOverlayRef} className="absolute inset-[-30%_0] bg-black/40" />
        
        <div className="relative pt-24 sm:pt-32 pb-16 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-white/80 text-xs font-normal tracking-[0.3em] uppercase mb-4">
                Портфолио
              </p>
              <h1 className="text-3xl sm:text-4xl font-extralight text-white tracking-wide">
                Наши проекты
              </h1>
              
              <p className="text-white/70 text-base font-extralight">
                Качество наших работ вместо тысячи слов
              </p>
            </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-light tracking-wide transition-all duration-300 ${
                  filter === f.id
                    ? "btn-gold"
                    : "border border-grey-mid text-grey-text hover:border-gold/40 hover:text-dark"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.04)] border border-grey-mid/20 overflow-hidden hover:shadow-[0_20px_60px_rgba(191,155,136,0.15)] hover:border-gold/30 transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <div
                  className={`aspect-[3/2] bg-gradient-to-br ${project.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-12 h-12 text-white/40">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-dark text-lg font-normal tracking-wide mb-1 group-hover:text-gold transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-grey-text text-sm font-extralight mb-4">
                    {project.location}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-grey-text font-extralight mb-4">
                    <span>{project.area} м²</span>
                    <span className="w-1 h-1 rounded-full bg-grey-mid" />
                    <span>{project.rooms}</span>
                    <span className="w-1 h-1 rounded-full bg-grey-mid" />
                    <span>{project.repairType}</span>
                  </div>

                  <div className="text-gold text-base font-light tracking-wide">
                    от {formatPrice(project.price)} ₽
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section ref={advantagesSectionRef} className="relative overflow-hidden">
        <div ref={advantagesBgRef} className="absolute inset-[-30%_0]">
          <img
            src="/bg4.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div ref={advantagesOverlayRef} className="absolute inset-[-30%_0] bg-black/30" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-block px-8 py-6 rounded-2xl bg-white/10 backdrop-blur-sm">
              <p className="text-[#8b5a3c] text-xs font-normal tracking-[0.3em] uppercase mb-4">
                Преимущества
              </p>
              <h2 className="text-3xl sm:text-4xl font-extralight text-white tracking-wide">
                Почему выбирают нас
              </h2>
            </div>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((a, index) => (
              <div
                key={a.title}
                ref={(el) => { advantagesCardsRef.current[index] = el; }}
                className="group relative bg-[#9a8a80]/70 backdrop-blur-md p-8 sm:p-10 rounded-2xl border border-white/30 hover:bg-[#9a8a80]/80 hover:border-gold/50 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 border border-white/30 mb-6 group-hover:bg-[#8b5a3c]/30 group-hover:border-[#8b5a3c]/60 group-hover:scale-110 transition-all duration-500">
                  <div className="text-white group-hover:text-[#8b5a3c] transition-colors duration-300">{a.icon}</div>
                </div>
                <h3 className="text-white text-lg font-normal tracking-wide mb-3 group-hover:text-[#8b5a3c] transition-colors duration-300">
                  {a.title}
                </h3>
                <p className="text-white/80 text-sm font-extralight leading-relaxed">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative section-padding bg-white">
        <div 
          className="absolute -top-12 left-0 right-0 h-12"
          style={{ background: "linear-gradient(to bottom, #f7f5f3 0%, white 100%)" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-gold text-xs font-normal tracking-[0.3em] uppercase mb-4">
              Процесс
            </p>
            <h2 className="text-3xl sm:text-4xl font-extralight text-dark tracking-wide">
              Как мы работаем
            </h2>
          </div>

          <WorkSteps />
        </div>
      </section>

      <section className="py-20 bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extralight text-white tracking-wide mb-4">
            Готовы начать ремонт?
          </h2>
          <p className="text-white/50 text-base font-extralight mb-8">
            Оставьте заявку и получите бесплатную смету в течение 24 часов
          </p>
          <Link
            href="/contacts"
            className="inline-block px-14 py-4 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white text-[14px] font-light tracking-[0.15em] uppercase hover:scale-105 transition-transform duration-300"
          >
            Оставить заявку
          </Link>
        </div>
      </section>
    </>
  );
}
