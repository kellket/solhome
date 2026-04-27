import type { Metadata } from "next";
import RemontClient from "./RemontClient";

export const metadata: Metadata = {
  title: "Ремонт квартир под ключ в Москве — цена от 18 370 ₽/м²",
  description:
    "Комплексный ремонт квартир под ключ в Москве. Фиксированная цена, гарантия 5 лет, поэтапная оплата. Рассчитайте стоимость онлайн. Sol Home.",
  openGraph: {
    title: "Ремонт квартир под ключ в Москве — цена от 18 370 ₽/м²",
    description:
      "Комплексный ремонт квартир под ключ в Москве. Фиксированная цена, гарантия 5 лет, поэтапная оплата. Рассчитайте стоимость онлайн.",
    url: "/services/remont",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ремонт квартир под ключ в Москве — цена от 18 370 ₽/м²",
    description:
      "Комплексный ремонт квартир под ключ в Москве. Фиксированная цена, гарантия 5 лет, поэтапная оплата.",
  },
};

const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Ремонт квартир под ключ",
  description:
    "Комплексный ремонт квартир под ключ в Москве: от демонтажа до финальной уборки. Фиксированная цена, гарантия до 5 лет, поэтапная оплата.",
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
    "@type": "AggregateOffer",
    lowPrice: "18370",
    highPrice: "33050",
    priceCurrency: "RUB",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "18370",
      priceCurrency: "RUB",
      unitText: "м²",
    },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Виды ремонта",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Косметический ремонт",
        },
        price: "18370",
        priceCurrency: "RUB",
        unitText: "м²",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Капитальный ремонт",
        },
        price: "23715",
        priceCurrency: "RUB",
        unitText: "м²",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Дизайнерский ремонт",
        },
        price: "27300",
        priceCurrency: "RUB",
        unitText: "м²",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ремонт под ключ",
        },
        price: "33050",
        priceCurrency: "RUB",
        unitText: "м²",
      },
    ],
  },
};

export default function RemontPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      <RemontClient />
    </>
  );
}
