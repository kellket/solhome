import type { Metadata, Viewport } from "next";
import { Onest, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { Suspense } from "react";
import YandexMetrika from "@/components/YandexMetrika";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
  metadataBase: new URL("https://sol-home.ru"),
  title: {
    default: "Sol Home — Ремонт квартир под ключ в Москве",
    template: "%s | Sol Home",
  },
  description:
    "Профессиональный ремонт квартир под ключ в Москве. Фиксированная цена, гарантия качества, поэтапная оплата. Рассчитайте стоимость ремонта онлайн.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
url: "https://sol-home.ru",
    siteName: "Sol Home",
    title: "Sol Home — Ремонт квартир под ключ в Москве",
    description:
      "Профессиональный ремонт квартир под ключ в Москве. Фиксированная цена, гарантия качества, поэтапная оплата.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Sol Home — Ремонт квартир под ключ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sol Home — Ремонт квартир под ключ в Москве",
    description:
      "Профессиональный ремонт квартир под ключ в Москве. Фиксированная цена, гарантия качества.",
    images: ["/og-image.webp"],
  },

  formatDetection: {
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "yV_MzLaCTv_jgIutNvHfhrvZ9fFlrZANTSc9-HBWKtg",
    yandex: "b66b7888ea76e748",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/sol_home_logo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1a1714",
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sol Home",
  url: "https://solhome.ru",
  logo: "https://solhome.ru/sol_home_logo.svg",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7-901-901-84-43",
    contactType: "customer service",
    availableLanguage: "Russian",
  },
};

const jsonLdLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Sol Home",
  description: "Ремонт квартир под ключ в Москве",
  url: "https://solhome.ru",
  telephone: "+7-901-901-84-43",
  email: "info.solhome@yandex.ru",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Москва",
    addressCountry: "RU",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "09:00",
    closes: "19:00",
  },
  priceRange: "₽₽",
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sol Home",
  url: "https://solhome.ru",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${onest.variable} ${jost.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-dark-bg">
        <Header />
        <main className="flex-1 bg-dark-bg">{children}</main>
        <Footer />
        <CookieConsent />
        <Suspense fallback={null}>
          <YandexMetrika />
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
