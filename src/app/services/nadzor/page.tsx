import type { Metadata } from "next";
import NadzorClient from "./NadzorClient";

export const metadata: Metadata = {
  title: "Авторский надзор за ремонтом в Москве — контроль качества",
  description:
    "Авторский надзор за ремонтом квартиры в Москве. Контроль качества работ, проверка соответствия проекту, приёмка этапов. Sol Home.",
  openGraph: {
    title: "Авторский надзор за ремонтом в Москве — контроль качества",
    description:
      "Авторский надзор за ремонтом квартиры в Москве. Контроль качества работ, проверка соответствия проекту, приёмка этапов. Sol Home.",
    url: "/services/nadzor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function NadzorPage() {
  return <NadzorClient />;
}
