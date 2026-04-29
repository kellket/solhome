"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const repairTypes = [
  {
    id: "cosmetic",
    label: "Косметический",
    priceMin: 18370,
    priceMax: 18370,
    materialRate: 0,
  },
  {
    id: "capital",
    label: "Капитальный",
    priceMin: 23715,
    priceMax: 23715,
    materialRate: 0,
  },
  {
    id: "design",
    label: "Дизайнерский",
    priceMin: 27300,
    priceMax: 27300,
    materialRate: 0,
  },
  {
    id: "turnkey",
    label: "Под ключ",
    priceMin: 33050,
    priceMax: 33050,
    materialRate: 0,
  },
];

const DESIGN_PROJECT_RATE = 2500;

function formatPrice(n: number): string {
  return n.toLocaleString("ru-RU");
}

function calcDuration(area: number): string {
  const months = Math.min(1.5 + area / 40, 6);
  const rounded = Math.round(months * 2) / 2;
  if (rounded === 1) return "~1 месяц";
  if (rounded < 5) return `~${rounded} месяца`;
  return `~${rounded} месяцев`;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (!digits) return '';
  let result = '+7';
  if (digits.length > 1) result += ' (' + digits.slice(1, 4);
  if (digits.length >= 4) result += ') ' + digits.slice(4, 7);
  if (digits.length >= 7) result += '-' + digits.slice(7, 9);
  if (digits.length >= 9) result += '-' + digits.slice(9, 11);
  return result;
}

export default function Calculator() {
  const [step, setStep] = useState(1);
  const [repair, setRepair] = useState("capital");
  const [area, setArea] = useState(50);
  const [needDesign, setNeedDesign] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(bgImgRef.current, {
          yPercent: -10,
        }, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const selectedRepair = repairTypes.find((r) => r.id === repair)!;
  const designAdd = needDesign ? DESIGN_PROJECT_RATE * area : 0;
  const laborMin = selectedRepair.priceMin * area;
  const laborMax = selectedRepair.priceMax * area;
  const materials = selectedRepair.materialRate * area;
  const totalMin = laborMin + materials + designAdd;
  const totalMax = laborMax + materials + designAdd;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="calculator" ref={sectionRef} className="relative section-padding overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 overflow-hidden">
        <img
          ref={bgImgRef}
          src="/bg12.webp"
          alt=""
          className="w-full h-full object-cover object-center scale-[1.4]"
        />
      </div>
      <div ref={overlayRef} className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-[40px] bg-black/20 backdrop-blur-[2px] p-6 sm:p-10">
          <div className="text-center mb-10">
            <p className="text-gold text-xs font-normal tracking-[0.3em] uppercase mb-4">
              Калькулятор
            </p>
            <h2 className="text-3xl sm:text-4xl font-extralight text-white tracking-wide">
              Расчёт стоимости ремонта
            </h2>
            <p className="text-white/70 text-base font-extralight mt-2">
              Узнайте примерную цену за 1 минуту
            </p>
          </div>

          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-normal tracking-wider text-white/70 uppercase">
                Шаг {step} из 2
              </span>
              <span className="text-xs text-white/70">
                {step === 1 ? "Параметры" : "Результат"}
              </span>
            </div>
            <div className="h-[2px] bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full gold-gradient rounded-full transition-all duration-500"
                style={{ width: step === 1 ? "50%" : "100%" }}
              />
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-10 animate-fade-in-up">
              <div>
                <label className="block text-white text-sm font-normal tracking-wide mb-4">
                  Вид ремонта
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {repairTypes.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRepair(r.id)}
                      className={`text-left p-5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-[1.02] border border-white/30 ${
                        repair === r.id
                          ? "ring-2 ring-gold bg-gold/20"
                          : "bg-white/10 hover:border-gold/40"
                      }`}
                    >
                      <div className="text-white text-base font-normal tracking-wide mb-1">
                        {r.label}
                      </div>
                      <div className="text-gold text-sm font-light">
                        от {formatPrice(r.priceMin)} ₽/м²
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-normal tracking-wide mb-4">
                  Площадь помещения:{" "}
                  <span className="text-gold font-normal">{area} м²</span>
                </label>
                <input
                  type="range"
                  min={20}
                  max={300}
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full mb-3"
                />
                <div className="flex justify-between text-xs text-white/60">
                  <span>20 м²</span>
                  <span>300 м²</span>
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-normal tracking-wide mb-4">
                  Нужен дизайн-проект?
                </label>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    {[true, false].map((val) => (
                      <button
                        key={String(val)}
                        type="button"
                        onClick={() => setNeedDesign(val)}
                        className={`py-3 px-8 rounded-full backdrop-blur-md text-sm font-light tracking-wide transition-all duration-300 hover:scale-105 border border-white/30 ${
                          needDesign === val
                            ? "ring-2 ring-gold bg-gold/20 text-white"
                            : "bg-white/10 text-white/70 hover:border-gold/40"
                        }`}
                      >
                        {val ? "Да" : "Нет"}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="hidden sm:block px-12 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white text-[14px] font-light tracking-[0.15em] uppercase hover:scale-105 transition-transform duration-300"
                  >
                    Далее
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="sm:hidden w-full mt-6 px-12 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white text-[14px] font-light tracking-[0.15em] uppercase hover:scale-105 transition-transform duration-300"
                >
                  Далее
                </button>
              </div>
            </div>
          )}

          {step === 2 && !submitted && (
            <div className="animate-fade-in-up">
              <div className="mb-10">
                <div className="text-center mb-8">
                  <p className="text-white/70 text-xs font-normal tracking-[0.15em] uppercase mb-3">
                    Примерная стоимость
                  </p>
                  <div className="text-xl sm:text-4xl font-extralight text-white tracking-wide">
                    <span className="gold-gradient-text">
                      {formatPrice(totalMin)} — {formatPrice(totalMax)} ₽
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-white/60 text-xs font-normal tracking-wider uppercase mb-2">
                      Работы
                    </div>
                    <div className="text-white text-lg font-light">
                      {formatPrice(laborMin)} — {formatPrice(laborMax)} ₽
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/60 text-xs font-normal tracking-wider uppercase mb-2">
                      Материалы
                    </div>
                    <div className="text-white text-lg font-light">
                      от {formatPrice(materials)} ₽
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/60 text-xs font-normal tracking-wider uppercase mb-2">
                      Сроки
                    </div>
                    <div className="text-white text-lg font-light">
                      {calcDuration(area)}
                    </div>
                  </div>
                </div>

                {needDesign && (
                  <div className="mt-6 pt-6 border-t border-white/20 text-center">
                    <span className="text-white/60 text-xs font-normal tracking-wider uppercase">
                      Дизайн-проект:
                    </span>{" "}
                    <span className="text-white text-sm font-light">
                      {formatPrice(designAdd)} ₽
                    </span>
                  </div>
                )}
              </div>

              <div className="max-w-md mx-auto">
                <h3 className="text-white text-lg font-light tracking-wide text-center mb-6">
                  Получите точную смету
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-5 py-3.5 border border-white/30 bg-white/10 backdrop-blur-md rounded-full text-sm font-light text-white placeholder:text-white/50 focus:outline-none focus:border-gold transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    onFocus={(e) => { if (!e.target.value) setPhone('+7'); }}
                    required
                    className="w-full px-5 py-3.5 border border-white/30 bg-white/10 backdrop-blur-md rounded-full text-sm font-light text-white placeholder:text-white/50 focus:outline-none focus:border-gold transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white text-[14px] font-light tracking-[0.15em] uppercase hover:scale-105 transition-transform duration-300"
                  >
                    Получить точную смету
                  </button>
                </form>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="block mx-auto mt-4 text-white/60 text-sm font-light hover:text-gold transition-colors"
                >
                  &larr; Назад к параметрам
                </button>
              </div>
            </div>
          )}

          {submitted && (
            <div className="text-center py-20 animate-fade-in-up">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-gold flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-gold">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-extralight text-white tracking-wide mb-3">
                Заявка отправлена
              </h2>
              <p className="text-white/70 text-base font-extralight mb-8">
                Мы свяжемся с вами в ближайшее время для уточнения деталей
              </p>
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setSubmitted(false);
                  setName("");
                  setPhone("");
                }}
                className="px-10 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white text-[14px] font-light tracking-[0.15em] uppercase hover:scale-105 transition-transform duration-300"
              >
                Новый расчёт
              </button>
            </div>
          )}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "Service",
                "position": 1,
                "name": "Косметический ремонт квартиры",
                "description": "Косметический ремонт квартиры в Москве",
                "provider": { "@type": "LocalBusiness", "name": "Sol Home" },
                "areaServed": "Москва",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "RUB",
                  "price": "18370",
                  "priceSpecification": {
                    "@type": "UnitPriceSpecification",
                    "price": "18370",
                    "priceCurrency": "RUB",
                    "unitText": "м²"
                  }
                }
              },
              {
                "@type": "Service",
                "position": 2,
                "name": "Капитальный ремонт квартиры",
                "description": "Капитальный ремонт квартиры в Москве",
                "provider": { "@type": "LocalBusiness", "name": "Sol Home" },
                "areaServed": "Москва",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "RUB",
                  "price": "23715",
                  "priceSpecification": {
                    "@type": "UnitPriceSpecification",
                    "price": "23715",
                    "priceCurrency": "RUB",
                    "unitText": "м²"
                  }
                }
              },
              {
                "@type": "Service",
                "position": 3,
                "name": "Дизайнерский ремонт квартиры",
                "description": "Дизайнерский ремонт квартиры в Москве",
                "provider": { "@type": "LocalBusiness", "name": "Sol Home" },
                "areaServed": "Москва",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "RUB",
                  "price": "27300",
                  "priceSpecification": {
                    "@type": "UnitPriceSpecification",
                    "price": "27300",
                    "priceCurrency": "RUB",
                    "unitText": "м²"
                  }
                }
              },
              {
                "@type": "Service",
                "position": 4,
                "name": "Ремонт квартиры под ключ",
                "description": "Ремонт квартиры под ключ в Москве",
                "provider": { "@type": "LocalBusiness", "name": "Sol Home" },
                "areaServed": "Москва",
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "RUB",
                  "price": "33050",
                  "priceSpecification": {
                    "@type": "UnitPriceSpecification",
                    "price": "33050",
                    "priceCurrency": "RUB",
                    "unitText": "м²"
                  }
                }
              }
            ]
          })
        }}
      />
    </section>
  );
}
