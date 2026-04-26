import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

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

export default function ProjectsPage() {
  return <ProjectsClient />;
}
