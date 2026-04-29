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
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://solhome.ru" },
    { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://solhome.ru/services" },
    { "@type": "ListItem", "position": 3, "name": "Дизайн-проект", "item": "https://solhome.ru/services/design" }
  ]
};

export default function DesignPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <DesignClient />
    </>
  );
}
