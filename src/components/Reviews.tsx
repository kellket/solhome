"use client";

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
    date: "2024-03-15",
  },
  {
    name: "Дмитрий Козлов",
    rating: 5,
    text: "Делали капитальный ремонт двушки. Результат превзошёл ожидания. Особенно понравился подход к деталям и соблюдение сроков.",
    date: "2024-02-28",
  },
  {
    name: "Елена Сорокина",
    rating: 5,
    text: "Заказывали дизайн-проект и ремонт под ключ. Команда Sol Home — настоящие профессионалы. Квартира как с картинки!",
    date: "2024-02-10",
  },
  {
    name: "Сергей Петров",
    rating: 5,
    text: "Ремонт в новостройке прошёл без проблем. Менеджер всегда на связи, мастера вежливые. Цена соответствует качеству.",
    date: "2024-01-20",
  },
  {
    name: "Мария Волкова",
    rating: 5,
    text: "Косметический ремонт кухни и ванной. Быстро, качественно, недорого. Буду обращаться снова!",
    date: "2024-01-05",
  },
  {
    name: "Алексей Новиков",
    rating: 5,
    text: "Долго выбирали компанию для ремонта. Sol Home предложили лучшие условия. Результатом довольны на 100%.",
    date: "2023-12-18",
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
  return (
    <section id="reviews" className="bg-dark-bg py-16 sm:py-20 lg:py-24 overflow-hidden">
      <ReviewsSchema />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-white text-2xl sm:text-3xl font-extralight tracking-wide mb-3">
            Отзывы наших клиентов
          </h2>
          <div className="w-16 h-[1.5px] mx-auto gold-gradient mb-4" />
          <p className="text-white/50 text-sm sm:text-base font-extralight tracking-wide">
            Более 100 выполненных проектов
          </p>
        </div>

        <div className="reviews-swiper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
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
      </div>
    </section>
  );
}
