"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProviderCard } from "./provider-card";
import { CategoryIcon } from "./category-icon";
import type { Provider, Category } from "@/lib/types";

const CATEGORIES: (Category | "All")[] = [
  "All", "LLM", "Image", "Speech", "Embeddings", "Search", "Video", "Code",
];

const SORT_OPTIONS = [
  { value: "score", label: "Trust Score" },
  { value: "name", label: "Name A–Z" },
  { value: "free", label: "Free Tier" },
];

export function ProvidersClient({ providers }: { providers: Provider[] }) {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as Category) || "All";
  const [category, setCategory] = useState<Category | "All">(
    CATEGORIES.includes(initialCategory) ? initialCategory : "All"
  );

  useEffect(() => {
    const c = searchParams.get("category") as Category;
    if (c && CATEGORIES.includes(c)) setCategory(c);
  }, [searchParams]);
  const [noCard, setNoCard] = useState(false);
  const [noPhone, setNoPhone] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("score");

  const filtered = useMemo(() => {
    let result = providers
      .filter((p) => category === "All" || p.category === category)
      .filter((p) => !noCard || !p.requiresCreditCard)
      .filter((p) => !noPhone || !p.requiresPhone)
      .filter((p) => {
        if (!query) return true;
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
        );
      });

    if (sort === "score") result = result.sort((a, b) => b.apivaultScore - a.apivaultScore);
    if (sort === "name") result = result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "free") result = result.sort((a, b) => b.freeTierScore - a.freeTierScore);
    return result;
  }, [providers, category, noCard, noPhone, query, sort]);

  const hasFilters = category !== "All" || noCard || noPhone || query;

  function clearFilters() {
    setCategory("All");
    setNoCard(false);
    setNoPhone(false);
    setQuery("");
    setSort("score");
  }

  return (
    <div>
      {/* Search row */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, tag, or capability…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 bg-bg-1 border border-line rounded-md text-sm text-fg-0 placeholder:text-fg-3 focus:outline-none focus:border-accent transition-colors font-mono"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-3 hover:text-fg-1 transition-colors">
              <X size={13} />
            </button>
          )}
        </div>
        <div className="relative">
          <SlidersHorizontal size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-3 pointer-events-none" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-10 pl-8 pr-4 bg-bg-1 border border-line rounded-md text-sm text-fg-1 focus:outline-none focus:border-accent transition-colors font-mono appearance-none cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-3">
        {CATEGORIES.map((f) => (
          <button
            key={f}
            onClick={() => setCategory(f)}
            className={`px-3 py-1.5 border rounded-full text-[13px] transition-colors inline-flex items-center gap-1.5 ${
              category === f
                ? "bg-accent text-bg-0 border-accent font-medium"
                : "border-line bg-bg-1 text-fg-1 hover:border-line-2 hover:text-fg-0"
            }`}
          >
            {f !== "All" && (
              <CategoryIcon
                category={f}
                size={12}
                className={category === f ? "text-bg-0" : "text-fg-2"}
              />
            )}
            {f}
          </button>
        ))}
      </div>

      {/* Toggle filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setNoCard(!noCard)}
          className={`px-3 py-1.5 border rounded-full text-[13px] transition-colors inline-flex items-center gap-1.5 ${
            noCard
              ? "bg-accent text-bg-0 border-accent font-medium"
              : "border-line bg-bg-1 text-fg-1 hover:border-line-2 hover:text-fg-0"
          }`}
        >
          <span>{noCard ? "✓" : "○"}</span> No credit card
        </button>
        <button
          onClick={() => setNoPhone(!noPhone)}
          className={`px-3 py-1.5 border rounded-full text-[13px] transition-colors inline-flex items-center gap-1.5 ${
            noPhone
              ? "bg-accent text-bg-0 border-accent font-medium"
              : "border-line bg-bg-1 text-fg-1 hover:border-line-2 hover:text-fg-0"
          }`}
        >
          <span>{noPhone ? "✓" : "○"}</span> No phone required
        </button>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-1.5 border border-line rounded-full text-[13px] text-fg-2 hover:text-fg-1 hover:border-line-2 transition-colors inline-flex items-center gap-1.5"
          >
            <X size={11} /> Clear filters
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-xs text-fg-2 font-mono mb-5">
        {filtered.length} provider{filtered.length !== 1 ? "s" : ""} found
        {hasFilters && <span className="text-accent"> (filtered)</span>}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <ProviderCard key={p.slug} provider={p} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-24">
            <p className="text-fg-2 font-mono text-sm mb-2">No providers match your filters.</p>
            <button onClick={clearFilters} className="text-accent text-sm hover:underline">Clear filters →</button>
          </div>
        )}
      </div>
    </div>
  );
}
