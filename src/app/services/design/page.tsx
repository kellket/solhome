import type { Metadata } from "next";
import DesignClient from "./DesignClient";

export const metadata: Metadata = {
  title: "Дизайн-проект квартиры в Москве — цена от 1500 ₽/м²",
  description:
    "Разработка дизайн-проекта квартиры в Москве. 3D-визуализация, планировка, чертежи. Бесплатная консультация дизайнера. Sol Home.",
  openGraph: {
    title: "Дизайн-проект квартиры в Москве — цена от 1500 ₽/м²",
    description:
      "Разработка дизайн-проекта квартиры в Москве. 3D-визуализация, планировка, чертежи. Бесплатная консультация дизайнера. Sol Home.",
    url: "/services/design",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/services/design",
  },
};

const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Дизайн-проект квартиры",
  description: "Разработка дизайн-проекта квартиры в Москве. 3D-визуализация, планировка, чертежи.",
  provider: {
    "@type": "LocalBusiness",
    name: "Sol Home",
    telephone: "+7-901-901-84-43",
    email: "info.solhome@yandex.ru",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Москва",
      addressCountry: "RU",
    },
  },
  areaServed: {
    "@type": "City",
    name: "Москва",
  },
  offers: {
    "@type": "Offer",
    price: "1500",
    priceCurrency: "RUB",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "1500",
      priceCurrency: "RUB",
      unitText: "м²",
    },
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://sol-home.ru" },
    { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://sol-home.ru/services" },
    { "@type": "ListItem", "position": 3, "name": "Дизайн-проект", "item": "https://sol-home.ru/services/design" }
  ]
};

export default function DesignPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      <DesignClient />
    </>
  );
}
