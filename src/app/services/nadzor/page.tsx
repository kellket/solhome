import type { Metadata } from "next";
import NadzorClient from "./NadzorClient";

export const metadata: Metadata = {
  title: "Авторский надзор за ремонтом в Москве — контроль качества",
  description:
    "Авторский надзор за ремонтом квартиры в Москве. Контроль качества работ, проверка соответствия проекту, приёмка этапов. Sol Home.",
  openGraph: {
    title: "Авторский надзор за ремонтом в Москве — контроль качества",
    description:
      "Авторский надзор за ремонтом квартиры в Москве. Контроль качества работ, проверка соответствия проекту, приёмка этапов. Sol Home.",
    url: "/services/nadzor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/services/nadzor",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://sol-home.ru" },
    { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://sol-home.ru/services" },
    { "@type": "ListItem", "position": 3, "name": "Авторский надзор", "item": "https://sol-home.ru/services/nadzor" }
  ]
};

export default function NadzorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <NadzorClient />
    </>
  );
}
