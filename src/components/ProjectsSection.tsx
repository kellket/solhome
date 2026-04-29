"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import WorkSteps from "./WorkSteps";

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

interface ProjectImage {
  src: string;
  label?: string;
}

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
  cover?: string;
  images: ProjectImage[];
}

const projects: Project[] = [
  { id: 1, type: "apartment", title: "Ремонт квартиры", location: "г. Москва, ЖК Алые Паруса", area: 108, rooms: "2 комнаты", repairType: "Капитальный", price: 1925000, gradient: "from-stone-300 to-stone-400", cover: "/zal-kuhnya-2-posle.jpg", images: [
    { src: "/zal-kuhnya-2-do.jpg", label: "До" },
    { src: "/zal-kuhnya-2-posle.jpg", label: "После" },
    { src: "/spalnya-do-2.jpg", label: "До" },
    { src: "/spalnya-2-posle.jpg", label: "После" },
    { src: "/detskaya-2-do.jpg", label: "До" },
    { src: "/detskaya-2-posle.jpg", label: "После" },
    { src: "/vanna-2-do.jpg", label: "До" },
    { src: "/vanna-2-posle.jpg", label: "После" },
  ] },
  { id: 2, type: "studio", title: "Ремонт студии", location: "г. Котельники, ЖК Парковый", area: 40, rooms: "Студия", repairType: "Дизайнерский", price: 1100000, gradient: "from-amber-200/60 to-amber-300/60", cover: "/koridor-chernovaya-posle.jpg", images: [
    { src: "/koridor-chernovaya-do.jpg", label: "До" },
    { src: "/koridor-chernovaya-posle.jpg", label: "После" },
    { src: "/spalnya-chernovaya-do.jpg", label: "До" },
    { src: "/spalnya-chernovaya-posle.jpg", label: "После" },
    { src: "/vanna-chernovaya-do.jpg", label: "До" },
    { src: "/vanna-chernovaya-posle.jpg", label: "После" },
  ] },
  { id: 3, type: "apartment", title: "Ремонт 3-комн. квартиры", location: "г. Москва, ул Крылатские Холмы", area: 110, rooms: "3 комнаты", repairType: "Под ключ", price: 2470000, gradient: "from-zinc-300 to-zinc-400", cover: "/kuhnya-posle.jpg", images: [
    { src: "/kuhnya-do.jpg", label: "До" },
    { src: "/kuhnya-posle.jpg", label: "После" },
    { src: "/zal-do.jpg", label: "До" },
    { src: "/zal-posle.jpg", label: "После" },
    { src: "/spalnya-do.jpg", label: "До" },
    { src: "/spalnya-posle.jpg", label: "После" },
    { src: "/detskaya-do.jpg", label: "До" },
    { src: "/detskaya-posle.jpg", label: "После" },
    { src: "/vanna-do.jpg", label: "До" },
    { src: "/vanna-posle.jpg", label: "После" },
  ] },
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

export default function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectType | "all">("all");
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);
  const projectsBgRef = useRef<HTMLDivElement>(null);
  const projectsOverlayRef = useRef<HTMLDivElement>(null);
  const projectsMobileBgRef = useRef<HTMLDivElement>(null);
  const advCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (openProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [openProject]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.fromTo(bgRef.current, 
          { yPercent: -15 }, 
          { yPercent: 0, ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const ptl = gsap.timeline({
          scrollTrigger: {
            trigger: projectsSectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });

        ptl.fromTo(projectsBgRef.current, { yPercent: -30 }, { yPercent: 0, ease: "none" }, 0);
        ptl.fromTo(projectsOverlayRef.current, { yPercent: -30 }, { yPercent: 0, ease: "none" }, 0);
      });

      mm.add("(max-width: 1023px)", () => {
        if (projectsMobileBgRef.current) {
          gsap.fromTo(projectsMobileBgRef.current, {
            yPercent: -30,
          }, {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: projectsSectionRef.current,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        }
      });

      advCardsRef.current.forEach((card, index) => {
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

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <>
      <section id="projects" ref={projectsSectionRef} className="relative pt-16 sm:pt-20 pb-16 sm:pb-20 overflow-hidden">
        <div ref={projectsBgRef} className="absolute inset-[-30%_0] hidden lg:block">
          <img
            src="/bg15.jpg"
            alt=""
            className="w-full h-full object-cover lg:object-contain object-center"
          />
        </div>
        <div ref={projectsMobileBgRef} className="absolute inset-[-30%_0] lg:hidden">
          <img
            src="/bg27.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div ref={projectsOverlayRef} className="absolute inset-[-30%_0] bg-black/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#bf9b88] text-xs font-normal tracking-[0.3em] uppercase mb-4">
              Портфолио
            </p>
            <h2 className="text-3xl sm:text-4xl font-extralight text-white tracking-wide">
              Наши проекты
            </h2>
            <p className="text-white/60 text-base font-extralight">
              Качество наших работ вместо тысячи слов
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, index) => (
              <div
                key={project.id}
                onClick={() => { setOpenProject(project); setSlideIndex(0); }}
                className="group relative bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.04)] border border-grey-mid/20 overflow-hidden hover:shadow-[0_20px_60px_rgba(191,155,136,0.15)] hover:border-gold/30 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <div
                  className={`aspect-[3/2] bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
                >
                  {project.cover ? (
                    <img src={project.cover} alt={`Ремонт квартиры в ${project.location} — ${project.rooms}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-12 h-12 text-white/40">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  )}
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-dark text-lg font-normal tracking-wide mb-1 group-hover:text-[#bf9b88] transition-colors duration-300">
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

                  <div className="text-[#bf9b88] text-base font-light tracking-wide">
                    от {formatPrice(project.price)} ₽
                  </div>
                </div>
              </div>
            ))}
          </div>
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

      {openProject && (
        <div 
          className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 backdrop-blur-sm"
          onClick={() => setOpenProject(null)}
        >
          <div className="min-h-full flex items-center justify-center py-8 px-4">
          <div 
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="relative aspect-[16/9] bg-neutral-100">
              {openProject.images[slideIndex].label && (
                <div className="absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-light tracking-wide">
                  {openProject.images[slideIndex].label}
                </div>
              )}
              <img
                src={openProject.images[slideIndex].src}
                alt={`${openProject.title} — ${openProject.images[slideIndex].label || 'фото интерьера'}`}
                className="w-full h-full object-cover"
              />

              {openProject.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSlideIndex((prev) => (prev - 1 + openProject.images.length) % openProject.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSlideIndex((prev) => (prev + 1) % openProject.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {openProject.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === slideIndex ? "bg-white w-6" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="text-dark text-xl font-normal tracking-wide mb-1">
                {openProject.title}
              </h3>
              <p className="text-grey-text text-sm font-extralight mb-4">
                {openProject.location}
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-grey-text font-extralight mb-4">
                <span>{openProject.area} м²</span>
                <span className="w-1 h-1 rounded-full bg-grey-mid" />
                <span>{openProject.rooms}</span>
                <span className="w-1 h-1 rounded-full bg-grey-mid" />
                <span>{openProject.repairType}</span>
              </div>
              <div className="text-[#bf9b88] text-lg font-light tracking-wide">
                от {formatPrice(openProject.price)} ₽
              </div>
            </div>
          </div>
          </div>
        </div>
      )}
    </>
  );
}
