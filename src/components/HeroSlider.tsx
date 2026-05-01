'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import gsap from 'gsap';
import Link from 'next/link';
import Image from 'next/image';

import 'swiper/css';

const slides = [
  { img: '/bg7.webp', line1: 'Ремонт квартир', line2: 'в Москве под ключ' },
  { img: '/bg10.webp', line1: 'Дизайн-проект', line2: 'и реализация' },
  { img: '/bg11.webp', line1: 'Премиальное', line2: 'качество работ' },
];

const SLOTS_DESKTOP = 7;
const SLOTS_MOBILE = 3;
const DURATION_DESKTOP = 2;
const DURATION_MOBILE = 0.8;

export default function HeroSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [currentImg, setCurrentImg] = useState(slides[0].img);
  const [curtain, setCurtain] = useState<{ outImg: string; inImg: string } | null>(null);
  const [prefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const outRef = useRef<HTMLDivElement>(null);
  const inRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const updateDimensions = () => {
      const el = containerRef.current;
      if (el) {
        setDimensions({ width: el.offsetWidth, height: el.offsetHeight });
      }
    };
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 300);
    };
    updateDimensions();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const firstImg = new window.Image();
    firstImg.src = slides[0].img;

    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        slides.slice(1).forEach((s) => {
          const img = new window.Image();
          img.src = s.img;
        });
      }, { once: true });
    }
  }, []);

  useEffect(() => {
    if (!curtain || !outRef.current || !inRef.current) return;

    if (prefersReducedMotion) {
      setTimeout(() => setCurtain(null), 0);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setCurtain(null);
      },
    });
    tlRef.current = tl;

    const outSlots = outRef.current.querySelectorAll('.slotslide');
    const inSlots = inRef.current.querySelectorAll('.slotslide');

    const slots = isMobile ? SLOTS_MOBILE : SLOTS_DESKTOP;
    const duration = isMobile ? DURATION_MOBILE : DURATION_DESKTOP;
    const slotDur = duration / slots;
    const stagger = slotDur / 2;

    outSlots.forEach((el, i) => {
      tl.fromTo(el,
        { opacity: 1, x: 0 },
        {
          opacity: 0,
          x: -30,
          duration: slotDur,
          delay: i * stagger,
          ease: 'power2.inOut',
        }, 0);
    });

    inSlots.forEach((el, i) => {
      tl.fromTo(el,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: slotDur,
          delay: i * stagger,
          ease: 'power2.inOut',
        }, 0);
    });

    return () => { tl.kill(); };
  }, [curtain, isMobile, prefersReducedMotion]);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    if (tlRef.current) tlRef.current.kill();
    const outImg = currentImg;
    const inImg = slides[swiper.realIndex].img;
    setCurrentImg(inImg);
    setActiveIdx(swiper.realIndex);
    setAnimKey((k) => k + 1);
    setCurtain({ outImg, inImg });
  }, [currentImg]);

  const slide = slides[activeIdx];
  const current = String(activeIdx + 1).padStart(2, '0');
  const total = String(slides.length).padStart(2, '0');

  const renderSlots = useCallback((imgSrc: string) => {
    const slots = isMobile ? SLOTS_MOBILE : SLOTS_DESKTOP;
    const fullW = dimensions.width;
    const fullH = dimensions.height;
    const slotW = Math.ceil(fullW / slots);

    return Array.from({ length: slots }, (_, k) => (
      <div
        key={k}
        className="slotslide"
        style={{
          position: 'absolute',
          overflow: 'hidden',
          top: 0,
          left: k * slotW,
          width: slotW + 1,
          height: fullH,
          transform: 'translateZ(0)',
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          contain: 'layout paint',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: -k * slotW,
            width: fullW,
            height: fullH,
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>
    ));
  }, [dimensions, isMobile]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 z-[1]">
        <Image
          src={currentImg}
          alt={`${slide.line1} ${slide.line2} — Sol Home`}
          fill
          priority
          sizes="100vw"
          quality={80}
          className="transition-opacity duration-500"
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
        />
      </div>
      <div className="absolute inset-0 z-[2] bg-black/40" />

      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        autoplay={
          prefersReducedMotion
            ? false
            : {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        loop
        speed={50}
        onSwiper={(s) => { swiperRef.current = s; }}
        onSlideChangeTransitionStart={handleSlideChange}
        className="!absolute !inset-0 !z-0 opacity-0 pointer-events-none"
      >
        {slides.map((_, i) => (
          <SwiperSlide key={i}><div className="h-screen" /></SwiperSlide>
        ))}
      </Swiper>

      {curtain && (
        <>
          <div ref={inRef} className="hero-curtain-overlay" style={{ zIndex: 20 }}>
            {renderSlots(curtain.inImg)}
          </div>
          <div ref={outRef} className="hero-curtain-overlay" style={{ zIndex: 21 }}>
            {renderSlots(curtain.outImg)}
          </div>
          <div className="absolute inset-0 z-[22] bg-black/40 pointer-events-none" />
        </>
      )}



      <div className="relative z-[25] flex items-center justify-center h-full pt-16 sm:pt-20 pb-8 sm:pb-48">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
          <div 
            className="absolute -inset-x-32 -inset-y-32 bg-black/25 backdrop-blur-[3px] pointer-events-none"
            style={{
              maskImage: "radial-gradient(ellipse 60% 60% at center, black 30%, transparent 65%)",
              WebkitMaskImage: "radial-gradient(ellipse 60% 60% at center, black 30%, transparent 65%)",
              transform: 'translateZ(0)',
              willChange: 'backdrop-filter',
              backfaceVisibility: 'hidden',
              contain: 'layout paint',
            }}
          />
          <div className="relative">
            <h1 key={animKey} className="text-3xl sm:text-5xl lg:text-6xl font-extralight text-white tracking-wide leading-tight mb-4 sm:mb-6 will-change-transform">
              <span className="hero-text-line1 block">{slide.line1}</span>
              <span className="hero-text-line2 gold-gradient-text font-light block mt-1">{slide.line2}</span>
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
    </div>
  );
}
