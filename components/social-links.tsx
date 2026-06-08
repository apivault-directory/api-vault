/**
 * components/social-links.tsx
 *
 * Renders verified social links for a provider.
 * Only fields that are explicitly set are rendered — no empty/guessed links.
 */

import { Twitter, Github, MessageCircle, Linkedin, BookOpen } from "lucide-react";
import type { ProviderSocial } from "@/lib/types";

interface SocialLinksProps {
  social?: ProviderSocial;
  className?: string;
}

const links: {
  key: keyof ProviderSocial;
  Icon: React.ElementType;
  label: string;
}[] = [
  { key: "twitter",  Icon: Twitter,       label: "X / Twitter" },
  { key: "github",   Icon: Github,        label: "GitHub" },
  { key: "discord",  Icon: MessageCircle, label: "Discord" },
  { key: "linkedin", Icon: Linkedin,      label: "LinkedIn" },
  { key: "blog",     Icon: BookOpen,      label: "Blog" },
];

export function SocialLinks({ social, className }: SocialLinksProps) {
  if (!social) return null;

  const active = links.filter((l) => !!social[l.key]);
  if (active.length === 0) return null;

  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      {active.map(({ key, Icon, label }) => (
        <a
          key={key}
          href={social[key]}
          target="_blank"
          rel="noopener noreferrer"
          title={label}
          className="text-fg-2 hover:text-fg-0 transition-colors"
          aria-label={label}
        >
          <Icon size={15} />
        </a>
      ))}
    </div>
  );
}
