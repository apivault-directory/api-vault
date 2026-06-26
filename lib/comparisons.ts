/**
 * lib/comparisons.ts
 *
 * Curated head-to-head comparison pairs. Each generates a static SEO page at
 * /compare/<a>-vs-<b>. Both slugs must exist in lib/providers.ts.
 */

export interface ComparisonPair {
  a: string; // provider slug
  b: string; // provider slug
}

export const comparisons: ComparisonPair[] = [
  { a: "groq", b: "openrouter" },
  { a: "groq", b: "cerebras" },
  { a: "groq", b: "together" },
  { a: "groq", b: "deepseek" },
  { a: "groq", b: "gemini" },
  { a: "openrouter", b: "together" },
  { a: "openrouter", b: "deepseek" },
  { a: "deepseek", b: "mistral" },
  { a: "cerebras", b: "together" },
  { a: "fireworks", b: "together" },
  { a: "mistral", b: "cohere" },
  { a: "e2b", b: "daytona" },
];

export const comparisonSlug = (a: string, b: string) => `${a}-vs-${b}`;
