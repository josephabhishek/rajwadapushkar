import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { landingSlugs } from "@/content/landing";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const core = ["", "/stay", "/experiences", "/weddings", "/gallery", "/contact"];
  return [
    ...core.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...landingSlugs.map((slug) => ({
      url: `${site.url}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
