"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SlideInPanel from "./SlideInPanel";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const imgBlurRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const desktopImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });

      tl.fromTo(bgRef.current, { yPercent: -30 }, { yPercent: 0, ease: "none" }, 0);
      tl.fromTo(overlayRef.current, { yPercent: -30 }, { yPercent: 0, ease: "none" }, 0);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (desktopImgRef.current) {
          gsap.fromTo(desktopImgRef.current, {
            yPercent: -35,
          }, {
            yPercent: 20,
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

      mm.add("(max-width: 1023px)", () => {
        const moveTrigger = {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "center center",
          scrub: true,
        };

        gsap.fromTo(textRef.current, 
          { y: 0 },
          { y: "20vh", ease: "none", scrollTrigger: moveTrigger }
        );

        gsap.fromTo(imgRef.current,
          { y: 0 },
          { y: "-25vh", ease: "none", scrollTrigger: moveTrigger }
        );

        gsap.fromTo(imgBlurRef.current,
          { opacity: 0 },
          { opacity: 1, ease: "none", scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 30%",
            end: "center center",
            scrub: true,
          }}
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative section-padding overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg13.jpg')" }}
      />
      <div ref={overlayRef} className="absolute inset-0 bg-black/40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: stacked/overlapping layout */}
        <div className="lg:hidden relative min-h-[100vh]">
          <div 
            ref={imgRef} 
            className="absolute inset-x-4 bottom-0 aspect-[4/5] max-h-[60vh] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
          >
            <img
              src="/about-new.jpg"
              alt="Интерьер Sol Home"
              className="w-full h-full object-cover"
            />
            <div
              ref={imgBlurRef}
              className="absolute inset-0 backdrop-blur-xl opacity-0 pointer-events-none"
              style={{
                maskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 85%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 85%)",
              }}
            />
          </div>
          <div ref={textRef} className="absolute inset-x-0 top-0 z-10 text-center px-4 pt-8">
            <p className="text-[#3d2518] text-xs font-normal tracking-[0.3em] uppercase mb-4">
              О компании
            </p>
            <h2 className="text-xl sm:text-2xl font-extralight text-white leading-tight mb-4">
              <span className="tracking-[0.35em] uppercase font-extralight">Sol Home</span>
              <br />
              <span className="tracking-wide">Ваш надёжный </span>
              <span className="text-white font-light tracking-wide">партнёр в ремонте</span>
            </h2>
            <div className="text-white/80 text-base font-extralight leading-relaxed text-left px-2">
              <p style={{ textShadow: "0 2px 12px rgba(0,0,0,0.85), 0 4px 25px rgba(0,0,0,0.7), 0 0 50px rgba(0,0,0,0.5)" }}>
                Мы работаем с квартирами в Москве и сопровождаем проекты на всех этапах:
                от концепции и визуализации до финальной реализации и комплектации.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop: side-by-side grid */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <p className="text-[#3d2518] text-xs font-normal tracking-[0.3em] uppercase mb-6">
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
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
              <img
                ref={desktopImgRef}
                src="/about-new.jpg"
                alt="Интерьер Sol Home"
                className="w-full h-[120%] object-cover will-change-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
