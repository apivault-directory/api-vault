import { NextResponse } from "next/server";
import { getAllProvidersWithMetrics } from "@/lib/metrics";
import type { Category } from "@/lib/types";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") as Category | null;
  const noCard = searchParams.get("noCard");
  const noPhone = searchParams.get("noPhone");
  const q = searchParams.get("q")?.toLowerCase();
  const sort = searchParams.get("sort") ?? "score"; // score | name
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Math.min(Math.max(parseInt(limitParam), 1), 200) : 200;

  let providers = getAllProvidersWithMetrics();

  if (category) providers = providers.filter((p) => p.category === category);
  if (noCard === "true") providers = providers.filter((p) => !p.requiresCreditCard);
  if (noPhone === "true") providers = providers.filter((p) => !p.requiresPhone);
  if (q) providers = providers.filter((p) =>
    p.name.toLowerCase().includes(q) ||
    p.tagline.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );

  if (sort === "name") providers.sort((a, b) => a.name.localeCompare(b.name));
  else providers.sort((a, b) => b.apivaultScore - a.apivaultScore);

  providers = providers.slice(0, limit);

  const data = providers.map((p) => ({
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    category: p.category,
    website: p.website,
    docsUrl: p.docsUrl,
    status: p.status,
    apivaultScore: p.apivaultScore,
    freeTierSummary: p.freeTierSummary,
    requiresCreditCard: p.requiresCreditCard,
    requiresPhone: p.requiresPhone,
    lastVerified: p.lastVerified,
  }));

  return NextResponse.json(
    {
      object: "list",
      count: data.length,
      data,
    },
    { headers: { ...CORS, "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
  );
}
