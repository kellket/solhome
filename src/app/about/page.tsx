import type { Metadata } from "next";
import AboutSection from "@/components/AboutSection";

export const metadata: Metadata = {
  title: "О компании Sol Home — ремонт квартир в Москве",
  description:
    "Sol Home — ваш надёжный партнёр в ремонте. Работаем с квартирами в Москве, сопровождаем проекты от концепции до финальной реализации.",
  openGraph: {
    title: "О компании Sol Home — ремонт квартир в Москве",
    description:
      "Sol Home — ваш надёжный партнёр в ремонте. Работаем с квартирами в Москве, сопровождаем проекты от концепции до финальной реализации.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/about",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://sol-home.ru" },
    { "@type": "ListItem", "position": 2, "name": "О компании", "item": "https://sol-home.ru/about" }
  ]
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <AboutSection />
    </>
  );
}
