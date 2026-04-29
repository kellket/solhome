import type { Metadata } from "next";
import ProjectsSection from "@/components/ProjectsSection";

export const metadata: Metadata = {
  title: "Портфолио — наши проекты",
  description:
    "Реализованные проекты ремонта квартир под ключ в Москве. Фото до и после, площадь, стоимость работ. Смотрите примеры наших работ.",
  openGraph: {
    title: "Портфолио — наши проекты",
    description:
      "Реализованные проекты ремонта квартир под ключ в Москве. Фото до и после, площадь, стоимость работ. Смотрите примеры наших работ.",
    url: "/projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://solhome.ru" },
    { "@type": "ListItem", "position": 2, "name": "Портфолио", "item": "https://solhome.ru/projects" }
  ]
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <ProjectsSection />
    </>
  );
}
