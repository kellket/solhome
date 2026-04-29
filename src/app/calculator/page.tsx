import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Калькулятор стоимости ремонта",
  description:
    "Рассчитайте стоимость ремонта квартиры в Москве онлайн за 1 минуту. Косметический, капитальный, дизайнерский ремонт и под ключ.",
  openGraph: {
    title: "Калькулятор стоимости ремонта",
    description:
      "Рассчитайте стоимость ремонта квартиры в Москве онлайн за 1 минуту. Косметический, капитальный, дизайнерский ремонт и под ключ.",
    url: "/calculator",
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
    { "@type": "ListItem", "position": 2, "name": "Калькулятор", "item": "https://solhome.ru/calculator" }
  ]
};

export default function CalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <CalculatorClient />
    </>
  );
}
