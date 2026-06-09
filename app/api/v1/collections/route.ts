import { NextResponse } from "next/server";
import { collections } from "@/lib/collections";

export const runtime = "edge";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export function GET() {
  const published = collections
    .filter((c) => c.isPublished)
    .map((c) => ({
      slug: c.slug,
      title: c.title,
      subtitle: c.subtitle,
      description: c.description,
      providerCount: c.providerSlugs.length,
      providerSlugs: c.providerSlugs,
    }));

  return NextResponse.json(
    {
      object: "list",
      count: published.length,
      data: published,
    },
    { headers: { ...CORS, "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
  );
}
