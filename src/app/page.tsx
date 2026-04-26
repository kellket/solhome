import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import FAQ from "@/components/FAQ";
import Reviews from "@/components/Reviews";

export const metadata: Metadata = {
  title: "Ремонт квартир под ключ в Москве",
  description:
    "Sol Home — ремонт квартир под ключ в Москве. Дизайн-проект, капитальный и косметический ремонт от 18 370 ₽/м². Гарантия 5 лет, договор, без предоплаты.",
  openGraph: {
    title: "Ремонт квартир под ключ в Москве",
    description:
      "Sol Home — ремонт квартир под ключ в Москве. Дизайн-проект, капитальный и косметический ремонт от 18 370 ₽/м². Гарантия 5 лет, договор, без предоплаты.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Home() {
  return (
    <>
      <HeroSlider />

      <Calculator />

      <AboutSection />

      <ServicesSection />

      <ProjectsSection />

      <FAQ />

      <Reviews />
    </>
  );
}
