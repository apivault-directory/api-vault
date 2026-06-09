import { NextResponse } from "next/server";
import { getAllProvidersWithMetrics } from "@/lib/metrics";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export function GET() {
  const providers = getAllProvidersWithMetrics();

  const summary = {
    online: providers.filter((p) => p.status === "online").length,
    degraded: providers.filter((p) => p.status === "degraded").length,
    down: providers.filter((p) => p.status === "down").length,
    unknown: providers.filter((p) => p.status === "unknown").length,
    total: providers.length,
  };

  const data = providers.map((p) => ({
    slug: p.slug,
    name: p.name,
    status: p.status,
    lastVerified: p.lastVerified,
  }));

  return NextResponse.json(
    {
      object: "status",
      summary,
      data,
    },
    { headers: { ...CORS, "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
  );
}
