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

export default function CalculatorPage() {
  return <CalculatorClient />;
}
