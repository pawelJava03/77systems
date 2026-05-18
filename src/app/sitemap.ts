import type { MetadataRoute } from "next";

const BASE = "https://77systems.eu";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/uslugi`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/uslugi/web-development`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/uslugi/automatyzacje-ai`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/uslugi/seo`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/uslugi/social-media`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/kontakt`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];
}
