import type { MetadataRoute } from "next";
import { providers } from "@/lib/providers";
import { collections } from "@/lib/collections";
import { alternatives } from "@/lib/alternatives";
import { guides } from "@/lib/guides";
import { comparisons, comparisonSlug } from "@/lib/comparisons";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/providers`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/collections`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/alternatives`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/status`, lastModified: now, changeFrequency: "hourly", priority: 0.5 },
    { url: `${SITE_URL}/methodology`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/changelog`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE_URL}/submit`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/api-docs`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/token`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE_URL}/compare`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const providerRoutes: MetadataRoute.Sitemap = providers.map((p) => ({
    url: `${SITE_URL}/providers/${p.slug}`, lastModified: new Date(p.lastVerified), changeFrequency: "weekly", priority: 0.8,
  }));
  const collectionRoutes: MetadataRoute.Sitemap = collections.filter((c) => c.isPublished).map((c) => ({
    url: `${SITE_URL}/collections/${c.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.7,
  }));
  const altRoutes: MetadataRoute.Sitemap = alternatives.filter((a) => a.isPublished).map((a) => ({
    url: `${SITE_URL}/alternatives/${a.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.7,
  }));
  const guideRoutes: MetadataRoute.Sitemap = guides.filter((g) => g.isPublished).map((g) => ({
    url: `${SITE_URL}/guides/${g.slug}`, lastModified: new Date(g.publishedAt), changeFrequency: "monthly", priority: 0.7,
  }));
  const compareRoutes: MetadataRoute.Sitemap = comparisons.map(({ a, b }) => ({
    url: `${SITE_URL}/compare/${comparisonSlug(a, b)}`, lastModified: now, changeFrequency: "weekly", priority: 0.6,
  }));

  return [...staticRoutes, ...providerRoutes, ...collectionRoutes, ...altRoutes, ...guideRoutes, ...compareRoutes];
}
