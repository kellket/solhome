"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/about", label: "О нас" },
  { href: "/calculator", label: "Калькулятор" },
  { href: "/projects", label: "Проекты" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/sol_home_logo.svg"
              alt="Sol Home"
              width={160}
              height={56}
              priority
              className="h-9 sm:h-12 w-auto brightness-[10] invert"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white text-[15px] font-light tracking-wide hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+7XXXXXXXXXX"
              className="text-white text-[15px] font-normal tracking-wide hover:text-gold transition-colors duration-300"
            >
              +7 (XXX) XXX-XX-XX
            </a>
            <Link
              href="/calculator"
              className="btn-gold px-6 py-2.5 rounded-sm text-[14px] font-normal tracking-wider uppercase"
            >
              Рассчитать
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            aria-label="Меню"
          >
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[4.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-grey-mid/30 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-dark text-lg font-light tracking-wide hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-grey-mid/30">
            <a
              href="tel:+7XXXXXXXXXX"
              className="block text-dark text-lg font-normal mb-4"
            >
              +7 (XXX) XXX-XX-XX
            </a>
            <Link
              href="/calculator"
              onClick={() => setMobileOpen(false)}
              className="btn-gold inline-block px-6 py-3 rounded-sm text-sm font-normal tracking-wider uppercase"
            >
              Рассчитать стоимость
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
