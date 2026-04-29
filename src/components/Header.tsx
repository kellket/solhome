"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
{ href: "/about", label: "О нас" },
{ href: "/services", label: "Услуги" },
{ href: "/projects", label: "Проекты" },
{ href: "/contacts", label: "Контакты" },
{ href: "/calculator", label: "Калькулятор" },
{ href: "/advantages", label: "Преимущества" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex-shrink-0 relative z-[60]">
            <span
              className="text-white text-2xl sm:text-3xl tracking-[0.2em] uppercase relative z-10"
              style={{ fontFamily: "var(--font-jost)", fontWeight: 200 }}
            >
              Sol Home
            </span>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/60 rounded-full blur-xl z-0 animate-pulse-glow" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-[60] flex flex-col justify-center items-center w-12 h-12 gap-[7px]"
            aria-label="Меню"
          >
            <span
              className={`block w-7 h-[1.5px] bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] origin-center ${
                mobileOpen ? "rotate-45 translate-y-[8.5px]" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${
                mobileOpen ? "w-0 opacity-0" : "w-5"
              }`}
            />
            <span
              className={`block w-7 h-[1.5px] bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] origin-center ${
                mobileOpen ? "-rotate-45 -translate-y-[8.5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] ${
          mobileOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-[#1a1714] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] origin-top ${
            mobileOpen ? "scale-y-100" : "scale-y-0"
          }`}
        />

        <div className="relative h-full flex flex-col justify-center items-center px-8">
          <nav className="space-y-1">
            {navLinks.map((link, i) => (
              <div
                key={link.href}
                className={`overflow-hidden transition-all ease-[cubic-bezier(0.77,0,0.18,1)] ${
                  mobileOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDuration: "600ms",
                  transitionDelay: mobileOpen ? `${300 + i * 80}ms` : "0ms",
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-white text-3xl md:text-5xl font-extralight tracking-wide hover:text-[#bf9b88] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          <div
            className={`mt-8 transition-all duration-600 ease-[cubic-bezier(0.77,0,0.18,1)] ${
              mobileOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: mobileOpen ? "700ms" : "0ms" }}
          >
            <Link
              href="/calculator"
              onClick={() => setMobileOpen(false)}
              className="inline-block px-10 py-4 rounded-full border border-white/20 bg-white/5 text-white text-[13px] font-light tracking-[0.2em] uppercase hover:bg-white/10 transition-all duration-300"
            >
              Рассчитать стоимость
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
