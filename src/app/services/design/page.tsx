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

export default function DesignPage() {
  return <DesignClient />;
}
