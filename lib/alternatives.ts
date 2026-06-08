import type { Alternative } from "./types";

export const alternatives: Alternative[] = [
  {
    slug: "openai",
    competitorName: "OpenAI",
    competitorUrl: "https://openai.com",
    metaDescription: "Best free OpenAI alternatives in 2026. Match GPT-4 quality with free tiers and OpenAI-compatible APIs.",
    intro: "OpenAI set the standard for LLMs, but it's not the only option. These providers offer comparable (sometimes better) models, often with generous free tiers, OpenAI-compatible APIs, and open weights.",
    providerSlugs: ["groq", "gemini", "openrouter", "deepseek", "mistral", "cerebras", "fireworks", "together", "sambanova", "cohere"],
    isPublished: true,
  },
  {
    slug: "claude",
    competitorName: "Claude (Anthropic)",
    competitorUrl: "https://claude.ai",
    metaDescription: "Best free Claude API alternatives in 2026. Anthropic-quality reasoning without the paywall.",
    intro: "Claude (Anthropic) is known for safe, thoughtful responses — but the API is expensive with no free tier. These providers offer similar reasoning quality with generous free quotas.",
    providerSlugs: ["groq", "gemini", "openrouter", "deepseek", "mistral", "cerebras", "sambanova"],
    isPublished: true,
  },
  {
    slug: "elevenlabs",
    competitorName: "ElevenLabs",
    competitorUrl: "https://elevenlabs.io",
    metaDescription: "Best ElevenLabs alternatives for AI voice. Free TTS with comparable quality.",
    intro: "ElevenLabs leads the TTS market, but the free tier is limited to 10k characters/month. These providers offer more generous voice generation quotas.",
    providerSlugs: ["playht", "neets", "gladia", "google-tts", "deepgram", "assemblyai"],
    isPublished: true,
  },
  {
    slug: "stability",
    competitorName: "Stability AI",
    competitorUrl: "https://stability.ai",
    metaDescription: "Best Stability AI alternatives. Free Stable Diffusion and FLUX generation via API.",
    intro: "Stability's free credits run out fast (25 credits). These providers offer Stable Diffusion and FLUX inference with better ongoing free tiers.",
    providerSlugs: ["fal", "replicate", "leonardo", "hyperbolic", "novita"],
    isPublished: true,
  },
  {
    slug: "groq",
    competitorName: "Groq",
    competitorUrl: "https://groq.com",
    metaDescription: "Groq alternatives for fast LLM inference. Fastest free inference providers compared.",
    intro: "Groq's LPU is the fastest free inference available, but it has rate limits and a smaller model selection. These providers offer speed-focused alternatives.",
    providerSlugs: ["cerebras", "sambanova", "fireworks", "together", "openrouter", "deepseek"],
    isPublished: true,
  },
  {
    slug: "aws-textract",
    competitorName: "AWS Textract",
    competitorUrl: "https://aws.amazon.com/textract",
    metaDescription: "AWS Textract alternatives. OCR and document AI without the AWS complexity.",
    intro: "AWS Textract is powerful but requires AWS setup and has complex pricing. These providers offer similar OCR and document AI capabilities with simpler APIs and real free tiers.",
    providerSlugs: ["upstage", "jina", "fal", "replicate"],
    isPublished: true,
  },
  {
    slug: "openrouter",
    competitorName: "OpenRouter",
    competitorUrl: "https://openrouter.ai",
    metaDescription: "OpenRouter alternatives — multi-model gateways with free tiers.",
    intro: "OpenRouter provides one API for 100+ models with some free options, but free model access is limited per day. These providers offer dedicated free tiers with less rotation.",
    providerSlugs: ["groq", "gemini", "cerebras", "sambanova", "huggingface", "chutes", "glhf"],
    isPublished: true,
  },
];

export const getAlternativeBySlug = (slug: string) => alternatives.find((a) => a.slug === slug);
