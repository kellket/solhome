import Link from "next/link";

const benefits = [
  {
    title: "Поэтапная оплата",
    desc: "Без предоплат. Вы платите отдельно за каждый этап ремонта после подписания акта приёмки.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
        <rect x="2" y="6" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <path d="M6 14h4" />
      </svg>
    ),
  },
  {
    title: "Фиксированная цена",
    desc: "Стоимость гарантирована по договору и не меняется в процессе ремонта.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    title: "Гарантия до 5 лет",
    desc: "Предоставляем официальную гарантию на все виды выполненных работ.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Точно в срок",
    desc: "Сроки каждого этапа прописаны в договоре. Контролируем выполнение на каждом шаге.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

const services = [
  {
    num: "01",
    title: "Дизайн-проект",
    desc: "Разрабатываем полный дизайн-проект с планировкой, визуализациями и рабочей документацией.",
    list: ["планировочные решения", "3D-визуализация интерьера", "чертежи для строителей", "подбор материалов и мебели"],
  },
  {
    num: "02",
    title: "Ремонт «под ключ»",
    desc: "Берём на себя весь процесс реализации — от демонтажа до финальной уборки.",
    extra: "Вы получаете полностью готовую квартиру без необходимости контролировать стройку.",
  },
  {
    num: "03",
    title: "Авторский надзор",
    desc: "Контролируем соответствие ремонта дизайн-проекту и качество выполнения работ.",
    extra: "Регулярные выезды на объект и решение всех вопросов на месте.",
  },
  {
    num: "04",
    title: "Комплектация",
    desc: "Подбираем, закупаем и координируем поставки всех материалов, мебели и оборудования.",
    extra: "Экономим ваше время и исключаем ошибки при закупках.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative flex flex-col overflow-hidden">
        <div className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center pt-16 sm:pt-20 pb-8 sm:pb-48">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/bg1.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="absolute bottom-0 left-0 right-0 h-10 sm:h-16" 
            style={{ background: "linear-gradient(to top, white 0%, rgba(255,255,255,0.85) 15%, rgba(255,255,255,0.6) 35%, rgba(255,255,255,0.35) 55%, rgba(255,255,255,0.15) 75%, rgba(255,255,255,0.05) 90%, rgba(255,255,255,0) 100%)" }}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-block px-8 sm:px-16 py-8 sm:py-12 rounded-[80px] bg-black/20 backdrop-blur-[2px]">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extralight text-white tracking-wide leading-tight mb-4 sm:mb-6">
                Премиальный ремонт
                <br />
                <span className="gold-gradient-text font-light">квартир под ключ</span>
              </h1>
              <p className="text-white/70 text-base sm:text-xl font-extralight tracking-wide max-w-2xl mx-auto leading-relaxed">
            Интерьеры, построенные на архитектурной логике
            <br />
            и чистоте решений.
            </p>
            </div>
            <div className="mt-8 sm:mt-10">
              <Link
                href="/contacts"
                className="inline-block px-10 sm:px-14 py-3.5 sm:py-4 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white text-[13px] sm:text-[14px] font-light tracking-[0.15em] uppercase hover:scale-105 transition-transform duration-300"
              >
                Обсудить проект
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-gold text-xs font-normal tracking-[0.3em] uppercase mb-6">
                О компании
              </p>
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-extralight text-dark leading-tight mb-6">
                <span className="tracking-[0.35em] uppercase font-extralight">Sol Home</span>
                <span className="tracking-wide"> — ваш надёжный</span>
                <br />
                <span className="gold-gradient-text font-light tracking-wide">партнёр в ремонте</span>
              </h2>
              <div className="text-grey-text text-base sm:text-lg font-extralight leading-relaxed space-y-6">
                <div className="p-6 rounded-2xl bg-grey-light/50 border border-grey-mid/20">
                  <p>
                    Мы работаем с квартирами в Москве и сопровождаем проекты на всех этапах:
                    от концепции и визуализации до финальной реализации и комплектации.
                  </p>
                </div>
                
                <div>
                  <p className="mb-4 text-dark font-medium">Наши интерьеры — это не набор решений, а целостная система:</p>
                  <ul className="space-y-2 pl-1">
                    <li className="flex items-start gap-3">
                      <span className="text-gold mt-2 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"></span>
                      <span>выверенные планировки</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold mt-2 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"></span>
                      <span>продуманная логика пространства</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold mt-2 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"></span>
                      <span>баланс света, материалов и деталей</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 rounded-2xl bg-grey-light/50 border border-grey-mid/20">
                  <p>
                    Мы ценим архитектурную выразительность и качество исполнения.
                    Каждый проект для нас — это не просто ремонт, а создание среды, 
                    в которой комфортно жить долгие годы.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
                <img 
                  src="/about.jpg" 
                  alt="Интерьер Sol Home" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative section-padding">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/bg5.jpg')" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-block px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm">
              <h2 className="text-2xl sm:text-4xl font-extralight text-white tracking-wide">
                Наши услуги
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s, index) => (
              <div
                key={s.num}
                className="group relative bg-[#9a9aa0]/70 backdrop-blur-md p-8 sm:p-10 rounded-2xl border border-white/30 hover:bg-[#9a9aa0]/80 hover:border-gold/50 transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 border border-white/30 mb-6 group-hover:bg-[#6b5548]/30 group-hover:border-[#6b5548]/60 group-hover:scale-110 transition-all duration-500">
                  <span className="text-white group-hover:text-[#6b5548] text-xl font-extralight tracking-wider transition-colors duration-300">
                    {s.num}
                  </span>
                </div>
                <h3 className="text-white text-xl font-light tracking-wide mb-3 group-hover:text-[#6b5548] transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-white/80 text-sm font-extralight leading-relaxed">
                  {s.desc}
                </p>
                {s.list && (
                  <ul className="mt-4 space-y-1.5">
                    {s.list.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-white/80 text-sm font-extralight">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {s.extra && (
                  <p className="text-white/80 text-sm font-extralight leading-relaxed mt-4">
                    {s.extra}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative pt-20 pb-20 bg-white">
        <div 
          className="absolute -top-12 left-0 right-0 h-12"
          style={{ background: "linear-gradient(to bottom, #f7f5f3 0%, white 100%)" }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extralight text-dark tracking-wide mb-6">
            Узнайте стоимость ремонта
          </h2>
          <p className="text-grey-text text-base font-extralight leading-relaxed mb-10 max-w-xl mx-auto">
            Воспользуйтесь нашим калькулятором для расчёта примерной стоимости ремонта вашей квартиры. Это бесплатно и займёт не более минуты.
          </p>
          <Link
            href="/calculator"
            className="inline-block px-14 py-4 rounded-full border border-dark/20 bg-dark/10 backdrop-blur-md text-dark text-[14px] font-light tracking-[0.15em] uppercase hover:scale-105 transition-transform duration-300"
          >
            Открыть калькулятор
          </Link>
        </div>
      </section>
    </>
  );
}
