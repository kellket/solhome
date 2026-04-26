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
};

export default function AdvantagesPage() {
  return <AdvantagesClient />;
}
