import type { Metadata } from "next";
import KomplektaciyaClient from "./KomplektaciyaClient";

export const metadata: Metadata = {
  title: "Комплектация объекта в Москве — материалы, мебель, техника",
  description:
    "Комплектация квартиры под ремонт в Москве. Подбор и закупка материалов, мебели, техники со скидками до 30%. Доставка на объект. Sol Home.",
  openGraph: {
    title: "Комплектация объекта в Москве — материалы, мебель, техника",
    description:
      "Комплектация квартиры под ремонт в Москве. Подбор и закупка материалов, мебели, техники со скидками до 30%. Доставка на объект. Sol Home.",
    url: "/services/komplektaciya",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/services/komplektaciya",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://sol-home.ru" },
    { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://sol-home.ru/services" },
    { "@type": "ListItem", "position": 3, "name": "Комплектация", "item": "https://sol-home.ru/services/komplektaciya" }
  ]
};

export default function KomplektaciyaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <KomplektaciyaClient />
    </>
  );
}
