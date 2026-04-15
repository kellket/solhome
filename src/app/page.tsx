import Link from "next/link";
import Calculator from "@/components/Calculator";
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";

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
      <HeroSlider />

      <Calculator />

      <AboutSection />

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



    </>
  );
}
