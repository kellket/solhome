"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function ContactsPage() {
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
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-gold text-xs font-normal tracking-[0.3em] uppercase mb-4">
              Контакты
            </p>
            <h1 className="text-3xl sm:text-4xl font-extralight text-dark tracking-wide">
              Свяжитесь с нами
            </h1>
            
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-xl font-light text-dark tracking-wide mb-8">
                Sol Home
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-gold mt-0.5 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-grey-text font-normal tracking-wider uppercase mb-1">
                      Телефон
                    </p>
                    <a href="tel:+7XXXXXXXXXX" className="text-dark text-base font-light hover:text-gold transition-colors">
                      +7 (XXX) XXX-XX-XX
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-gold mt-0.5 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <path d="M22 6l-10 7L2 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-grey-text font-normal tracking-wider uppercase mb-1">
                      Email
                    </p>
                    <a href="mailto:info@solhome.ru" className="text-dark text-base font-light hover:text-gold transition-colors">
                      info@solhome.ru
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-gold mt-0.5 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-grey-text font-normal tracking-wider uppercase mb-1">
                      Адрес
                    </p>
                    <p className="text-dark text-base font-light">
                      г. Город, ул. Улица, д. XX
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-gold mt-0.5 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-grey-text font-normal tracking-wider uppercase mb-1">
                      Время работы
                    </p>
                    <p className="text-dark text-base font-light">Пн–Пт: 09:00–19:00</p>
                    <p className="text-dark text-base font-light">Сб: 10:00–16:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {!submitted ? (
                <>
                  <h2 className="text-xl font-light text-dark tracking-wide mb-8">
                    Оставить заявку
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      required
                      className="w-full px-5 py-3.5 border border-grey-mid rounded-sm text-sm font-light text-dark placeholder:text-grey-text/60 focus:outline-none focus:border-gold transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Телефон"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      required
                      className="w-full px-5 py-3.5 border border-grey-mid rounded-sm text-sm font-light text-dark placeholder:text-grey-text/60 focus:outline-none focus:border-gold transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full px-5 py-3.5 border border-grey-mid rounded-sm text-sm font-light text-dark placeholder:text-grey-text/60 focus:outline-none focus:border-gold transition-colors"
                    />
                    <textarea
                      placeholder="Сообщение"
                      rows={4}
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      className="w-full px-5 py-3.5 border border-grey-mid rounded-sm text-sm font-light text-dark placeholder:text-grey-text/60 focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.agree}
                        onChange={(e) => updateField("agree", e.target.checked)}
                        required
                        className="mt-1 w-4 h-4 rounded-sm border-grey-mid accent-[#bf9b88]"
                      />
                      <span className="text-grey-text text-xs font-extralight leading-relaxed">
                        Я согласен с политикой обработки персональных данных
                      </span>
                    </label>
                    <button
                      type="submit"
                      className="btn-gold w-full py-4 rounded-sm text-[14px] font-normal tracking-[0.2em] uppercase"
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
                  <h3 className="text-xl font-extralight text-dark tracking-wide mb-2">
                    Заявка отправлена
                  </h3>
                  <p className="text-grey-text text-sm font-extralight text-center">
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

      <section className="relative bg-grey-light">
        <div 
          className="absolute -top-12 left-0 right-0 h-12"
          style={{ background: "linear-gradient(to bottom, white 0%, #f7f5f3 100%)" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          <div className="aspect-[4/3] sm:aspect-[16/6] bg-grey-mid/40 rounded-sm flex items-center justify-center">
            <div className="text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10 text-grey-text/40 mx-auto mb-3">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p className="text-grey-text text-sm font-extralight">
                Здесь будет карта
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
