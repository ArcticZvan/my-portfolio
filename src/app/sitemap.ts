import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/mdx";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["zh", "en"];
  const routes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    routes.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    });

    routes.push({
      url: `${BASE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    const posts = getBlogPosts(locale);
    for (const post of posts) {
      routes.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return routes;
}
