import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://sol-home.ru", lastModified: new Date(), priority: 1.0, changeFrequency: "weekly" },
    { url: "https://sol-home.ru/about", lastModified: new Date(), priority: 0.8, changeFrequency: "monthly" },
    { url: "https://sol-home.ru/contacts", lastModified: new Date(), priority: 0.8, changeFrequency: "monthly" },
    { url: "https://sol-home.ru/calculator", lastModified: new Date(), priority: 0.9, changeFrequency: "monthly" },
    { url: "https://sol-home.ru/projects", lastModified: new Date(), priority: 0.7, changeFrequency: "weekly" },
    { url: "https://sol-home.ru/advantages", lastModified: new Date(), priority: 0.6, changeFrequency: "monthly" },
    { url: "https://sol-home.ru/privacy", lastModified: new Date(), priority: 0.3, changeFrequency: "yearly" },
    { url: "https://sol-home.ru/services", lastModified: new Date(), priority: 0.9, changeFrequency: "monthly" },
    { url: "https://sol-home.ru/services/design", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://sol-home.ru/services/remont", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://sol-home.ru/services/nadzor", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://sol-home.ru/services/komplektaciya", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
