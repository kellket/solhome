"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BlueprintIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
    <path d="M13 15h4" />
    <path d="M13 12h4" />
  </svg>
);

const HomeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const PackageIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16.5 9.4l-9-5.19" />
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const iconComponents = {
  blueprint: BlueprintIcon,
  home: HomeIcon,
  settings: SettingsIcon,
  package: PackageIcon,
};

type IconType = keyof typeof iconComponents;

const services = [
  {
    title: "Дизайн-проект",
    desc: "Разрабатываем полный дизайн-проект с планировкой, визуализациями и рабочей документацией.",
    href: "/services/design",
    icon: "blueprint" as IconType,
  },
  {
    title: "Ремонт «под ключ»",
    desc: "Берём на себя весь процесс реализации — от демонтажа до финальной уборки.",
    href: "/services/remont",
    icon: "home" as IconType,
  },
  {
    title: "Авторский надзор",
    desc: "Контролируем соответствие ремонта дизайн-проекту и качество выполнения работ.",
    href: "/services/nadzor",
    icon: "settings" as IconType,
  },
  {
    title: "Комплектация",
    desc: "Подбираем, закупаем и координируем поставки всех материалов, мебели и оборудования.",
    href: "/services/komplektaciya",
    icon: "package" as IconType,
  },
];

// Mobile order: Ремонт «под ключ» → Дизайн-проект → Авторский надзор → Комплектация
const mobileServices = [services[1], services[0], services[2], services[3]];

interface ServiceCardProps {
  title: string;
  desc: string;
  href: string;
  icon: IconType;
  isMobile?: boolean;
}

function ServiceCard({ title, desc, href, icon, isMobile }: ServiceCardProps) {
  const IconComponent = iconComponents[icon];
  
  return (
    <div
      className={`group relative bg-gradient-to-br from-[#d0c4b8]/90 via-[#c4b8ad]/85 to-[#b8aa9d]/80 backdrop-blur-md rounded-2xl border border-white/40 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300 ${isMobile ? 'w-full' : ''}`}
    >
      <div className={isMobile ? "p-5" : "p-6 lg:p-8"}>
        <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center mb-5 group-hover:bg-white/25 transition-colors duration-300">
          <span className="text-white/90">
            <IconComponent />
          </span>
        </div>
        
        <h3 className={`text-white font-light tracking-wide mb-3 group-hover:text-[#8b5a3c] transition-colors duration-300 ${isMobile ? 'text-lg' : 'text-xl'}`}>
          {title}
        </h3>
        
        <p className="text-white/80 text-sm font-extralight leading-relaxed mb-6">
          {desc}
        </p>
        
        <Link
          href={href}
          className="text-white/90 text-sm font-light hover:text-[#8b5a3c] transition-colors duration-300"
        >
          Подробнее →
        </Link>
      </div>
    </div>
  );
}

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
          src="/bg-mob1.webp"
          alt=""
          className="w-full h-full object-cover object-center md:hidden"
        />
        <img
          src="/bg14.webp"
          alt=""
          className="w-full h-full object-cover object-center hidden md:block"
        />
      </div>
      <div ref={overlayRef} className="absolute inset-[-30%_0] bg-black/30" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 min-h-screen flex flex-col justify-center">
        <div className="mb-12 text-center">
          <span className="text-white text-2xl font-extralight tracking-wide">Наши услуги</span>
          <p className="text-white/80 text-lg font-extralight mt-2">
            Полный цикл работ от разработки дизайн-проекта до сдачи готового объекта
          </p>
        </div>
        
        {/* Mobile: vertical stack */}
        <div className="flex flex-col gap-5 md:hidden">
          {mobileServices.map((s) => (
            <ServiceCard
              key={s.title}
              title={s.title}
              desc={s.desc}
              href={s.href}
              icon={s.icon}
              isMobile
            />
          ))}
        </div>

        {/* Desktop: 2x2 grid */}
        <div className="hidden md:grid grid-cols-2 gap-6 lg:gap-8">
          {services.map((s) => (
            <ServiceCard
              key={s.title}
              title={s.title}
              desc={s.desc}
              href={s.href}
              icon={s.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
