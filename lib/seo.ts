import type { Provider } from "./types";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://apivault.dev";
export const SITE_NAME = "APIVault";
export const SITE_DESCRIPTION =
  "The developer directory of free AI APIs. Verified weekly, ranked transparently, with copy-paste code on every page.";

export function providerJsonLd(provider: Provider) {
  return {
    "@context": "https://schema.org", "@type": "SoftwareApplication",
    name: provider.name, description: provider.description, url: provider.website,
    applicationCategory: "DeveloperApplication", operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free tier available" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: provider.apivaultScore, bestRating: 100, worstRating: 0 },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org", "@type": "Organization",
    name: SITE_NAME, url: SITE_URL, description: SITE_DESCRIPTION,
    sameAs: ["https://github.com/apivault", "https://twitter.com/apivault"],
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem", position: i + 1, name: item.name, item: `${SITE_URL}${item.url}`,
    })),
  };
}
