"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function ContactsClient() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", agree: false });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function updateField(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <>
      <section className="relative overflow-hidden pt-24 sm:pt-32 pb-16 sm:pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/bg28.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-4xl mx-auto">
            <div>
              <h2 className="text-xl font-light text-white tracking-wide mb-8">
                Контакты
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-white mt-0.5 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <path d="M22 6l-10 7L2 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/70 font-normal tracking-wider uppercase mb-1">
                      Email
                    </p>
                    <a href="mailto:info.solhome@yandex.ru" className="text-white text-base font-light hover:text-gold transition-colors">
                      info.solhome@yandex.ru
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-white mt-0.5 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/70 font-normal tracking-wider uppercase mb-1">
                      Телефон
                    </p>
                    <a href="tel:+79019018443" className="text-white text-base font-light hover:text-gold transition-colors">
                      +7 901 901 84 43
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-white mt-0.5 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/70 font-normal tracking-wider uppercase mb-1">
                      Время работы
                    </p>
                    <p className="text-white text-base font-light">Пн–Вс: 09:00–19:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-white mt-0.5 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/70 font-normal tracking-wider uppercase mb-1">
                      Адрес
                    </p>
                    <p className="text-white text-base font-light">
                      г. Москва
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {!submitted ? (
                <>
                  <h2 className="text-xl font-light text-white tracking-wide mb-8">
                    Оставить заявку
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-zА-Яа-яЁё\s]/g, '');
                      }}
                      pattern="[A-Za-zА-Яа-яЁё\s]+"
                      required
                      className="w-full px-6 py-3.5 bg-white/10 border border-white/30 rounded-full text-sm font-light text-white placeholder:text-white/50 focus:outline-none focus:border-gold transition-colors"
                    />
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="Телефон"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9+\-\(\)\s]/g, '');
                      }}
                      required
                      className="w-full px-6 py-3.5 bg-white/10 border border-white/30 rounded-full text-sm font-light text-white placeholder:text-white/50 focus:outline-none focus:border-gold transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                      className="w-full px-6 py-3.5 bg-white/10 border border-white/30 rounded-full text-sm font-light text-white placeholder:text-white/50 focus:outline-none focus:border-gold transition-colors"
                    />
                    <textarea
                      placeholder="Сообщение"
                      rows={4}
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      className="w-full px-6 py-3.5 bg-white/10 border border-white/30 rounded-3xl text-sm font-light text-white placeholder:text-white/50 focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                    <label className="flex items-start gap-3 cursor-pointer">
                      <span className="relative mt-0.5 flex-shrink-0 inline-flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={form.agree}
                          onChange={(e) => updateField("agree", e.target.checked)}
                          required
                          className="peer w-5 h-5 rounded-full border border-white/30 bg-white/10 appearance-none checked:bg-[#bf9b88] checked:border-[#bf9b88] cursor-pointer transition-colors"
                        />
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="pointer-events-none absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                        >
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-white/70 text-xs font-extralight leading-relaxed">
                        Я согласен с политикой обработки персональных данных
                      </span>
                    </label>
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full text-[14px] font-normal tracking-[0.2em] uppercase bg-dark text-white border border-dark hover:bg-dark/90 transition-colors"
                    >
                      Отправить заявку
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-12 animate-fade-in-up">
                  <div className="w-16 h-16 mb-6 rounded-full border-2 border-gold flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-gold">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-extralight text-white tracking-wide mb-2">
                    Заявка отправлена
                  </h3>
                  <p className="text-white/70 text-sm font-extralight text-center">
                    Мы свяжемся с вами в ближайшее время
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", phone: "", email: "", message: "", agree: false });
                    }}
                    className="btn-outline-gold mt-8 px-8 py-3 rounded-sm text-[13px] font-normal tracking-[0.15em] uppercase"
                  >
                    Новая заявка
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/60 text-xs font-normal tracking-[0.3em] uppercase mb-3">
            Мы на карте
          </p>
          <h2 className="text-xl font-light text-white tracking-wide mb-6">
            Работаем по всей Москве
          </h2>
          <div className="rounded-xl overflow-hidden border border-white/10">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=37.617671%2C55.755864&z=10&mode=whatshere&whatshere%5Bpoint%5D=37.617671%2C55.755864&whatshere%5Bzoom%5D=10&lang=ru_RU"
              width="100%"
              height="400"
              frameBorder="0"
              allowFullScreen
              title="Яндекс.Карта — г. Москва"
              className="block w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
