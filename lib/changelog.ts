export interface ChangelogEntry {
  date: string;
  title: string;
  description: string;
}

export const changelog: ChangelogEntry[] = [
  {
    date: "2026-06-13",
    title: "v0.8.0 — New providers: Viktor & Junior.so",
    description: "Added two no-credit-card providers with generous free credits. Viktor ($100 free, AI agent for Slack & Teams) and Junior.so ($100 free credit, YC-backed AI coding assistant powered by Claude Sonnet). Both verified — accurate free-tier details, no inflated claims.",
  },
  {
    date: "2026-06-11",
    title: "v0.7.0 — Public REST API + full mobile overhaul",
    description: "Shipped a free public REST API (/api/v1) — query providers, collections, and live status programmatically with no auth and CORS enabled. Added an /api-docs page with examples. Rebuilt every page for mobile: status, collections, provider rows, and provider detail no longer overflow on small screens.",
  },
  {
    date: "2026-06-08",
    title: "v0.6.0 — 65 providers, Chinese API coverage, working filters",
    description: "Added 45 new providers including hidden Chinese LLMs (SiliconFlow, Moonshot, Zhipu, Baichuan, Hunyuan, iFlytek Spark, ModelScope, SenseNova, 零一万物, 360智脑, TianGong), agent platforms (Coze, Yuanqi), and international providers (Cerebras, Hyperbolic, Chutes, Runway, Luma, Tavily). Provider search and filtering now fully functional. Mobile navigation added.",
  },
  {
    date: "2026-06-07",
    title: "v0.5.0 — Free tier details section on provider pages",
    description: "Provider detail pages now show a dedicated Free Tier Details section with available models rendered as chips, monthly limits, rate limits, and credit card/phone requirements at a glance.",
  },
  {
    date: "2026-06-07",
    title: "v0.4.0 — Real-time status updates",
    description: "Status page now updates every hour. Added degraded/down filters on the providers index. New changelog page (you're reading it).",
  },
  {
    date: "2026-06-01",
    title: "v0.3.0 — Collections and alternatives",
    description: "Added curated collections (Best for Hackathons, OpenAI Alternatives, No Credit Card, Hidden Gems, Video, Chinese Models) and alternatives pages for top competitors.",
  },
  {
    date: "2026-05-20",
    title: "v0.2.0 — Trust Score breakdown",
    description: "Every provider page now shows the full score breakdown (reliability, free tier, docs, popularity) with weights. Methodology page published.",
  },
  {
    date: "2026-05-10",
    title: "v0.1.0 — Public launch",
    description: "First public release. 20 providers, 4 guides, 6 collections. Weekly verification cadence active.",
  },
];
