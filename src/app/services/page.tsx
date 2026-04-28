import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

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
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
