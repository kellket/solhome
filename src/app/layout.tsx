import type { Metadata } from "next";
import { Onest, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "cyrillic"],
  weight: ["200"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sol Home — Ремонт квартир под ключ",
  description:
    "Профессиональный ремонт квартир под ключ. Фиксированная цена, гарантия качества, поэтапная оплата. Рассчитайте стоимость ремонта онлайн.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${onest.variable} ${jost.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
