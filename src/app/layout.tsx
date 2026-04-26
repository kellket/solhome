import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://solhome.ru"),
  title: {
    default: "Sol Home — Ремонт квартир под ключ в Москве",
    template: "%s | Sol Home",
  },
  description:
    "Профессиональный ремонт квартир под ключ в Москве. Фиксированная цена, гарантия качества, поэтапная оплата. Рассчитайте стоимость ремонта онлайн.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://solhome.ru",
    siteName: "Sol Home",
    title: "Sol Home — Ремонт квартир под ключ в Москве",
    description:
      "Профессиональный ремонт квартир под ключ в Москве. Фиксированная цена, гарантия качества, поэтапная оплата.",
    images: [
      {
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
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
  icons: {
    icon: [
      { url: "/sol_home_logo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/sol_home_logo.svg" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
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
  potentialAction: {
    "@type": "SearchAction",
    target: "https://solhome.ru/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
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
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
