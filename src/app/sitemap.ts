import type { MetadataRoute } from "next";
import sql from "@/lib/db";

export const dynamic = "force-dynamic";

const BASE_URL = "https://77systems.eu";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}/`, lastModified: new Date("2026-05-29"), changeFrequency: "weekly", priority: 1.0 },
  { url: `${BASE_URL}/uslugi`, lastModified: new Date("2026-05-01"), changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE_URL}/uslugi/web-development`, lastModified: new Date("2026-05-01"), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/uslugi/automatyzacje-ai`, lastModified: new Date("2026-05-01"), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/uslugi/seo`, lastModified: new Date("2026-05-01"), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/uslugi/social-media`, lastModified: new Date("2026-05-01"), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/portfolio`, lastModified: new Date("2026-05-29"), changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/blog`, lastModified: new Date("2026-05-29"), changeFrequency: "weekly", priority: 0.7 },
  { url: `${BASE_URL}/kontakt`, lastModified: new Date("2026-01-01"), changeFrequency: "yearly", priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogPosts, portfolioItems] = await Promise.all([
    sql<{ slug: string; created_at: Date }[]>`SELECT slug, created_at FROM blog ORDER BY created_at DESC`,
    sql<{ slug: string; created_at: Date }[]>`SELECT slug, created_at FROM portfolio ORDER BY created_at DESC`,
  ]);

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.created_at,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const portfolioRoutes: MetadataRoute.Sitemap = portfolioItems.map((item) => ({
    url: `${BASE_URL}/portfolio/${item.slug}`,
    lastModified: item.created_at,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...portfolioRoutes, ...blogRoutes];
}
