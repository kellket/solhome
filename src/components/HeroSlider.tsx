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

const SLOTS = 7;
const DURATION = 2;

export default function HeroSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [currentImg, setCurrentImg] = useState(slides[0].img);
  const [curtain, setCurtain] = useState<{ outImg: string; inImg: string } | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const outRef = useRef<HTMLDivElement>(null);
  const inRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    slides.forEach((s) => {
      const img = new window.Image();
      img.src = s.img;
    });
  }, []);

  useEffect(() => {
    if (!curtain || !outRef.current || !inRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentImg(curtain.inImg);
        setCurtain(null);
      },
    });
    tlRef.current = tl;

    const slotDur = DURATION / SLOTS;
    const stagger = slotDur / 2;

    const outSlots = outRef.current.querySelectorAll('.slotslide');
    const inSlots = inRef.current.querySelectorAll('.slotslide');

    outSlots.forEach((el, i) => {
      tl.fromTo(el, {
        opacity: 1,
        rotationY: 0,
        scale: 1,
        rotationX: 0,
        force3D: true,
        transformPerspective: 600,
        transformOrigin: 'center right',
      }, {
        opacity: 0,
        rotationY: 110,
        rotationX: 0,
        force3D: true,
        ease: 'power2.inOut',
        duration: slotDur,
        delay: i * stagger,
      }, 0);
    });

    inSlots.forEach((el, i) => {
      tl.fromTo(el, {
        opacity: 0,
        top: 0,
        left: 0,
        rotationY: 90,
        scale: 1,
        rotationX: 0,
        force3D: true,
        transformPerspective: 600,
        transformOrigin: 'center left',
      }, {
        opacity: 1,
        top: 0,
        left: 0,
        rotationX: 0,
        rotationY: 0,
        force3D: true,
        ease: 'power2.inOut',
        duration: slotDur,
        delay: i * stagger,
      }, 0);
    });

    return () => { tl.kill(); };
  }, [curtain]);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    if (tlRef.current) tlRef.current.kill();
    const outImg = currentImg;
    const inImg = slides[swiper.realIndex].img;
    setActiveIdx(swiper.realIndex);
    setAnimKey((k) => k + 1);
    setCurtain({ outImg, inImg });
  }, [currentImg]);

  const slide = slides[activeIdx];
  const current = String(activeIdx + 1).padStart(2, '0');
  const total = String(slides.length).padStart(2, '0');

  const renderSlots = (imgSrc: string) => {
    const el = containerRef.current;
    const fullW = el ? el.offsetWidth : (typeof window !== 'undefined' ? window.innerWidth : 1920);
    const fullH = el ? el.offsetHeight : (typeof window !== 'undefined' ? window.innerHeight : 1080);
    const slotW = Math.ceil(fullW / SLOTS);

    return Array.from({ length: SLOTS }, (_, k) => (
      <div
        key={k}
        style={{
          position: 'absolute',
          overflow: 'hidden',
          top: 0,
          left: k * slotW,
          width: slotW + 1,
          height: fullH,
        }}
      >
        <div
          className="slotslide"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: slotW + 1,
            height: fullH,
            overflow: 'hidden',
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
      </div>
    ));
  };

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 z-[1]">
        <Image
          src={currentImg}
          alt="Hero background"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
        />
      </div>
      <div className="absolute inset-0 z-[2] bg-black/40" />

      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
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
            }}
          />
          <div className="relative">
            <h1 key={animKey} className="text-3xl sm:text-5xl lg:text-6xl font-extralight text-white tracking-wide leading-tight mb-4 sm:mb-6">
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
