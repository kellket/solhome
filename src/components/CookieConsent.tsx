"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent-accepted");
    if (!accepted) {
      setShow(true);
      setTimeout(() => setVisible(true), 50);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent-accepted", "true");
    setVisible(false);
    setTimeout(() => setShow(false), 300);
  };

  if (!show) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-white/70 backdrop-blur-md border-t border-white/30">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-dark/80 text-sm leading-relaxed flex-1">
              Мы используем cookies для улучшения работы сайта и анализа трафика.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/privacy"
                className="text-center text-sm text-dark/60 hover:text-dark underline underline-offset-2 transition-colors px-4 py-2"
              >
                Подробнее
              </Link>
              <button
                onClick={accept}
                className="text-sm font-light tracking-wider uppercase px-8 py-3 rounded-full border border-dark/30 text-dark bg-dark/10 backdrop-blur-sm hover:bg-dark hover:text-white transition-all duration-300 whitespace-nowrap"
              >
                Принять
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
