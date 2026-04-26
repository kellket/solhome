import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://solhome.ru", lastModified: new Date() },
    { url: "https://solhome.ru/contacts", lastModified: new Date() },
    { url: "https://solhome.ru/calculator", lastModified: new Date() },
    { url: "https://solhome.ru/projects", lastModified: new Date() },
    { url: "https://solhome.ru/advantages", lastModified: new Date() },
  ];
}
