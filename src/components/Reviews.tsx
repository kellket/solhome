"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}

const reviews: Review[] = [
  {
    name: "Анна Михайлова",
    rating: 5,
    text: "Отличная работа! Ремонт квартиры выполнен качественно и в срок. Бригада профессиональная, всё чисто и аккуратно. Рекомендую!",
    date: "2026-03-15",
  },
  {
    name: "Мистер Никто",
    rating: 5,
    text: "Делали капитальный ремонт двушки. Результат превзошёл ожидания. Особенно понравился подход к деталям и соблюдение сроков.",
    date: "2026-02-28",
  },
  {
    name: "Маша",
    rating: 5,
    text: "Заказывали дизайн-проект и ремонт под ключ. Команда Sol Home — настоящие профессионалы. Квартира как с картинки!",
    date: "2026-01-10",
  },
  {
    name: "Евгений",
    rating: 5,
    text: "Ремонт в новостройке прошёл без проблем. Менеджер всегда на связи, мастера вежливые. Цена соответствует качеству.",
    date: "2025-12-20",
  },
  {
    name: "Мария Волкова",
    rating: 5,
    text: "Косметический ремонт кухни и ванной. Быстро, качественно, недорого. Буду обращаться снова!",
    date: "2025-11-05",
  },
  {
    name: "Алексей Новиков",
    rating: 5,
    text: "Долго выбирали компанию для ремонта. Sol Home предложили лучшие условия. Результатом довольны на 100%.",
    date: "2025-10-18",
  },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function getAvatarGradient(index: number): string {
  const gradients = [
    "from-[#bf9b88] to-[#8b6f5c]",
    "from-[#7a9a8c] to-[#4d6b5c]",
    "from-[#9a8a7a] to-[#6b5c4d]",
    "from-[#8a7a9a] to-[#5c4d6b]",
    "from-[#9a7a8a] to-[#6b4d5c]",
    "from-[#7a8a9a] to-[#4d5c6b]",
  ];
  return gradients[index % gradients.length];
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`w-4 h-4 ${filled ? "text-[#bf9b88]" : "text-white/20"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ReviewsSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Sol Home",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: String(reviews.length),
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: r.name,
      },
      datePublished: r.date,
      reviewBody: r.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating),
        bestRating: "5",
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const formattedDate = new Date(review.date).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="h-full bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col transition-all duration-300 hover:border-gold/30 hover:bg-white/[0.05]">
      <div className="flex items-center gap-4 mb-5">
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${getAvatarGradient(index)} flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-white text-sm sm:text-base font-light tracking-wide">
            {getInitials(review.name)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-base sm:text-lg font-light tracking-wide truncate">
            {review.name}
          </h3>
          <div className="flex items-center gap-0.5 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} filled={i < review.rating} />
            ))}
          </div>
        </div>
      </div>

      <p className="text-white/70 text-sm sm:text-[15px] font-extralight leading-relaxed flex-1">
        &ldquo;{review.text}&rdquo;
      </p>

      <div className="mt-5 pt-4 border-t border-white/10">
        <span className="text-white/40 text-xs font-extralight tracking-wide">
          {formattedDate}
        </span>
      </div>
    </div>
  );
}

export default function Reviews() {
  const [prefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", text: "", rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
      setFormData({ name: "", text: "", rating: 5 });
    }, 2000);
  };

  return (
    <section id="reviews" className="bg-dark-bg py-16 sm:py-20 lg:py-24">
      <ReviewsSchema />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-white text-2xl sm:text-3xl font-extralight tracking-wide mb-4">
            Отзывы наших клиентов
          </h2>
          <p className="text-white/50 text-sm sm:text-base font-extralight tracking-wide">
            Более 100 выполненных проектов
          </p>
        </div>

        <div className="reviews-swiper relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
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
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            className="!pb-14"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <ReviewCard review={review} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-sm font-light tracking-[0.15em] uppercase rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300"
          >
            Оставить отзыв
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-dark-bg border border-white/20 rounded-2xl p-6 sm:p-8">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {!submitted ? (
                <>
                  <h3 className="text-white text-xl font-light tracking-wide mb-6 text-center">
                    Оставить отзыв
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-5 py-3 bg-white/10 border border-white/30 rounded-full text-sm font-light text-white placeholder:text-white/50 focus:outline-none focus:border-gold transition-colors"
                    />
                    <div className="flex items-center justify-center gap-2 py-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="transition-transform hover:scale-110"
                        >
                          <svg
                            className={`w-8 h-8 ${star <= formData.rating ? "text-[#bf9b88]" : "text-white/20"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                    <textarea
                      placeholder="Ваш отзыв"
                      rows={4}
                      value={formData.text}
                      onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                      required
                      className="w-full px-5 py-3 bg-white/10 border border-white/30 rounded-2xl text-sm font-light text-white placeholder:text-white/50 focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-3 rounded-full text-sm font-light tracking-[0.15em] uppercase bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-colors"
                    >
                      Отправить
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-gold flex items-center justify-center">
                    <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-white text-lg font-light">Спасибо за отзыв!</p>
                  <p className="text-white/60 text-sm mt-2">Он будет опубликован в ближайшее время</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
