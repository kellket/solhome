import type { Metadata } from "next";
import AdvantagesClient from "./AdvantagesClient";

export const metadata: Metadata = {
  title: "Преимущества",
  description:
    "Почему выбирают Sol Home: многоуровневый контроль качества, оплата по факту, поставка материалов, ремонт по технологическим картам.",
  openGraph: {
    title: "Преимущества",
    description:
      "Почему выбирают Sol Home: многоуровневый контроль качества, оплата по факту, поставка материалов, ремонт по технологическим картам.",
    url: "/advantages",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/advantages",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://sol-home.ru" },
    { "@type": "ListItem", "position": 2, "name": "Преимущества", "item": "https://sol-home.ru/advantages" }
  ]
};

export default function AdvantagesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <AdvantagesClient />
    </>
  );
}
