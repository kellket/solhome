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
};

export default function KomplektaciyaPage() {
  return <KomplektaciyaClient />;
}
