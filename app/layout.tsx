import type { Metadata, Viewport } from "next";
// Self-hosted fonts via @fontsource (no build-time network fetch required).
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — The Developer Directory of Free AI APIs`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "free AI APIs", "AI API directory", "LLM API", "free OpenAI alternative",
    "free embeddings API", "speech to text API", "image generation API",
  ],
  authors: [{ name: "APIVault Team" }],
  creator: "APIVault",
  openGraph: {
    type: "website", locale: "en_US", url: SITE_URL,
    title: `${SITE_NAME} — The Developer Directory of Free AI APIs`,
    description: SITE_DESCRIPTION, siteName: SITE_NAME,
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Free AI APIs, Verified Weekly`,
    description: SITE_DESCRIPTION,
    images: ["/og.svg"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export const viewport: Viewport = {
  themeColor: "#0A0B0D",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans">
        <div className="bg-dots" aria-hidden="true" />
        <div className="bg-glow" aria-hidden="true" />
        <div className="bg-noise" aria-hidden="true" />
        <div className="page">{children}</div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
      </body>
    </html>
  );
}
