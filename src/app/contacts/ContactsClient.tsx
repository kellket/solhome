"use client";

import { useState } from "react";
import type { FormEvent } from "react";

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

export default function ContactsClient() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", agree: false });
  const [showDirectorContact, setShowDirectorContact] = useState(false);

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
            src="/bg28.webp"
            alt="Интерьер квартиры после ремонта — свяжитесь с Sol Home"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl font-extralight text-white tracking-wide">
              Свяжитесь с нами
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-start max-w-6xl mx-auto">
            <div className="lg:order-3 lg:pl-8">
              <h2 className="text-xl font-light text-white tracking-wide mb-8 text-center lg:text-left">
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
                      Мы на карте
                    </p>
                    <p className="text-white text-base font-light">
                      Работаем по всей Москве и МО
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-xl overflow-hidden border border-white/10">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=37.617671%2C55.755864&z=9&lang=ru_RU"
                  width="100%"
                  height="200"
                  frameBorder="0"
                  title="Яндекс.Карта — Московская область"
                  className="block w-full"
                />
              </div>
            </div>

            <div className="lg:order-1 lg:pl-20">
              <h2 className="text-xl font-light text-white tracking-wide mb-8 text-center lg:text-left">
                Социальные сети
              </h2>

              <div className="space-y-6">
                <a
                  href="https://t.me/solhomeru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white group-hover:text-gold transition-colors">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.74 3.99-1.74 6.65-2.89 7.99-3.45 3.8-1.6 4.59-1.88 5.1-1.89.11 0 .37.03.53.17.14.12.18.28.2.45-.01.06.01.24 0 .38z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-light group-hover:text-gold transition-colors">Telegram</p>
                    <p className="text-white/50 text-sm font-extralight">Канал</p>
                  </div>
                </a>

                <a
                  href="https://max.ru/id250551557109_biz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white group-hover:text-gold transition-colors">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.18 1.88 5.82L2.5 21.5l3.68-1.38A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-light group-hover:text-gold transition-colors">Max</p>
                    <p className="text-white/50 text-sm font-extralight">Канал</p>
                  </div>
                </a>

                <a
                  href="https://vk.ru/sol_home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white group-hover:text-gold transition-colors">
                      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-light group-hover:text-gold transition-colors">ВКонтакте</p>
                    <p className="text-white/50 text-sm font-extralight">Группа</p>
                  </div>
                </a>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-light text-white tracking-wide mb-4">
                  Связаться с директором
                </h3>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDirectorContact(!showDirectorContact)}
                    className="flex items-center gap-3 px-5 py-3 bg-white/10 border border-white/30 rounded-full text-white text-sm font-light hover:bg-white/20 hover:border-gold transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Написать напрямую
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-4 h-4 transition-transform ${showDirectorContact ? 'rotate-180' : ''}`}>
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  
                  {showDirectorContact && (
                    <div className="absolute top-full left-0 mt-2 bg-dark-bg/95 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden z-10">
                      <a
                        href="https://t.me/ovs_solhome"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-5 py-3 text-white text-sm font-light hover:bg-white/10 transition-colors"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gold">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.74 3.99-1.74 6.65-2.89 7.99-3.45 3.8-1.6 4.59-1.88 5.1-1.89.11 0 .37.03.53.17.14.12.18.28.2.45-.01.06.01.24 0 .38z"/>
                        </svg>
                        Telegram
                      </a>
                      <a
                        href="https://max.ru/u/f9LHodD0cOKthlwhDxD0oUCuNPpVBJlRtNPYFp7dPZAIqvsAQVTaY8xy3Q4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-5 py-3 text-white text-sm font-light hover:bg-white/10 transition-colors"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gold">
                          <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.18 1.88 5.82L2.5 21.5l3.68-1.38A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
                        </svg>
                        Max
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:order-2">
              {!submitted ? (
                <>
                  <h2 className="text-xl font-light text-white tracking-wide mb-8 text-center lg:text-left lg:pl-4">
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
                      placeholder="+7 (___) ___-__-__"
                      value={form.phone}
                      onChange={(e) => updateField("phone", formatPhone(e.target.value))}
                      onFocus={(e) => { if (!e.currentTarget.value) updateField("phone", "+7"); }}
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
    </>
  );
}
