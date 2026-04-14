"use client";

import { useState } from "react";

const propertyTypes = [
  { id: "apartment", label: "Квартира" },
];

const repairTypes = [
  {
    id: "cosmetic",
    label: "Косметический",
    priceMin: 3790,
    priceMax: 4990,
    materialRate: 4000,
  },
  {
    id: "capital",
    label: "Капитальный",
    priceMin: 6890,
    priceMax: 7490,
    materialRate: 7500,
  },
  {
    id: "design",
    label: "Дизайнерский",
    priceMin: 7490,
    priceMax: 9490,
    materialRate: 9000,
  },
  {
    id: "turnkey",
    label: "Под ключ",
    priceMin: 9490,
    priceMax: 12000,
    materialRate: 11000,
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

export default function CalculatorPage() {
  const [step, setStep] = useState(1);
  const [property, setProperty] = useState("apartment");
  const [repair, setRepair] = useState("capital");
  const [area, setArea] = useState(50);
  const [needDesign, setNeedDesign] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
    <>
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/bg3.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div 
          className="absolute bottom-0 left-0 right-0 h-10 sm:h-16" 
          style={{ background: "linear-gradient(to top, #f7f5f3 0%, rgba(247,245,243,0.85) 15%, rgba(247,245,243,0.6) 35%, rgba(247,245,243,0.35) 55%, rgba(247,245,243,0.15) 75%, rgba(247,245,243,0.05) 90%, rgba(247,245,243,0) 100%)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="rounded-[40px] bg-black/20 backdrop-blur-[2px] p-6 sm:p-10">
            <div className="text-center mb-10">
              <p className="text-gold text-xs font-normal tracking-[0.3em] uppercase mb-4">
                Калькулятор
              </p>
              <h1 className="text-3xl sm:text-4xl font-extralight text-white tracking-wide">
                Расчёт стоимости ремонта
              </h1>
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
                        className={`text-left p-5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-[1.02] ${
                          repair === r.id
                            ? "border-2 border-gold bg-gold/20"
                            : "border border-white/30 bg-white/10 hover:border-gold/40"
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
                          className={`py-3 px-8 rounded-full backdrop-blur-md text-sm font-light tracking-wide transition-all duration-300 hover:scale-105 ${
                            needDesign === val
                              ? "border-2 border-gold bg-gold/20 text-white"
                              : "border border-white/30 bg-white/10 text-white/70 hover:border-gold/40"
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
                      placeholder="Телефон"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
      </section>

      <section className="relative py-16 bg-grey-light">
        <div 
          className="absolute -top-12 left-0 right-0 h-12"
          style={{ background: "linear-gradient(to bottom, white 0%, #f7f5f3 100%)" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extralight text-dark tracking-wide mb-2">
              Тарифы на ремонт
            </h2>
            <p className="text-grey-text text-sm font-extralight">
              Стоимость работ за квадратный метр
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {repairTypes.map((r, index) => (
              <div
                key={r.id}
                className="group relative bg-white p-6 sm:p-8 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.04)] border border-grey-mid/20 hover:shadow-[0_20px_60px_rgba(191,155,136,0.15)] hover:border-gold/30 transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />
                <h3 className="text-dark text-lg font-normal tracking-wide mb-4 group-hover:text-gold transition-colors duration-300">
                  {r.label}
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-grey-text font-extralight">Работы</span>
                    <span className="text-dark font-light">
                      от {formatPrice(r.priceMin)} ₽/м²
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-grey-text font-extralight">Материалы</span>
                    <span className="text-dark font-light">
                      от {formatPrice(r.materialRate)} ₽/м²
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
