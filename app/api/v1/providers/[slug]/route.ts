import { NextResponse } from "next/server";
import { getProviderBySlug } from "@/lib/providers";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);

  if (!provider) {
    return NextResponse.json(
      { error: "Provider not found", slug },
      { status: 404, headers: CORS }
    );
  }

  return NextResponse.json(
    {
      object: "provider",
      slug: provider.slug,
      name: provider.name,
      tagline: provider.tagline,
      description: provider.description,
      category: provider.category,
      website: provider.website,
      docsUrl: provider.docsUrl,
      status: provider.status,
      freeTier: {
        summary: provider.freeTierSummary,
        details: provider.freeTierDetails,
        requiresCreditCard: provider.requiresCreditCard,
        requiresPhone: provider.requiresPhone,
      },
      pros: provider.pros,
      cons: provider.cons,
      useCases: provider.useCases,
      lastVerified: provider.lastVerified,
      changelog: provider.changelog,
    },
    { headers: { ...CORS, "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
  );
}
