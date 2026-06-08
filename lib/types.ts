export type ProviderStatus = "online" | "degraded" | "down" | "unknown";

export type Category =
  | "LLM" | "Image" | "Embeddings" | "Speech"
  | "Vision" | "Video" | "Code" | "Search";

export type Language = "python" | "javascript" | "curl" | "go" | "typescript";

export type ChangelogType = "added" | "updated" | "removed" | "free_tier_changed" | "deprecation";

export interface CodeSnippet { language: Language; label: string; code: string; }

export interface ChangelogEntry { date: string; type: ChangelogType; title: string; description?: string; }

export interface Provider {
  slug: string; name: string; logoText: string; domain: string;
  tagline: string; description: string; category: Category;
  website: string; docsUrl: string; apiUrl?: string;
  apivaultScore: number; reliabilityScore: number; documentationScore: number;
  freeTierScore: number; popularityScore: number;
  status: ProviderStatus; lastVerified: string; freeTierSummary: string;
  freeTierDetails: { monthlyRequests?: string; rateLimit?: string; monthlyTokens?: string; models?: string; };
  requiresCreditCard: boolean; requiresPhone: boolean;
  tags: string[]; snippets: CodeSnippet[];
  pros: string[]; cons: string[]; useCases: string[];
  changelog: ChangelogEntry[];
  isFeatured?: boolean; foundedYear?: number; headquarters?: string;
}

export interface Collection {
  slug: string; title: string; subtitle: string; description: string;
  icon: string; providerSlugs: string[]; isPublished: boolean;
}

export interface Alternative {
  slug: string; competitorName: string; competitorUrl: string;
  metaDescription: string; intro: string; providerSlugs: string[]; isPublished: boolean;
}

export interface Guide {
  slug: string; title: string; metaDescription: string; targetKeyword: string;
  excerpt: string; content: string; readingTime: number;
  relatedProviderSlugs: string[]; publishedAt: string; isPublished: boolean;
}
