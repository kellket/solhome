"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SlideInPanel from "./SlideInPanel";

const MOBILE_ABOUT_TEXT = "Мы\u00a0работаем с\u00a0квартирами в\u00a0Москве и\u00a0сопровождаем проекты на\u00a0всех этапах: от\u00a0концепции и\u00a0визуализации до\u00a0финальной реализации и\u00a0комплектации.";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mobileBgImgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const desktopImgRef = useRef<HTMLImageElement>(null);
  const mobileCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 1023px)", () => {
        if (mobileBgImgRef.current) {
          gsap.fromTo(mobileBgImgRef.current, {
            yPercent: -15,
          }, {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });

        tl.fromTo(bgRef.current, { yPercent: -20 }, { yPercent: 0, ease: "none" }, 0);
        tl.fromTo(overlayRef.current, { yPercent: -20 }, { yPercent: 0, ease: "none" }, 0);

        if (desktopImgRef.current) {
          gsap.fromTo(desktopImgRef.current, {
            yPercent: -25,
          }, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 lg:inset-[-30%_0] overflow-hidden lg:overflow-visible">
        <img
          ref={mobileBgImgRef}
          src="/bg25.webp"
          alt="Современный интерьер квартиры после ремонта от Sol Home"
          className="w-full h-full object-cover object-[25%_60%] scale-[1.4] lg:hidden"
        />
        <img
          src="/bg13.webp"
          alt="Дизайнерский интерьер гостиной после ремонта под ключ — Sol Home"
          className="w-full h-full object-cover lg:object-contain object-center hidden lg:block"
        />
      </div>
      <div ref={overlayRef} className="absolute inset-0 lg:inset-[-30%_0] bg-black/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:hidden relative min-h-[100vh] flex items-center justify-start py-16">
          <div className="relative text-left px-2">
            <p className="text-[#bf9b88] text-xs font-normal tracking-[0.3em] uppercase mb-6">
              О компании
            </p>
            <h2 className="text-2xl font-extralight text-white leading-tight mb-6">
              <span className="tracking-[0.35em] uppercase font-extralight">Sol Home</span>
              <br />
              <span className="tracking-wide">Ваш надёжный </span>
              <span className="text-white font-light tracking-wide">партнёр в ремонте</span>
            </h2>
            <p className="text-white text-[15px] font-extralight leading-[1.8] whitespace-nowrap">
              Мы&nbsp;работаем с&nbsp;квартирами в&nbsp;Москве<br />
              и&nbsp;сопровождаем проекты на&nbsp;всех этапах:<br />
              от&nbsp;концепции и&nbsp;визуализации до&nbsp;финальной<br />
              реализации и&nbsp;комплектации.
            </p>
          </div>
        </div>

        <div className="hidden lg:block relative">
          <img
            src="/bg13.webp"
            alt=""
            className="w-full h-auto invisible"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="w-full grid grid-cols-2 gap-16 items-center">
              <div className="relative z-10">
                <p className="text-[#bf9b88] text-xs font-normal tracking-[0.3em] uppercase mb-6">
                  О компании
                </p>
                <h2 className="text-3xl font-extralight text-white leading-tight mb-6">
                  <span className="tracking-[0.35em] uppercase font-extralight">Sol Home</span>
                  <br />
                  <span className="tracking-wide">Ваш надёжный </span>
                  <span className="text-white font-light tracking-wide">партнёр в ремонте</span>
                </h2>
                <div className="text-white/80 text-lg font-extralight leading-relaxed space-y-6">
                  <SlideInPanel className="p-6 rounded-2xl bg-black/20 backdrop-blur-md border border-white/20">
                    <p>
                      Мы работаем с квартирами в Москве и сопровождаем проекты на всех этапах:
                      от концепции и визуализации до финальной реализации и комплектации.
                    </p>
                  </SlideInPanel>
                </div>
              </div>
              <div className="relative max-w-[360px] mx-auto -mt-8">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
                  <img
                    ref={desktopImgRef}
                    src="/about-new.webp"
                    alt="Ремонт квартиры Sol Home — дизайнерский интерьер гостиной"
                    className="w-full h-[120%] object-cover will-change-transform"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
