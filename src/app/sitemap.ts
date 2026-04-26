import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://solhome.ru", lastModified: new Date(), priority: 1.0, changeFrequency: "weekly" },
    { url: "https://solhome.ru/contacts", lastModified: new Date(), priority: 0.8, changeFrequency: "monthly" },
    { url: "https://solhome.ru/calculator", lastModified: new Date(), priority: 0.9, changeFrequency: "monthly" },
    { url: "https://solhome.ru/projects", lastModified: new Date(), priority: 0.7, changeFrequency: "weekly" },
    { url: "https://solhome.ru/advantages", lastModified: new Date(), priority: 0.6, changeFrequency: "monthly" },
    { url: "https://solhome.ru/services", lastModified: new Date(), priority: 0.9, changeFrequency: "monthly" },
  ];
}
