import type { Metadata } from "next";
import ContactsClient from "./ContactsClient";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с Sol Home: +7 901 901 84 43, info.solhome@yandex.ru. Москва. Пн–Вс 9:00–19:00. Бесплатная консультация и расчёт стоимости ремонта.",
  openGraph: {
    title: "Контакты",
    description:
      "Свяжитесь с Sol Home: +7 901 901 84 43, info.solhome@yandex.ru. Москва. Пн–Вс 9:00–19:00. Бесплатная консультация и расчёт стоимости ремонта.",
    url: "/contacts",
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
    { "@type": "ListItem", "position": 2, "name": "Контакты", "item": "https://solhome.ru/contacts" }
  ]
};

export default function ContactsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <ContactsClient />
    </>
  );
}
