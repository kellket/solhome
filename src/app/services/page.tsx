import type { Metadata } from "next";
import ServicesSection from "@/components/ServicesSection";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Услуги Sol Home: дизайн-проект интерьера, ремонт квартир под ключ, авторский надзор и комплектация. Полный цикл работ от идеи до сдачи объекта в Москве.",
  openGraph: {
    title: "Услуги | Sol Home",
    description:
      "Услуги Sol Home: дизайн-проект интерьера, ремонт квартир под ключ, авторский надзор и комплектация. Полный цикл работ от идеи до сдачи объекта в Москве.",
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/services",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://sol-home.ru" },
    { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://sol-home.ru/services" }
  ]
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <ServicesSection />
    </>
  );
}
