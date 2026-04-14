"use client";

import { useState, useEffect, useRef } from "react";

const steps = [
  { num: "01", title: "Заявка", desc: "Специалист перезванивает, отвечает на вопросы и записывает на замер" },
  { num: "02", title: "Выезд на объект", desc: "Бесплатно выезжаем, делаем замеры и отвечаем на все вопросы" },
  { num: "03", title: "Бесплатная смета", desc: "Помогаем выбрать оптимальный вариант сметы и согласовываем детали" },
  { num: "04", title: "Договор", desc: "Заключаем договор, прописываем гарантию, цены и сроки" },
  { num: "05", title: "Закупка материалов", desc: "Закупаем и доставляем все материалы на объект" },
  { num: "06", title: "Ремонт", desc: "В удобный вам день начинаем ремонт с контролем на каждом этапе" },
  { num: "07", title: "Сдача объекта", desc: "Производим генеральную уборку и сдаём работы по акту приёмки" },
];

function StepsAnimation() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="hidden lg:block absolute top-8 left-0 right-0 h-[1px] bg-grey-mid" />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 lg:gap-4">
        {steps.map((step, index) => (
          <div key={step.num} className="relative text-center">
            <div
              className={`relative z-10 w-12 h-12 sm:w-16 sm:h-16 mx-auto flex items-center justify-center bg-white rounded-full mb-3 sm:mb-4 transition-all duration-500 ${
                activeIndex === index
                  ? "border-2 border-gold shadow-[0_0_20px_rgba(191,155,136,0.4)]"
                  : "border border-gold/40"
              }`}
            >
              <span
                className={`text-sm font-light tracking-wider transition-colors duration-500 ${
                  activeIndex === index ? "text-gold" : "text-gold/60"
                }`}
              >
                {step.num}
              </span>
            </div>
            <h3 className="text-dark text-sm font-normal tracking-wide mb-2">
              {step.title}
            </h3>
            <p className="text-grey-text text-xs font-extralight leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WorkSteps() {
  const [mountKey, setMountKey] = useState(0);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setMountKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        setMountKey((k) => k + 1);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return <StepsAnimation key={mountKey} />;
}
